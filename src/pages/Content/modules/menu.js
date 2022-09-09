import { searchSites } from './search-sites.js';

let currentMenu, copyText;

function getMenuElement() {
  const ul = document.createElement('ul');
  for (let site in searchSites) {
    const li = document.createElement('li');
    li.innerText = searchSites[site].name;
    li.setAttribute('data-site', site);
    ul.appendChild(li);
  }

  return ul;
}

function onMenuClick(event) {
  const siteName = event.target.dataset.site;
  console.log(siteName);
  if (siteName) {
    const url = searchSites[siteName].url(copyText);
    window.open(url, 'blank');
  }
}

export function clearMenu() {
  if (currentMenu) {
    currentMenu.remove();
  }
}

export function showMenu(x, y, text) {
  copyText = text;
  clearMenu();
  currentMenu = document.createElement('div');
  currentMenu.appendChild(getMenuElement());
  currentMenu.setAttribute('class', 'bk-menu-item');

  currentMenu.addEventListener('click', onMenuClick);
  // we don't want to box to disappear when we press on it cause we might want to check other options
  currentMenu.addEventListener('mousedown', (e) => {
    e.stopPropagation();
  });
  currentMenu.style.left = `${x}px`;
  currentMenu.style.top = `${y}px`;

  document.body.appendChild(currentMenu);
}
