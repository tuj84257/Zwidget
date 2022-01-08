// The preload for the main window    https://stackoverflow.com/a/69917666/13659134

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mainWindowAPI', {
    sendToMain: (channel, data) => ipcRenderer.invoke(channel, data),
    receiveFromMain: (channel, callable) => { ipcRenderer.on(channel, (event, ...args) => callable(...args)); }
});
