// The preload for the Battery Level window

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('batteryLevelWindowAPI', {
    sendToMain: (channel, data) => ipcRenderer.invoke(channel, data),
    receiveFromMain: (channel, callable) => { ipcRenderer.on(channel, (event, ...args) => callable(...args)); }
});
