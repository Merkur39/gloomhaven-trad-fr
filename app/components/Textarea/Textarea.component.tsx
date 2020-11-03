import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'
import { ContentState } from '../../models'
import { updateContentFile } from '../../store/actions'

const Textarea = ({ fileContent }: { fileContent: ContentState }): JSX.Element => {
  const dispatch = useDispatch()
  const { name, textTranslated } = fileContent
  const [oldState, setOldState] = useState(textTranslated)
  const [state, setState] = useState(textTranslated)
  // const [hasChanged, setHasChanged] = useState(false)

  const onBlur = () => {
    let hasChanged = false
    setState(state.trim())

    if (state.trim() !== oldState) {
      hasChanged = true
      setOldState(state.trim())
    }

    if (hasChanged) {
      dispatch(updateContentFile({ ...fileContent, textTranslated: state.trim() }))
      hasChanged = false
    }
  }

  const onChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    evt.persist()

    setState(evt.target.value)
  }

  return <TextareaAutosize minRows={2} value={state} name={name} onChange={onChange} onBlur={onBlur} />
}

export default Textarea
