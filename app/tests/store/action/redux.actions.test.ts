import { FileAction } from '../../../models'
import { ADD_FILE, UPDATE_CONTENT_FILE, CLEAN_FILE, addFile, updateContentFile, cleanFile } from '../../../store/actions'
import { mockContent_0, mockFile } from '../../mocks/file.mock'

describe('Redux Actions', () => {
  it('should create an action to add file', () => {
    const expectedAction: FileAction = { type: ADD_FILE, payload: mockFile }

    expect(addFile(mockFile)).toEqual(expectedAction)
  })

  it('should create an action to update content file', () => {
    const expectedAction: FileAction = { type: UPDATE_CONTENT_FILE, payload: mockContent_0 }

    expect(updateContentFile(mockContent_0)).toEqual(expectedAction)
  })

  it('should create an action to reset file', () => {
    const expectedAction: FileAction = { type: CLEAN_FILE, payload: null }

    expect(cleanFile()).toEqual(expectedAction)
  })
})
