'use strict';

const electron = require('electron');
const {app, BrowserWindow} = electron;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {

  // ブラウザ(Chromium)の起動, 初期画面のロード
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    "node-integration": "iframe", // and this line
    "web-preferences": {
      "web-security": false
    }
  });
  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
    // Set the save path, making Electron not to prompt a save dialog.
    item.setSavePath('./save.dat')

    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('Download is interrupted but can be resumed')
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download is paused')
        } else {
          console.log(`Received bytes: ${item.getReceivedBytes()}`)
        }
      }
    })
    item.once('done', (event, state) => {
      if (state === 'completed') {
        console.log('Download successfully')
      } else {
        console.log(`Download failed: ${state}`)
      }
    })
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});