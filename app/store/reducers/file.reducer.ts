import { FileAction, FileState } from '../../models'
import { ADD_FILE, ADD_CONTENT_FILE, CLEAN_FILE } from '../actions/file.action'

const INIT_STATE: FileState = {
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

    case ADD_CONTENT_FILE:
      const elementsIndex = state.content.findIndex((c) => c.id == action.payload.id)
      if (elementsIndex >= 0) {
        const newArray = [...state.content]
        newArray[elementsIndex] = { ...newArray[elementsIndex], textTranslated: action.payload.textTranslated }
        return { ...state, content: newArray }
      }

      return state

    case CLEAN_FILE:
      return INIT_STATE

    default:
      return state
  }
}

export default fileReducer
