/*
 * <div class="item"> ... </div>           | Previous item before dragging item
 * <div class="divider"></div>             | Divider between previous and dragging listItems
 * <div class="item draggable"> ... </div> | ** Dragging item **
 */
function getPrevListItem(listItem: HTMLElement): HTMLElement | null {
  const divider = listItem.previousElementSibling

  if (!divider) return null

  return <HTMLElement | null>divider.previousElementSibling
}

export { getPrevListItem }
