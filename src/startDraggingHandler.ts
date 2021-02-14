import { getDOMNodePosition } from './utils/getDOMNodePosition'
import { removeDOMNode } from './utils/removeDOMNode'
import { accessElementTransitionProperty } from './utils/accessElementTransitionProperty'

import { DIVIDER_HEIGHT } from './consts'

import { IAppState } from './types'


function createStartDraggingHandler(state: IAppState, listItem: HTMLElement) {
  function startDraggingHandler(event: MouseEvent | TouchEvent) {
    if (!state.hasLastAnimationCompleted) return

    const mouseEventOrTouch: MouseEvent | Touch = (
      event instanceof TouchEvent ? event.touches[0] : event
    )
    
    state.draggingItem = listItem
    state.isMouseDown = true
    state.draggingHasStarted = true

    state.mouseOffsetX = mouseEventOrTouch.pageX - getDOMNodePosition(state.draggingItem).left
    state.mouseOffsetY = mouseEventOrTouch.pageY - getDOMNodePosition(state.draggingItem).top

    state.draggingItem.classList.add('draggable')

    state.draggingItem.style.top = `${mouseEventOrTouch.pageY - state.mouseOffsetY}px`
    state.draggingItem.style.left = `${mouseEventOrTouch.pageX - state.mouseOffsetX}px`

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

export { createStartDraggingHandler }