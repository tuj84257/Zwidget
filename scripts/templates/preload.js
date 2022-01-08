// The preload for the ##widgetName## widget

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('##widgetNameCamelCase##WindowAPI', {
    sendToBackend: (channel, data) => ipcRenderer.invoke(channel, data),
    receiveFromBackend: (channel, callable) => { ipcRenderer.on(channel, (event, ...args) => callable(...args)); }
});
