// The preload for the Stock Watch widget

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('stockWatchWindowAPI', {
    sendToBackend: (channel, data) => ipcRenderer.invoke(channel, data),
    receiveFromBackend: (channel, callable) => { ipcRenderer.on(channel, (event, ...args) => callable(...args)); }
});

