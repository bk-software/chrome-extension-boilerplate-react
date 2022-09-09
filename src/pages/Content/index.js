import { showMenu, clearMenu } from './modules/menu.js';
let isMouseMove = false;

function onMouseDown(e) {
  isMouseMove = false;
  setTimeout(function () {
    clearMenu();
  }, 300);
}

function onMouseMove() {
  isMouseMove = true;
}

function onMouseUp(e) {
  if (isMouseMove) {
    const selectionObj = window.getSelection();
    const copyText = selectionObj.toString();
    const clientRect =
      selectionObj.anchorNode.parentElement.getBoundingClientRect();

    if (copyText) {
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
