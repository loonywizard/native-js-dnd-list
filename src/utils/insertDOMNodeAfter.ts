/*
 * Inserts given DOM node after given ref node
 */
function insertDOMNodeAfter(nodeToInsert: HTMLElement, refNode: HTMLElement) {
  const nextNode = refNode.nextElementSibling

  if (!refNode.parentNode) return

  if (nextNode) {
    refNode.parentNode.insertBefore(nodeToInsert, nextNode)
  } else {
    refNode.parentNode.appendChild(nodeToInsert)
  }
}

export { insertDOMNodeAfter }
