import { showMenu, clearMenu } from './modules/menu.js';
import { Modifiers } from './modules/modifier';
import { defaultModifier } from './modules/modifier';

let modifierKey = defaultModifier;
chrome.storage.sync.get({ modifier: defaultModifier }, function (items) {
  modifierKey = items.modifier;
});

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

function isRightModifierKey(event) {
  switch (modifierKey) {
    case Modifiers.Shift:
      return event.shiftKey;
    case Modifiers.Alt:
      return event.altKey;
    case Modifiers.Ctrl:
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
