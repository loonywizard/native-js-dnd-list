import { IAppState } from './types'

function createMouseDownHandler(state: IAppState, listItem: HTMLElement) {
  function onMouseDown() {
    if (state.hasLastAnimationCompleted) {
      state.draggingItem = listItem
      state.isMouseDown = true
    }
  }

  return onMouseDown
}

export { createMouseDownHandler }
