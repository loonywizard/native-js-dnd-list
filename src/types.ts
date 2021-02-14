interface IDOMNodePosition {
  left: number,
  top: number,
}

interface IAppState {
  isMouseDown: boolean,
  isDragging: boolean,
  draggingHasStarted: boolean,
  
  /*
   * When starting element dragging remember X and Y offset:
   * distance between top-left corner of element and mouse
   */
  mouseOffsetX: number | null,
  mouseOffsetY: number | null,

  /*
   * When starting dragging item, we remove it's bottom divider,
   * And when we stop dragging, we put that divider after item
   */
  savedDividerElement: HTMLElement | null,
  draggingItem: HTMLElement | null,
}

export { IDOMNodePosition, IAppState }
