import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createRootReducer = (history: History): any => {
  return combineReducers({
    router: connectRouter(history),
  })
}

export default createRootReducer
