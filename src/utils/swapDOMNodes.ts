/*
 * Swaps to given DOM nodes, if they are neighbours
 */
function swapDOMNodes(firstNode: HTMLElement, secondNode: HTMLElement) {
  if (firstNode.nextElementSibling === secondNode) {
    if (firstNode.parentNode) {
      firstNode.parentNode.insertBefore(secondNode, firstNode)
    }
  } else if (secondNode.nextElementSibling === firstNode) {
    if (firstNode.parentNode) {
      firstNode.parentNode.insertBefore(firstNode, secondNode)
    }
  }
}

export { swapDOMNodes }
