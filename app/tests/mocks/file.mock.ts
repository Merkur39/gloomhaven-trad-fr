import { ContentState, FileState } from '../../models'

export const mockFile: FileState = {
  name: 'file-test',
  path: 'C:/Test',
  lastModified: 123456789,
  size: 123456,
  type: 'application/json',
  content: [],
}

export const mockContent_0: ContentState = {
  category: 'quête_0',
  checked: false,
  id: 0,
  name: 'key_translation_0',
  textSource: 'Translation_0',
  textTranslated: 'Traduction_0',
}
export const mockContent_0_updated: ContentState = {
  category: 'quête_0',
  checked: false,
  id: 0,
  name: 'key_translation_0',
  textSource: 'Translation_0',
  textTranslated: 'Traduction_1',
}

export const mockContent_1: ContentState = {
  category: 'quête_1',
  checked: false,
  id: 1,
  name: 'key_translation_1',
  textSource: 'Translation_1',
  textTranslated: 'Traduction_1',
}
