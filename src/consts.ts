import { IAppState } from './types'

/*
 * Height of divider element in pixels
 */
const DIVIDER_HEIGHT = 10

const INITIAL_APP_STATE: IAppState = {
  isMouseDown: false,
  isDragging: false,
  draggingHasStarted: false,

  mouseOffsetX: null,
  mouseOffsetY: null,
  
  savedDividerElement: null,
  draggingItem: null,
}

export {
  DIVIDER_HEIGHT,
  INITIAL_APP_STATE,
}
