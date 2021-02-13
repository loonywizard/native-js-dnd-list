/*
 * <div class="item draggable"> ... </div> | ** Dragging item **
 * <div class="item"> ... </div>           | Next item after dragging item
 */
function getNextListItem(listItem: HTMLElement): HTMLElement | null {
  return <HTMLElement | null>listItem.nextElementSibling
}

export { getNextListItem }
