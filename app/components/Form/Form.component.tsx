import React, { FormEvent } from 'react'
import { useSelector } from 'react-redux'
import { remote } from 'electron'
import { writeFile } from 'fs'
import Textarea from '../Textarea/Textarea.component'
import { ContentState, GlobalState } from '../../models'

const Form = (): JSX.Element => {
  const { name, path, content: fileContentList } = useSelector((state: GlobalState) => state.gloomhavenFile)

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    remote.dialog
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
        if (!file.canceled) {
          writeFile((file.filePath as string).toString(), JSON.stringify(fileContentList), (err) => {
            if (err) throw err
            const notif = {
              title: 'Sauvegarde effectuée',
              body: (file.filePath as string).toString(),
            }
            new remote.Notification(notif).show()
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
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
        <input type='submit' id='save' value='Sauvegarder' />
      </div>
    </form>
  )
}

export default Form
