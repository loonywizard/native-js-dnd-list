import { getDOMNodePosition } from './utils/getDOMNodePosition'
import { removeDOMNode } from './utils/removeDOMNode'
import { accessElementTransitionProperty } from './utils/accessElementTransitionProperty'

import { DIVIDER_HEIGHT } from './consts'

import { IAppState } from './types'

type IStartDraggingHandler = (event: MouseEvent | Touch) => void

/*
 * This function handles starting of dragging item
 * What we need to do, when dragging has started?
 *
 * 1. Set draggingHasStarted to true
 * 2. Save offsetX and offsetY of mouse and dragging item
 * 3. Add 'draggable' class to dragging item class list
 * 4. Add 'not-animated' class to divider above the dragging item,
 * 5. Expand divider to the size of dragging item plus two divider's heights
 * 6. Remove 'not-animated' class from divider
 * 7. Save divider under dragging item and remove it from DOM
 */
function createStartDraggingHandler(state: IAppState) {
  function startDraggingHandler(event: MouseEvent | Touch) {
    if (!state.draggingItem) return

    state.draggingHasStarted = true

    state.mouseOffsetX = event.pageX - getDOMNodePosition(state.draggingItem).left
    state.mouseOffsetY = event.pageY - getDOMNodePosition(state.draggingItem).top

    state.draggingItem.classList.add('draggable')

    const dividerAbove = <HTMLElement>state.draggingItem.previousElementSibling

    dividerAbove.classList.add('not-animated')
    dividerAbove.style.height = `${2 * DIVIDER_HEIGHT + state.draggingItem.offsetHeight}px`

    accessElementTransitionProperty(dividerAbove)

    dividerAbove.classList.remove('not-animated')

    state.savedDividerElement = <HTMLElement>state.draggingItem.nextElementSibling
    removeDOMNode(state.savedDividerElement)
  }

  return startDraggingHandler
}

export { IStartDraggingHandler, createStartDraggingHandler }