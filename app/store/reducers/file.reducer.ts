import { AddFileAction, CleanAction, FileState } from '../../models'
import { ADD_FILE, CLEAN_FILE } from '../actions/file.action'

const INIT_STATE: FileState = {
  name: null,
  path: null,
  lastModified: null,
  size: null,
  type: null,
  content: null,
}

const fileReducer = (state = INIT_STATE, action: AddFileAction | CleanAction): FileState => {
  switch (action.type) {
    case ADD_FILE:
      const { name, path, lastModified, size, type, content } = action.payload
      return {
        ...state,
        name,
        path,
        lastModified,
        size,
        type,
        content,
      }

    case CLEAN_FILE:
      return INIT_STATE

    default:
      return state
  }
}

export default fileReducer
