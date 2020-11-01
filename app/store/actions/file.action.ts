import { AddFileAction, CleanAction, FileState } from '../../models'

export const ADD_FILE = 'ADD_FILE'
export const CLEAN_FILE = 'CLEAN_FILE'

export const addFile = (file: FileState): AddFileAction => {
  return {
    type: ADD_FILE,
    payload: file,
  }
}

export const cleanFile = (): CleanAction => {
  return {
    type: CLEAN_FILE,
    payload: null,
  }
}
