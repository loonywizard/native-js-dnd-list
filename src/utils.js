/**
 * This function removes given DOM node
 *
 * @param node - DOM Node to remove
 * */
export function removeDOMNode(node) {
  node.parentNode.removeChild(node);
}

/**
 * This function inserts first given DOM node after second given DOM node
 *
 * @param node - DOM node to insert
 * @param refNode - DOM node, after which first node should be inserted
 * */
export function insertAfter(node, refNode) {
  const { parentNode } = refNode;
  const nextNode = refNode.nextElementSibling;
  if (nextNode) {
    parentNode.insertBefore(node, nextNode);
  } else {
    parentNode.appendChild(node);
  }
}

/**
 * This function returns position of given DOM node
 *
 * @param node - DOM node
 *
 * @returns {Object} { top, left }
 * */
export function getDOMNodePosition(node) {
  const { top, left } = node.getBoundingClientRect();
  return { top, left };
}

/**
 * This function swaps to given DOM nodes, THAT COME ONE AFTER ANOTHER!
 *
 * @param node1 - first DOM node
 * @param node2 - second DOM node
 * */
export function swapTwoDOMNodes(node1, node2) {
  if (node1.nextElementSibling === node2) {
    node1.parentNode.insertBefore(node2, node1);
  } else if (node2.nextElementSibling === node1) {
    node1.parentNode.insertBefore(node1, node2);
  }
}
