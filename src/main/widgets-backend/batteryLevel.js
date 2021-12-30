const ipcMain = global.share.ipcMain;
const { getWidgetWindow } = require('../utils/utils');

ipcMain.handle('test', () => {
    console.log('tested!');
    const batteryLevelWindow = getWidgetWindow('Battery Level');
    batteryLevelWindow.webContents.send('tested');
});
