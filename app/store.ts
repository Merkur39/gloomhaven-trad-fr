import { configureStore, getDefaultMiddleware, Action } from '@reduxjs/toolkit'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import { ThunkAction } from 'redux-thunk'
import createRootReducer from './rootReducer'

export const history = createHashHistory()
const rootReducer = createRootReducer(history)
export type RootState = ReturnType<typeof rootReducer>

const router = routerMiddleware(history)
const middleware = [...getDefaultMiddleware(), router]

const excludeLoggerEnvs = ['test', 'production']
const shouldIncludeLogger = !excludeLoggerEnvs.includes(process.env.NODE_ENV || '')

if (shouldIncludeLogger) {
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  })
  middleware.push(logger)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const configuredStore = (initialState?: RootState): any => {
  // Create Store
  const store = configureStore({
    reducer: rootReducer,
    middleware,
    preloadedState: initialState,
  })

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept(
      './rootReducer',
      // eslint-disable-next-line global-require
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      () => store.replaceReducer(require('./rootReducer').default)
    )
  }
  return store
}
export type Store = ReturnType<typeof configuredStore>
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
