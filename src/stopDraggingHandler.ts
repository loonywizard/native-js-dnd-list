import { getDOMNodePosition } from './utils/getDOMNodePosition'
import { insertDOMNodeAfter } from './utils/insertDOMNodeAfter'
import { accessElementTransitionProperty } from './utils/accessElementTransitionProperty'

import { DIVIDER_HEIGHT, DURATION_OF_DRAGGING_ITEM_ANIMATION } from './consts'

import { IAppState } from './types'

/*
 * This function handles end for dragging
 * What we need to do, when dragging has ended?
 *
 * 1. Add 'animated-draggable-item' class to dragging item
 * 2. Set top and left position to dragging item
 * 3. Wait, while animation will complete
 * 4. Remove 'draggable' and 'animated-draggable-item' classes from dragging item class list
 * 5. Add 'not-animated' class to divider above the dragging item,
 * 6. Collapse divider to the size of usual divider height
 * 7. Remove 'not-animated' class from divider
 * 8. Restore saved divider and insert it after dragging item
 * 9. Reset variables in state to false / null
 */
function createStopDraggingHandler(state: IAppState) {
  function stopDraggingHandler() {
    if (state.draggingItem && state.isDragging) {
      state.draggingItem.classList.add('animated-draggable-item')

      const dividerAbove = <HTMLElement>state.draggingItem.previousElementSibling
      const dividerAbovePosition = getDOMNodePosition(dividerAbove)

      state.draggingItem.style.top = `${dividerAbovePosition.top + DIVIDER_HEIGHT}px`
      state.draggingItem.style.left = `${dividerAbovePosition.left}px`

      state.hasLastAnimationCompleted = false

      setTimeout(() => {
        if (!state.draggingItem) return

        state.draggingItem.classList.remove('draggable')
        state.draggingItem.classList.remove('animated-draggable-item')

        dividerAbove.classList.add('not-animated')
        dividerAbove.style.height = `${DIVIDER_HEIGHT}px`

        accessElementTransitionProperty(dividerAbove)

        dividerAbove.classList.remove('not-animated')

        if (state.savedDividerElement) {
          insertDOMNodeAfter(state.savedDividerElement, state.draggingItem)
        }

        state.hasLastAnimationCompleted = true
        state.draggingItem = null
      }, DURATION_OF_DRAGGING_ITEM_ANIMATION)
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
