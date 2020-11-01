import React, { ChangeEvent, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

const Textarea = ({ value, name }: { value: string; name: string }): JSX.Element => {
  const [state, setState] = useState(value)

  const onBlur = () => setState(state.trim())
  const onChange = (evt: ChangeEvent<HTMLTextAreaElement>) => setState(evt.target.value)

  return <TextareaAutosize minRows={2} value={state} name={name} onChange={onChange} onBlur={onBlur} />
}

export default Textarea
