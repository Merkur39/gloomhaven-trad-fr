import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'
import { ContentState } from '../../models'
import { updateContentFile } from '../../store/actions'

const Textarea = ({ fileContent }: { fileContent: ContentState }): JSX.Element => {
  const dispatch = useDispatch()
  const { name, textTranslated } = fileContent
  const [state, setState] = useState(textTranslated)

  const onBlur = () => {
    setState(state.trim())
    dispatch(updateContentFile({ ...fileContent, textTranslated: state.trim() }))
  }

  const onChange = (evt: ChangeEvent<HTMLTextAreaElement>) => setState(evt.target.value)

  return <TextareaAutosize minRows={2} value={state} name={name} onChange={onChange} onBlur={onBlur} />
}

export default Textarea
