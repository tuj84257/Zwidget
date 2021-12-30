const {app, BrowserWindow, Tray, Menu } = require('electron');
const { SetWindowPos, HWND_BOTTOM, SWP_SHOWWINDOW } = require('win-setwindowpos');
const { preventZOrderChange } = require('./preventZOrderChange');
const path = require('path');

/**
 * Creates a tray icon in the system tray.
 * @param {BrowserWindow} mainWindow 
 * @returns the Tray object
 */
 function createTray(mainWindow) {
	let tray = new Tray(path.join(__dirname, "../../../cute_icon.ico"));
	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Exit', 
			click: function () {
				app.isQuiting = true;
				app.quit();
			},
			id: 'Exit'
		}
	]);
	tray.on('click', function (event) {
		mainWindow.show();
	});
	tray.setToolTip('Zwidget');
	tray.setContextMenu(contextMenu);
	return tray;
}

/**
 * Gets the focused window.
 * @returns the focused window
 */
 function getFocusedWindow() {
	return BrowserWindow.getFocusedWindow();
}

/**
 * Positions the given window to the bottom of the z-index stack.
 * @param {BrowserWindow} window - the `BrowserWindow` object
 * @param {number} screenScaleFactor - the scale factor of the screen
 */
function sendWindowToBottom(window, screenScaleFactor) {
    const windowBounds = window.getBounds();
    const windowWidth = windowBounds.width * screenScaleFactor;
    const windowHeight = windowBounds.height * screenScaleFactor;
    SetWindowPos(window.getNativeWindowHandle(), HWND_BOTTOM, 0, 0, windowWidth, windowHeight, SWP_SHOWWINDOW);
	preventZOrderChange(window);
}

/**
 * Gets the browser window object of an opened widget.
 * @param {String} widgetName the name of the opened widget
 * @returns {BrowserWindow} the browser window object
 */
function getWidgetWindow(widgetName) {
	const openedWidgets = global.share.openedWidgets;
	const widget = openedWidgets.find(widget => widget.name == widgetName);
	return widget.window;
}

module.exports = {
    createTray,
    getFocusedWindow,
    sendWindowToBottom,
	getWidgetWindow
}
