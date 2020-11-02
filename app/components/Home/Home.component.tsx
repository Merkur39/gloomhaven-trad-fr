import React from 'react'
import { useSelector } from 'react-redux'
import Upload from '../Upload/Upload.component'
import Form from '../Form/Form.component'
import { FileState, GlobalState } from '../../models'

const Home = (): JSX.Element => {
  const { content: fileContentList }: FileState = useSelector((state: GlobalState) => state.gloomhavenFile)

  return (
    <>
      <Upload />
      {fileContentList && fileContentList.length > 0 && <Form />}
    </>
  )
}

export default Home
