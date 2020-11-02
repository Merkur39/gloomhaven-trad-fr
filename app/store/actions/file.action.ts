import { ContentState, FileAction, FileState } from '../../models'

export const ADD_FILE = 'ADD_FILE'
export const ADD_CONTENT_FILE = 'ADD_CONTENT_FILE'
export const CLEAN_FILE = 'CLEAN_FILE'

export const addFile = (file: FileState): FileAction => {
  return {
    type: ADD_FILE,
    payload: file,
  }
}

export const addContentFile = (content: ContentState): FileAction => {
  return {
    type: ADD_CONTENT_FILE,
    payload: content,
  }
}

export const cleanFile = (): FileAction => {
  return {
    type: CLEAN_FILE,
    payload: null,
  }
}
