import { showMenu, clearMenu } from './modules/menu.js';
let isMouseMove = false;
let modifierKey = 'shift';

function onMouseDown(e) {
  isMouseMove = false;
  setTimeout(function () {
    clearMenu();
  }, 300);
}

function onMouseMove() {
  isMouseMove = true;
}

function isRightModifierKey(event) {
  if (!modifierKey) {
    return true;
  }
  switch (modifierKey) {
    case 'shift':
      return event.shiftKey;
    case 'alt':
      return event.altKey;
    case 'ctrl':
      return event.ctrlKey;
    default:
      return true;
  }
}

function onMouseUp(e) {
  if (isMouseMove) {
    const selectionObj = window.getSelection();
    const copyText = selectionObj.toString();
    const clientRect =
      selectionObj.anchorNode.parentElement.getBoundingClientRect();

    if (isRightModifierKey(e) && copyText) {
      const x = clientRect.left + 10;
      const y = clientRect.bottom + 10;
      showMenu(x, y, copyText);
    }
  }
}

document.body.onload = function () {
  document.body.addEventListener('mousedown', onMouseDown);
  document.body.addEventListener('mouseup', onMouseUp);
  document.body.addEventListener('mousemove', onMouseMove);
};
