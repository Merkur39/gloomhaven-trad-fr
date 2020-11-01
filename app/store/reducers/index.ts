import { RootGloomhavenReducer } from '../../models'
import fileReducer from './file.reducer'

export const rootGloomhavenReducer: RootGloomhavenReducer = {
  gloomhavenFile: fileReducer,
}
