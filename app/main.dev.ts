/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { join } from 'path'
import { writeFile } from 'fs'
import { app, BrowserWindow, ipcMain, dialog, Notification } from 'electron'
// import { autoUpdater } from 'electron-updater'
// import log from 'electron-log'
import MenuBuilder from './menu'

// export default class AppUpdater {
//   constructor() {
//     log.transports.file.level = 'info'
//     autoUpdater.logger = log
//     autoUpdater.checkForUpdatesAndNotify()
//   }
// }

let mainWindow: BrowserWindow | null = null
app.allowRendererProcessReuse = true
let fileSaved = true

const saveFile = (
  evt: Electron.IpcMainEvent,
  args: { path: string; name: string; fileContentList: Array<Record<string, unknown>>; quitAfter?: boolean }
): void => {
  evt.preventDefault()
  const { path, name, fileContentList, quitAfter } = args
  mainWindow && mainWindow.webContents.send('setdisabled-true')

  dialog
    .showSaveDialog({
      title: 'Sauvegarder le fichier',
      defaultPath: path || '',
      buttonLabel: 'Sauvegarder',
      filters: [
        {
          name: name || '',
          extensions: ['json'],
        },
      ],
    })
    .then((file) => {
      mainWindow && mainWindow.webContents.send('setdisabled-false')
      if (!file.canceled) {
        writeFile((file.filePath as string).toString(), JSON.stringify(fileContentList), (err) => {
          if (err) throw err
          fileSaved = true
          const notif = {
            title: 'Sauvegarde effectuée',
            body: (file.filePath as string).toString(),
          }
          new Notification(notif).show()

          if (quitAfter)
            setTimeout(() => {
              quitApp()
            }, 1000)
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const quitApp = () => {
  mainWindow = null
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')()
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']

  return Promise.all(extensions.map((name) => installer.default(installer[name], forceDownload))).catch(console.log)
}

const createWindow = async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions()
  }

  const RESOURCES_PATH = app.isPackaged ? join(process.resourcesPath, 'resources') : join(__dirname, '../resources')

  const getAssetPath = (...paths: string[]): string => {
    return join(RESOURCES_PATH, ...paths)
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences:
      (process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true') && process.env.ERB_SECURE !== 'true'
        ? {
            nodeIntegration: true,
          }
        : {
            preload: join(__dirname, 'dist/renderer.prod.js'),
          },
  })

  mainWindow.loadURL(`file://${__dirname}/app.html`)

  // @TODO: Use 'ready-to-show' event
  // https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize()
    } else {
      mainWindow.show()
      mainWindow.focus()
    }
  })

  mainWindow.on('close', function (e) {
    if (mainWindow && !fileSaved) {
      e.preventDefault()

      dialog
        .showMessageBox(mainWindow, {
          type: 'question',
          buttons: ['Yes', 'No'],
          title: 'Confirm',
          message: 'Sauvegarder vos modifications ?',
        })
        .then((c) => {
          if (c.response === 0) {
            mainWindow && mainWindow.webContents.send('getDataForSaveBeforeQuit')
          }
          if (c.response === 1) quitApp()
        })
    } else {
      quitApp()
    }
  })

  // mainWindow.on('closed', () => {
  //   mainWindow = null
  // })

  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();
}

/**
 * Add event listeners...
 */
ipcMain.setMaxListeners(5)

ipcMain.on('setFileSaved', (_evt: Electron.IpcMainEvent, bool: boolean) => {
  fileSaved = bool
})

ipcMain.on('setdisabled', (_evt: Electron.IpcMainEvent, bool: boolean) => {
  bool ? mainWindow && mainWindow.webContents.send('setdisabled-true') : mainWindow && mainWindow.webContents.send('setdisabled-false')
})
ipcMain.on('saveFile', saveFile)

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

if (process.env.E2E_BUILD === 'true') {
  app.whenReady().then(createWindow)
} else {
  app.on('ready', createWindow)
}

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})
