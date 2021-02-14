import { IAppState } from './types'

/*
 * Height of divider element in pixels
 */
const DIVIDER_HEIGHT = 10

/*
 * Duration of animation in ms, in which dragging item is returned to it's place
 * after dragging has stopped
 */
const DURATION_OF_DRAGGING_ITEM_ANIMATION = 100

const INITIAL_APP_STATE: IAppState = {
  isMouseDown: false,
  isDragging: false,
  draggingHasStarted: false,
  hasLastAnimationCompleted: true,

  mouseOffsetX: null,
  mouseOffsetY: null,
  
  savedDividerElement: null,
  draggingItem: null,
}

export {
  DIVIDER_HEIGHT,
  DURATION_OF_DRAGGING_ITEM_ANIMATION,
  INITIAL_APP_STATE,
}
