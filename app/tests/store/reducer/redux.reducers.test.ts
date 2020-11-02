import { ADD_FILE, UPDATE_CONTENT_FILE, CLEAN_FILE } from '../../../store/actions'
import { rootGloomhavenReducer } from '../../../store/reducers'
import { INIT_STATE } from '../../../store/reducers/file.reducer'
import { mockContent_0, mockContent_0_updated, mockContent_1, mockFile } from '../../mocks/file.mock'

const { gloomhavenFile } = rootGloomhavenReducer

describe('Redux Reducers', () => {
  it('should unknow action return the current state', () => {
    expect(
      gloomhavenFile(undefined, {
        type: 'UNKNOW' as typeof CLEAN_FILE,
        payload: mockFile,
      })
    ).toEqual(INIT_STATE)
  })

  it('should CLEAN_FILE action return the initial state', () => {
    expect(
      gloomhavenFile(undefined, {
        type: CLEAN_FILE,
        payload: null,
      })
    ).toEqual(INIT_STATE)
  })

  it('should ADD_FILE action return state updated', () => {
    expect(
      gloomhavenFile(undefined, {
        type: ADD_FILE,
        payload: mockFile,
      })
    ).toEqual(mockFile)
  })

  it('should UPDATE_CONTENT_FILE action return state updated', () => {
    expect(
      gloomhavenFile(
        {
          ...mockFile,
          content: [mockContent_0],
        },
        {
          type: UPDATE_CONTENT_FILE,
          payload: mockContent_0_updated,
        }
      )
    ).toEqual({
      ...mockFile,
      content: [mockContent_0_updated],
    })
  })

  it('should UPDATE_CONTENT_FILE action return same state if content not found', () => {
    expect(
      gloomhavenFile(
        {
          ...mockFile,
          content: [mockContent_0],
        },
        {
          type: UPDATE_CONTENT_FILE,
          payload: mockContent_1,
        }
      )
    ).toEqual({
      ...mockFile,
      content: [mockContent_0],
    })
  })
})
