import React, { FormEvent } from 'react'
import { ipcRenderer } from 'electron'
import { useSelector } from 'react-redux'
import Textarea from '../Textarea/Textarea.component'
import { ContentState, GlobalState } from '../../models'

const Form = (): JSX.Element => {
  const { name, path, content: fileContentList } = useSelector((state: GlobalState) => state.gloomhavenFile)

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
        <input type='submit' id='save' value='Sauvegarder' />
      </div>
    </form>
  )
}

export default Form
