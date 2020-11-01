import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { rootGloomhavenReducer } from './store/reducers'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createRootReducer = (history: History): any => {
  return combineReducers({
    router: connectRouter(history),
    ...rootGloomhavenReducer,
  })
}

export default createRootReducer
