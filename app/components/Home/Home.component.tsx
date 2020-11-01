import React from 'react'
import { useSelector } from 'react-redux'
import Upload from '../Upload/Upload.component'
import Form from '../Form/Form.component'
import { FileState, GlobalState } from '../../models'

const Home = (): JSX.Element => {
  const gloomhavenFile: FileState = useSelector((state: GlobalState) => state.gloomhavenFile)

  return (
    <>
      <Upload />
      {gloomhavenFile.content && gloomhavenFile.content.length > 0 && <Form contentList={gloomhavenFile.content} />}
    </>
  )
}

export default Home
