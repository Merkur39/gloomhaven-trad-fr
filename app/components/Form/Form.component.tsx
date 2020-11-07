import React, { FormEvent, useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import { useSelector } from 'react-redux'
import Textarea from '../Textarea/Textarea.component'
import { ContentState, GlobalState } from '../../models'

const Form = (): JSX.Element => {
  const { name, path, content: fileContentList } = useSelector((state: GlobalState) => state.gloomhavenFile)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    const setDisabledBtn = (bool: boolean) => setDisabled(bool)
    const sendCurrentContentFile = () => ipcRenderer.send('saveFile', { name, path, fileContentList, quitAfter: true })

    ipcRenderer.on('setdisabled-true', () => setDisabledBtn(true))
    ipcRenderer.on('setdisabled-false', () => setDisabledBtn(false))
    ipcRenderer.on('getDataForSaveBeforeQuit', () => sendCurrentContentFile())

    return () => {
      ipcRenderer.removeListener('setdisabled-true', setDisabledBtn)
      ipcRenderer.removeListener('setdisabled-false', setDisabledBtn)
      ipcRenderer.removeListener('getDataForSaveBeforeQuit', sendCurrentContentFile)
    }
  }, [ipcRenderer, name, path, fileContentList])

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    ipcRenderer.send('saveFile', { name, path, fileContentList })
  }

  return (
    <form onSubmit={onSubmit}>
      {fileContentList.map((fileContent: ContentState, idx: number) => {
        const { id, name, textSource } = fileContent
        return (
          <div key={id} className='card-group'>
            <div className='card'>
              <div className='card-header'>
                <p>{id}</p>
                <p>{name}</p>
                <p>{`${idx + 1} / ${fileContentList.length}`}</p>
              </div>
              <div className='card-body'>{textSource}</div>
            </div>
            <div className='card-translated'>
              <Textarea fileContent={fileContent} />
            </div>
          </div>
        )
      })}
      <div className='bottom-bar'>
        <input type='submit' id='save' value='Sauvegarder' disabled={disabled} />
      </div>
    </form>
  )
}

export default Form
