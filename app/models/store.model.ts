import { RootState } from '../store'
import { ADD_FILE, CLEAN_FILE } from '../store/actions'

export interface ContentState {
  category: string
  checked: boolean
  id: number
  name: string
  textSource: string
  textTranslated: string
}

export interface FileState {
  name: string | null
  path: string | null
  lastModified: number | null
  size: number | null
  type: string | null
  content: Array<ContentState> | null
}

export interface AddFileAction {
  type: typeof ADD_FILE
  payload: FileState
}

export interface CleanAction {
  type: typeof CLEAN_FILE
  payload: null
}

export interface RootGloomhavenReducer {
  gloomhavenFile: (state: FileState, action: AddFileAction | CleanAction) => FileState
}

export interface GlobalState {
  router: RootState
  gloomhavenFile: FileState
}
