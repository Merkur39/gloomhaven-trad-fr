import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '../../models'
import { addFile } from '../../store/actions'

const Upload = (): JSX.Element => {
  const dispatch = useDispatch()
  const { name } = useSelector((state: GlobalState) => state.gloomhavenFile)

  const onUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files && evt.target.files[0]

    if (file) {
      const { name, path, lastModified, size, type } = file

      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = (evt) => {
        const content = JSON.parse((evt.target as FileReader).result as string)
        if (!content) throw 'Upload error'

        dispatch(addFile({ name, path, lastModified, size, type, content }))
      }
    }
  }

  return (
    <div className='upload-container'>
      <input type='file' className='custom-file-input' id='uploadFile' accept='.json' onChange={onUpload} />
      <label className='custom-file-label' htmlFor='uploadFile'>
        Ajouter votre fichier
      </label>
      {name && <div className='filename'>{name}</div>}
    </div>
  )
}

export default Upload
