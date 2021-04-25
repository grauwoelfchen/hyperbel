function copyToClipboard(txt) {

  function onCopy(e) {
    document.removeEventListener('copy', onCopy, true);

    e.stopImmediatePropagation();
    e.preventDefault();
    e.clipboardData.setData('text/plain', txt);
  }

  document.addEventListener('copy', onCopy, true);
  document.execCommand('copy');
}
