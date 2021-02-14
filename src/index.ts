import { createStartDraggingHandler } from './startDraggingHandler'
import { createStopDraggingHandler } from './stopDraggingHandler'
import { createDraggingHandler } from './draggingHandler'

import { INITIAL_APP_STATE } from './consts'

import { fixContainerHeight } from './utils/fixContainerHeight'

import { IAppState } from './types'

function init() {
  const state: IAppState = INITIAL_APP_STATE
  const listItems = <HTMLElement[]>Array.from(document.getElementsByClassName('item'))

  fixContainerHeight(<HTMLElement>document.getElementById('list'))

  const stopDraggingHandler = createStopDraggingHandler(state)
  const draggingHandler = createDraggingHandler(state)
  
  listItems.forEach((listItem) => {
    const startDraggingHandler = createStartDraggingHandler(state, listItem)

    listItem.addEventListener('mousedown', startDraggingHandler)
    listItem.addEventListener('touchstart', startDraggingHandler)

    listItem.ondragstart = () => false
  })

  document.addEventListener('mouseup', stopDraggingHandler)
  document.addEventListener('touchend', stopDraggingHandler)

  document.addEventListener('mousemove', draggingHandler)
  document.addEventListener('touchmove', draggingHandler, { passive: false })
}

window.onload = init

