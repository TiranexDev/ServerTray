const { app, Tray, Menu, shell } = require('electron');
const path = require('node:path');
const ping = require('ping');

const config = require('./config.js');
let tray = null;

app.whenReady().then(function () {
  tray = new Tray(path.join(__dirname, config.icons.else));

  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'About', click: function () {
        shell.openExternal('https://github.com/TiranexDev/ServerTray');
    } },
    { label: 'Reload', click: function () {
        Validate(tray, false)
    } },
    { label: 'Quit', click: function () { 
        app.quit()
    } }
  ]))

  Validate(tray, true);
});

function Validate(tray, loop) {
  console.log('Validating... ' + new Date().toLocaleString());

  ping.sys.probe(config.host, (isAlive, err) => {
    if (err != null) {
      console.log(err);
      return;
    }
    
    if (isAlive == true) {
        tray.setToolTip(config.contextMenu.working);
        tray.setImage(path.join(__dirname, config.icons.working));
        return;
    }

    tray.setToolTip(config.contextMenu.else);
    tray.setImage(path.join(__dirname, config.icons.else));

    return;
  })

  if (loop == true) {
    setTimeout(function () {
      Validate(tray, loop);
    }, config.delay * 1000);
  }
}