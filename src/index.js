const listNode = document.getElementById('list');

const items = Array.from(listNode.getElementsByClassName('item'));

let isMouseDown = false;
let isDragging = false;
let draggableItemId = null;
let draggingHasStarted = false;
let divider = null;

items.forEach(item => {
  item.addEventListener('mousedown', () => {
    draggableItemId = item.getAttribute('key');
    isMouseDown = true;
  });
  item.addEventListener('dragstart', () => false);
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
  isDragging = false;
  stopDraggingHandler();
  draggableItemId = null;
  draggingHasStarted = false;
});

document.addEventListener('mousemove', (event) => {
  isDragging = isMouseDown;
  if (isDragging) {
    if (!draggingHasStarted) {
      startDraggingHandler();
      draggingHasStarted = true;
    }
    
    const item = items.find(item => item.getAttribute('key') === draggableItemId);
    
    item.style.top = event.pageY - item.offsetHeight / 2 + 'px';
    item.style.left = event.pageX - item.offsetWidth / 2 + 'px';
    
    const itemCoordinates = getDOMNodePosition(item);

    const prevItem = item.previousElementSibling.previousElementSibling;
    const nextItem = item.nextElementSibling;

    if (prevItem) {
      const prevItemCoordinates = getDOMNodePosition(prevItem);
      if (itemCoordinates.top < prevItemCoordinates.top + prevItem.offsetHeight / 2) {
        item.previousElementSibling.style.height = '10px';
        swapTwoDOMNodes(item, item.previousElementSibling);
        swapTwoDOMNodes(item, item.previousElementSibling);
        item.previousElementSibling.style.height = item.offsetHeight + 10 + 'px';
        return;
      }
    }

    if (nextItem) {
      const nextItemCoodridates = getDOMNodePosition(nextItem);
      if (itemCoordinates.top + item.offsetHeight > nextItemCoodridates.top + nextItem.offsetHeight / 2) {
        item.previousElementSibling.style.height = '10px';
        swapTwoDOMNodes(item.nextElementSibling, item);
        swapTwoDOMNodes(item.nextElementSibling, item);
        item.previousElementSibling.style.height = item.offsetHeight + 10 + 'px';
        return;
      }
    }
  }
});

function startDraggingHandler(event) {
  const item = items.find(item => item.getAttribute('key') === draggableItemId);
  item.classList.add('draggable');
  const dividerAbove = item.previousElementSibling;
  dividerAbove.style.height = 20 + item.offsetHeight + 'px';
  divider = item.nextElementSibling;
  removeDOMNode(divider);
}

function stopDraggingHandler() {
  const item = items.find(item => item.getAttribute('key') === draggableItemId);
  item.classList.remove('draggable');
  const dividerAbove = item.previousElementSibling;
  dividerAbove.style.height = 10 + 'px';
  insertAfter(divider, item);
}

function removeDOMNode(element) {
  element.parentNode.removeChild(element);
}

function insertAfter(elem, refElem) {
  const parent = refElem.parentNode;
  const next = refElem.nextSibling;
  if (next) {
    return parent.insertBefore(elem, next);
  } else {
    return parent.appendChild(elem);
  }
}

function getDOMNodePosition(elem) {
  const box = elem.getBoundingClientRect();
  return {
    top: box.top,
    left: box.left
  };
}

function swapTwoDOMNodes(node1, node2) {
  node1.parentNode.insertBefore(node1, node2);
}