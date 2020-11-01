import React, { FormEvent } from 'react'
import { useSelector } from 'react-redux'
import { remote } from 'electron'
import { writeFile } from 'fs'
import Textarea from '../Textarea/Textarea.component'
import { ContentState, GlobalState } from '../../models'

const Form = ({ contentList }: { contentList: Array<ContentState> }): JSX.Element => {
  const { name, path } = useSelector((state: GlobalState) => state.gloomhavenFile)

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const temp = [...contentList]

    // TODO Improve it via redux
    const formElements: Array<HTMLTextAreaElement> = Array.from(evt.currentTarget.elements) as Array<HTMLTextAreaElement>
    for (let i = 0; i < temp.length; i++) {
      for (let y = 0; y < formElements.length; y++) {
        if (temp[i].name === formElements[y].name) temp[i].textTranslated = formElements[y].value.trim()
      }
    }

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
          writeFile((file.filePath as string).toString(), JSON.stringify(temp), (err) => {
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
      {contentList.map((content: ContentState, idx: number) => (
        <div key={content.id} className='card-group'>
          <div className='card'>
            <div className='card-header'>
              <p>{content.id}</p>
              <p>{content.name}</p>
              <p>
                {idx + 1} / {contentList.length}
              </p>
            </div>
            <div className='card-body'>{content.textSource}</div>
          </div>
          <div className='card-translated'>
            <Textarea name={content.name} value={content.textTranslated} />
          </div>
        </div>
      ))}
      <div className='bottom-bar'>
        <input type='submit' id='save' value='Sauvegarder' />
      </div>
    </form>
  )
}

export default Form
