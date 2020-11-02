import { FileAction, FileState } from '../../models'
import { ADD_FILE, UPDATE_CONTENT_FILE, CLEAN_FILE } from '../actions/file.action'

export const INIT_STATE: FileState = {
  name: null,
  path: null,
  lastModified: null,
  size: null,
  type: null,
  content: [],
}

const fileReducer = (state = INIT_STATE, action: FileAction): FileState => {
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

    case UPDATE_CONTENT_FILE:
      const elementsIndex = state.content.findIndex((content) => content.id == action.payload.id)
      if (elementsIndex >= 0) {
        const newContent = [...state.content]
        newContent[elementsIndex] = { ...newContent[elementsIndex], textTranslated: action.payload.textTranslated }
        return { ...state, content: newContent }
      }

      return state

    case CLEAN_FILE:
      return INIT_STATE

    default:
      return state
  }
}

export default fileReducer
