const ICON_URL = browser.extension.getURL('img/icon-32.png');

browser.contextMenus.create({
  id: 'hyperbel-copy-link-as-markdown',
  title: 'Copy Link as Markdown',
  contexts: ['link'],
});

browser.contextMenus.onClicked.addListener((inf, tab) => {
  if (inf.menuItemId === 'hyperbel-copy-link-as-markdown') {
    const url = encodeURI(inf.linkUrl);
    const txt = inf.linkText;
    const src = JSON.stringify(`[${txt}](${url})`);


    browser.tabs.executeScript({
      code: 'typeof copyToClipboard === \'function\';',
    }).then((dat) => {
      if (!dat || dat[0] !== true) {
        return browser.tabs.executeScript(tab.id, {
          file: '/src/clipboard.js',
        });
      }
    }).then(() => {
      return browser.tabs.executeScript(tab.id, {
        code: `copyToClipboard(${src});`,
      });
    }).catch((err) => {
      console.error(`err: ${err}`);
    });

    browser.notifications.create({
      type: 'basic',
      iconUrl: ICON_URL,
      title: 'Copied!',
      message: txt
    });
  }
});
