// The back-end for the Stock Watch widget

const ipcMain = global.share.ipcMain;
const { getWidgetWindow } = require('../../main-window/utils/utils');

ipcMain.handle('your-channel-here', () => {
    // your logic here
    const stockWatchWindow = getWidgetWindow('Stock Watch');
    stockWatchWindow.webContents.send('your-channel-here', 'your args here');
});

