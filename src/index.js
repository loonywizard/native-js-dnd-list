import {
  insertAfter,
  removeDOMNode,
  getDOMNodePosition,
  swapTwoDOMNodes,
} from './utils';

const DIVIDER_HEIGHT = 10;

/*
* Duration of animation, in which dragging item is returning to it's place
* after dragging has stopped
* */
const DURATION_OF_DRAGGING_ITEM_ANIMATION = 200;

const listNode = document.getElementById('list');

const items = Array.from(listNode.getElementsByClassName('item'));

let isMouseDown = false;
let isDragging = false;
let draggingItem = null;
let draggingHasStarted = false;
let mouseOffsetX = null;
let mouseOffsetY = null;
let hasLastAnimationCompleted = true;

/*
* When starting dragging item, we remove it's bottom divider,
* And when we stop dragging, we put that divider after item
* */
let savedDivider = null;

items.forEach((item) => {
  let handler = () => {
    if (hasLastAnimationCompleted) {
      draggingItem = item;
      isMouseDown = true;
    }
  };
  item.addEventListener('mousedown', handler);
  item.addEventListener('touchstart', handler, { passive: true });

  item.ondragstart = () => false; // eslint-disable-line no-param-reassign
});

/*
* This function handles starting of dragging item
* What we need to do, when dragging has started?
*
* 1. Save offsetX and offsetY of mouse and dragging item
* 2. Add 'draggable' class to dragging item class list
* 3. Add 'not-animated' class to divider above the dragging item,
*    Expand divider to the size of dragging item plus two divider's heights
*    Remove 'not-animated' class from divider
* 4. Save divider under dragging item and remove it from DOM
* */
function startDraggingHandler(event) {
  const dividerAbove = draggingItem.previousElementSibling;

  mouseOffsetX = event.pageX - getDOMNodePosition(draggingItem).left;
  mouseOffsetY = event.pageY - getDOMNodePosition(draggingItem).top;

  draggingItem.classList.add('draggable');

  dividerAbove.classList.add('not-animated');
  dividerAbove.style.height = `${2 * DIVIDER_HEIGHT + draggingItem.offsetHeight}px`;

  /*
  * The browser doesn't update transition property, changed by adding and then removing class,
  * because both changes are happening in a single javascript round, so browser takes its chance
  * to optimize the process and doesn't update transition property
  *
  * The solution is to try to access property value, it triggers browser to update
  * property we're trying to access
  *
  * See stackoverflow answer: https://stackoverflow.com/a/24195559
  * */
  window.getComputedStyle(dividerAbove).getPropertyValue('transition');

  dividerAbove.classList.remove('not-animated');

  savedDivider = draggingItem.nextElementSibling;
  removeDOMNode(savedDivider);
}

/*
* This function handles ending for dragging
* What we need to do, when dragging has ended?
*
* 1. Add 'animated-draggable-item' class to dragging item
* 2. Set top and left position to dragging item
* 3. Wait, while animation will complete
* 4. Remove 'draggable' class from dragging item class list
* 5. Add 'not-animated' class to divider above the dragging item,
*    Collapse divider to the size of usual divider height
*    Remove 'not-animated' class from divider
* 6. Restore saved divider and insert it after dragging item
* */
function stopDraggingHandler() {
  const dividerAbove = draggingItem.previousElementSibling;
  const dividerAbovePosition = getDOMNodePosition(dividerAbove);

  draggingItem.classList.add('animated-draggable-item');

  draggingItem.style.top = `${dividerAbovePosition.top + DIVIDER_HEIGHT}px`;
  draggingItem.style.left = `${dividerAbovePosition.left}px`;

  hasLastAnimationCompleted = false;

  setTimeout(() => {
    draggingItem.classList.remove('draggable');
    draggingItem.classList.remove('animated-draggable-item');

    dividerAbove.classList.add('not-animated');
    dividerAbove.style.height = `${DIVIDER_HEIGHT}px`;

    // see startDraggingHandler function for comment
    window.getComputedStyle(dividerAbove).getPropertyValue('transition');

    dividerAbove.classList.remove('not-animated');

    insertAfter(savedDivider, draggingItem);

    hasLastAnimationCompleted = true;
    draggingItem = null;
  }, DURATION_OF_DRAGGING_ITEM_ANIMATION);
}

function handleDragging(event) {
  if (!draggingHasStarted) {
    startDraggingHandler(event);
    draggingHasStarted = true;
  }

  // Update dragging item position
  draggingItem.style.top = `${event.pageY - mouseOffsetY}px`;
  draggingItem.style.left = `${event.pageX - mouseOffsetX}px`;

  const draggingItemCoordinates = getDOMNodePosition(draggingItem);

  /*
  * <div class="divider"></div>             | Divider above previous item
  * <div class="item"> ... </div>           | Previous item before dragging item
  * <div class="divider"></div>             | Divider between previous and dragging items
  * <div class="item draggable"> ... </div> | ** Dragging item **
  * <div class="item"> ... </div>           | Next item after dragging item
  * <div class="divider"></div>             | Divider under next item
  * */
  const prevItem = draggingItem.previousElementSibling.previousElementSibling;
  const nextItem = draggingItem.nextElementSibling;

  /*
  * We should swap dragging item with previous item when:
  *
  * 1. Previous item exists
  * 2. Y center coordinate of dragging item is less than Y center coordinate of previous item
  * */
  if (prevItem) {
    const prevItemCoordinates = getDOMNodePosition(prevItem);
    const shouldSwapItems = (
      draggingItemCoordinates.top + draggingItem.offsetHeight / 2 <
      prevItemCoordinates.top + prevItem.offsetHeight / 2
    );

    if (shouldSwapItems) {
      const dividerAboveDraggingItem = draggingItem.previousElementSibling;
      const dividerAbovePrevItem = prevItem.previousElementSibling;

      dividerAboveDraggingItem.style.height = `${DIVIDER_HEIGHT}px`;

      swapTwoDOMNodes(draggingItem, dividerAboveDraggingItem);
      swapTwoDOMNodes(draggingItem, prevItem);

      dividerAbovePrevItem.style.height = `${draggingItem.offsetHeight + 2 * DIVIDER_HEIGHT}px`;

      return;
    }
  }

  /*
  * We should swap dragging item with next item when:
  *
  * 1. Previous item exists
  * 2. Y center coordinate of dragging item is more than Y center coordinate of next item
  * */
  if (nextItem) {
    const nextItemCoodridanes = getDOMNodePosition(nextItem);
    const shouldSwapItems = (
      draggingItemCoordinates.top + draggingItem.offsetHeight / 2 >
      nextItemCoodridanes.top + nextItem.offsetHeight / 2
    );

    if (shouldSwapItems) {
      const dividerAboveDraggingItem = draggingItem.previousElementSibling;
      const dividerUnderNextItem = nextItem.nextElementSibling;

      dividerAboveDraggingItem.style.height = `${DIVIDER_HEIGHT}px`;

      swapTwoDOMNodes(draggingItem, nextItem);
      swapTwoDOMNodes(draggingItem, dividerUnderNextItem);

      dividerUnderNextItem.style.height = `${draggingItem.offsetHeight + 2 * DIVIDER_HEIGHT}px`;
    }
  }
}

let endHandler = () => {
  if (draggingItem && isDragging) {
    stopDraggingHandler();
  }
  isMouseDown = false;
  isDragging = false;
  draggingHasStarted = false;
  mouseOffsetX = null;
  mouseOffsetY = null;
};

document.addEventListener('mouseup', endHandler);
document.addEventListener('touchend', endHandler);

let moveHandler = (event, positionHolder) => {
  isDragging = isMouseDown;
  if (isDragging) {
    event.preventDefault();
    handleDragging(positionHolder || event);
  }
};

document.addEventListener('mousemove', moveHandler);
document.addEventListener('touchmove', (event) => moveHandler(event, event.touches[0]), { passive: false });
// Explicit { passive: false } required from Chrome v56 [ https://www.chromestatus.com/features/5093566007214080 ]
