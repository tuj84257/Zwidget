// The back-end for the ##widgetName## widget

const ipcMain = global.share.ipcMain;
const { getWidgetWindow } = require('../../main-window/utils/utils');

ipcMain.handle('your-channel-here', () => {
    // your logic here
    const ##widgetNameCamelCase##Window = getWidgetWindow('##widgetName##');
    ##widgetNameCamelCase##Window.webContents.send('your-channel-here', 'your args here');
});
