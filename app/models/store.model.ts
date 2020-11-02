import { RootState } from '../store'
import { UPDATE_CONTENT_FILE, ADD_FILE, CLEAN_FILE } from '../store/actions'

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
  content: Array<ContentState>
}

export interface FileAction {
  type: typeof ADD_FILE | typeof UPDATE_CONTENT_FILE | typeof CLEAN_FILE
  payload: any
}

export interface RootGloomhavenReducer {
  gloomhavenFile: (state: FileState | undefined, action: FileAction) => FileState
}

export interface GlobalState {
  router: RootState
  gloomhavenFile: FileState
}
