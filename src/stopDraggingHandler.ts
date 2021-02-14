import { getDOMNodePosition } from './utils/getDOMNodePosition'
import { insertDOMNodeAfter } from './utils/insertDOMNodeAfter'
import { accessElementTransitionProperty } from './utils/accessElementTransitionProperty'

import { DIVIDER_HEIGHT } from './consts'

import { IAppState } from './types'


function createStopDraggingHandler(state: IAppState) {
  function stopDraggingHandler() {
    if (state.draggingItem) {
      const dividerAbove = <HTMLElement>state.draggingItem.previousElementSibling
      const dividerAbovePosition = getDOMNodePosition(dividerAbove)

      state.draggingItem.style.top = `${dividerAbovePosition.top + DIVIDER_HEIGHT}px`
      state.draggingItem.style.left = `${dividerAbovePosition.left}px`

      state.draggingItem.classList.remove('draggable')

      dividerAbove.classList.add('not-animated')
      dividerAbove.style.height = `${DIVIDER_HEIGHT}px`

      accessElementTransitionProperty(dividerAbove)

      dividerAbove.classList.remove('not-animated')

      if (state.savedDividerElement) {
        insertDOMNodeAfter(state.savedDividerElement, state.draggingItem)
      }

      state.draggingItem = null
    }

    state.isMouseDown = false
    state.isDragging = false
    state.draggingHasStarted = false
    state.mouseOffsetX = null
    state.mouseOffsetY = null
  }

  return stopDraggingHandler
}

export { createStopDraggingHandler }
