// The preload for the Battery Level window

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('batteryLevelWindowAPI', {
    sendToBackend: (channel, data) => ipcRenderer.invoke(channel, data),
    receiveFromBackend: (channel, callable) => { ipcRenderer.on(channel, (event, ...args) => callable(...args)); }
});
