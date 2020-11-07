import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ipcRenderer } from 'electron'
import { GlobalState } from '../../models'
import Upload from '../Upload/Upload.component'
import Form from '../Form/Form.component'

const Home = (): JSX.Element => {
  const { name, path, content: fileContentList } = useSelector((state: GlobalState) => state.gloomhavenFile)

  useEffect(() => {
    const checkKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 's' && evt.ctrlKey && name) {
        ipcRenderer.send('saveFile', { name, path, fileContentList })
      }
    }

    window.addEventListener('keydown', checkKeyDown)

    return () => window.removeEventListener('keydown', checkKeyDown)
  }, [name, path, fileContentList])

  return (
    <>
      <Upload />
      {fileContentList.length > 0 && <Form />}
    </>
  )
}

export default Home
