const { app, ipcMain } = require('electron');
const { createMainWindow } = require('./windows');
const { allWidgets } = require('./widgets');
const { getFocusedWindow } = require('./utils/utils');

app.commandLine.appendSwitch('wm-window-animations-disabled');

// Create the main window when the application is ready
app.whenReady().then(() => {
	createMainWindow(allWidgets);
});

/** An array that stores all currently opened widgets. */
let openedWidgets = [];

// Handle the opening of a widget
ipcMain.handle('open-widget', (event, widgetName) => {
	const mainWindow = getFocusedWindow();
	const widgetObject = allWidgets.find(widget => widget.name == widgetName);
	const widgetWindow = widgetObject.createWindow();
	openedWidgets.push(
		{
			name: widgetName,
			window: widgetWindow
		}
	);
	mainWindow.webContents.send('opened-widget', widgetName);
});

// Handle the closing of a widget
ipcMain.handle('close-widget', (event, widgetName) => {
	const mainWindow = getFocusedWindow();
	const openedWidget = openedWidgets.find(widget => widget.name == widgetName);
	// close the window of the widget
	try {
		openedWidget.window.close();
	} catch (error) {
		if(error instanceof(TypeError)){
			console.log('The widget has already been destroyed.')
		}
	}
	// remove the widget from the list of the opened widgets
	openedWidgets.splice(openedWidgets.indexOf(openedWidget), 1);
	mainWindow.webContents.send('closed-widget', widgetName);
});

// Handle the closing of the main window
ipcMain.handle('close-main-window', () => {
	const mainWindow = getFocusedWindow();
	mainWindow.hide();
});

// Share `ipcMain` globally, so that you can use it in the widgets' backend files.
global.share = { ipcMain, openedWidgets }

// Require each widget's path to the backend file, so that you can use `global.share.ipcMain` in each file.
allWidgets.forEach(widget => {
	require(widget.backend);
});
