// import '../assets/styles.css'

import { createStartDraggingHandler } from './startDraggingHandler'
import { createStopDraggingHandler } from './stopDraggingHandler'
import { createDraggingHandler } from './draggingHandler'
import { createMouseDownHandler } from './onMouseDown'

import { INITIAL_APP_STATE } from './consts'

import { IAppState } from './types'

function init() {
  const state: IAppState = INITIAL_APP_STATE
  const listItems = <HTMLElement[]>Array.from(document.getElementsByClassName('item'))

  const startDraggingHandler = createStartDraggingHandler(state)
  const stopDraggingHandler = createStopDraggingHandler(state)
  const draggingHandler = createDraggingHandler(state, startDraggingHandler)
  
  listItems.forEach((listItem) => {
    const onMouseDownHandler = createMouseDownHandler(state, listItem)

    listItem.addEventListener('mousedown', onMouseDownHandler)
    listItem.addEventListener('touchstart', onMouseDownHandler)

    listItem.ondragstart = () => false
  })

  document.addEventListener('mouseup', stopDraggingHandler)
  document.addEventListener('touchend', stopDraggingHandler)

  document.addEventListener('mousemove', draggingHandler)
  document.addEventListener('touchmove', draggingHandler, { passive: false })
}

window.onload = init

