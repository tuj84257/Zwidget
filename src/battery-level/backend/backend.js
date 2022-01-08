// The back-end for the Battery Level widget

const ipcMain = global.share.ipcMain;
const { getWidgetWindow } = require('../../main-window/utils/utils');
const batteryLevel = require('battery-level');

// The battery level is more accurate for computers with one battery.
// It gets more complicated for laptops like Microsoft Surface Book 2:
// https://superuser.com/q/1696812/1655201

ipcMain.handle('get-battery-level', () => {
    const batteryLevelWindow = getWidgetWindow('Battery Level');
    (async () => {
        let levelOfBattery = (await batteryLevel());
        batteryLevelWindow.webContents.send('got-battery-level', parseInt(levelOfBattery * 100));
    })();
});
