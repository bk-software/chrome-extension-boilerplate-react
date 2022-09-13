import defaultSites from './defaultSites';

let sites;
chrome.storage.sync.get({ sites: defaultSites }, function (items) {
  sites = items.sites;
  console.log('sites', sites);
});

let currentMenu, copyText;

function getMenuElement() {
  const ul = document.createElement('ul');
  for (let index in sites) {
    const li = document.createElement('li');
    li.innerText = sites[index].name;
    li.setAttribute('data-site', index);
    ul.appendChild(li);
  }

  return ul;
}

function onMenuClick(event) {
  const siteIndex = event.target.dataset.site;
  const site = sites[siteIndex];
  console.log('aaa', site);
  if (site.searchString) {
    const url = site.searchString.replace('@@@', encodeURIComponent(copyText));
    //const url = searchSites[siteName].url(copyText);
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
