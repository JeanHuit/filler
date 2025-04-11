document.getElementById('fill-forms').addEventListener('click', () => {
  browser.tabs.query({active: true, currentWindow: true})
    .then(tabs => {
      browser.tabs.sendMessage(tabs[0].id, {
        action: "fillForms",
        options: {
          rememberValues: document.getElementById('remember-values').checked,
          realisticData: document.getElementById('realistic-data').checked
        }
      });
    });
});

document.getElementById('clear-data').addEventListener('click', () => {
  browser.storage.local.clear().then(() => {
    alert("All saved data has been cleared");
  });
});

document.getElementById('settings').addEventListener('click', () => {
  browser.runtime.openOptionsPage();
});
