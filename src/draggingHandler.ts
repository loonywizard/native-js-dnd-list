import { getDOMNodePosition } from './utils/getDOMNodePosition'
import { swapDOMNodes } from './utils/swapDOMNodes'
import { getPrevListItem } from './utils/getPrevListItem'
import { getNextListItem } from './utils/getNextListItem'

import { DIVIDER_HEIGHT } from './consts'

import { IStartDraggingHandler } from './startDraggingHandler'
import { IAppState } from './types'


function createDraggingHandler(state: IAppState, startDraggingHandler: IStartDraggingHandler) {
  function handleDragging(event: MouseEvent | TouchEvent) {
    state.isDragging = state.isMouseDown

    if (!state.isDragging) return

    event.preventDefault()

    const mouseEventOrTouch: MouseEvent | Touch = (
      event instanceof TouchEvent ? event.touches[0] : event
    )

    if (!state.draggingHasStarted) {
      startDraggingHandler(mouseEventOrTouch)
    }

    if (!state.draggingItem) return

    if (state.mouseOffsetX !== null && state.mouseOffsetY !== null) {
      /* Update dragging item position */
      state.draggingItem.style.top = `${mouseEventOrTouch.pageY - state.mouseOffsetY}px`
      state.draggingItem.style.left = `${mouseEventOrTouch.pageX - state.mouseOffsetX}px`
    }
    
    const draggingItemCoordinates = getDOMNodePosition(state.draggingItem)

    const prevItem = getPrevListItem(state.draggingItem)
    const nextItem = getNextListItem(state.draggingItem)

    /*
     * Swap dragging item with previous item when:
     *
     * 1. Previous item exists
     * 2. Y center coordinate of dragging item is less than Y center coordinate of previous item
     */
    if (prevItem) {
      const prevItemCoordinates = getDOMNodePosition(prevItem)
      const shouldSwaplistItems = (
        draggingItemCoordinates.top + state.draggingItem.offsetHeight / 2 <
        prevItemCoordinates.top + prevItem.offsetHeight / 2
      )

      if (shouldSwaplistItems) {
        const dividerAboveDraggingItem = <HTMLElement>state.draggingItem.previousElementSibling
        const dividerAbovePrevItem = <HTMLElement>prevItem.previousElementSibling

        dividerAboveDraggingItem.style.height = `${DIVIDER_HEIGHT}px`

        swapDOMNodes(state.draggingItem, dividerAboveDraggingItem)
        swapDOMNodes(state.draggingItem, prevItem)

        dividerAbovePrevItem.style.height = `${state.draggingItem.offsetHeight + 2 * DIVIDER_HEIGHT}px`

        return
      }
    }

    /*
     * Swap dragging item with next item when:
     *
     * 1. Previous item exists
     * 2. Y center coordinate of dragging item is more than Y center coordinate of next item
     */
    if (nextItem) {
      const nextItemCoodridanes = getDOMNodePosition(nextItem)
      const shouldSwaplistItems = (
        draggingItemCoordinates.top + state.draggingItem.offsetHeight / 2 >
        nextItemCoodridanes.top + nextItem.offsetHeight / 2
      )

      if (shouldSwaplistItems) {
        const dividerAboveDraggingItem = <HTMLElement>state.draggingItem.previousElementSibling
        const dividerUnderNextItem = <HTMLElement>nextItem.nextElementSibling

        dividerAboveDraggingItem.style.height = `${DIVIDER_HEIGHT}px`

        swapDOMNodes(state.draggingItem, nextItem)
        swapDOMNodes(state.draggingItem, dividerUnderNextItem)

        dividerUnderNextItem.style.height = `${state.draggingItem.offsetHeight + 2 * DIVIDER_HEIGHT}px`
      }
    }
  }

  return handleDragging
}

export { createDraggingHandler }
