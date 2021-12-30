const { app, ipcMain } = require('electron');
const { createMainWindow } = require('./windows');
const { allWidgets } = require('./widgets');
const { getFocusedWindow } = require('./utils/utils');

// Create the main window when the application is ready
app.whenReady().then(() => {
	createMainWindow(allWidgets);
});

/** An array that stores all currently opened widgets. */
let openedWidgets = [];

// Handle the opening a widget
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
	openedWidget.window.close();
	// remove the widget from the list of the opened widgets
	openedWidgets.splice(openedWidgets.indexOf(openedWidget), 1);
	mainWindow.webContents.send('closed-widget', widgetName);
});

// Handle the closing of the main window
ipcMain.handle('close-main-window', () => {
	const mainWindow = getFocusedWindow();
	mainWindow.hide();
});
