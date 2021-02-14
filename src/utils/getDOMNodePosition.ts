import { IDOMNodePosition } from '../types'

/*
 * Returns position of given DOM node
 */
function getDOMNodePosition(node: HTMLElement): IDOMNodePosition {
  const { top, left } = node.getBoundingClientRect()

  return { top: top + document.documentElement.scrollTop, left }
}

export { getDOMNodePosition }
