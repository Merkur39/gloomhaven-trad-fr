import { ContentState, FileAction, FileState } from '../../models'

export const ADD_FILE = 'ADD_FILE'
export const UPDATE_CONTENT_FILE = 'UPDATE_CONTENT_FILE'
export const CLEAN_FILE = 'CLEAN_FILE'

export const addFile = (file: FileState): FileAction => {
  return {
    type: ADD_FILE,
    payload: file,
  }
}

export const updateContentFile = (content: ContentState): FileAction => {
  return {
    type: UPDATE_CONTENT_FILE,
    payload: content,
  }
}

export const cleanFile = (): FileAction => {
  return {
    type: CLEAN_FILE,
    payload: null,
  }
}
