/*
 * Removes given DOM node
 */
function removeDOMNode(node: HTMLElement) {
  if (node.parentNode) node.parentNode.removeChild(node)
}

export { removeDOMNode }
