const { BrowserWindow, screen } = require('electron');
const { createTray, sendWindowToBottom } = require('./utils/utils');
const path = require('path');

/**
 * Creates the main browser window
 * @param {Widget[]} allWidgets - A list of all created widget objects
 */
function createMainWindow (allWidgets) {
    const primaryDisplayBounds = screen.getPrimaryDisplay().bounds;
    const screenWidth = primaryDisplayBounds.width;
    const screenHeight = primaryDisplayBounds.height;
	
    const mainWindow = new BrowserWindow({
		width: 400,
		height: 200,
		x: screenWidth - 400,
		y: screenHeight - 200,
		transparent: true,
		frame: false,
		movable: false,
		resizable: false,
		webPreferences: {
			preload: path.join(__dirname, '../preload/mainWindow.js'),
			nodeIntegration: false,		// true		you can use the commented settings to use the Node.js
			contextIsolation: true		// false	APIs in the renderer, instead of the preload process
		},
	});

	mainWindow.loadFile('./src/renderer/templates/mainWindow.html');
	mainWindow.setSkipTaskbar(true);
	let tray = null;

	mainWindow.on('ready-to-show', event => {
		tray = createTray(mainWindow);
        let trayHeight = tray.getBounds().height;
        let windowX, windowY;
        [windowX, windowY] = mainWindow.getPosition();
		mainWindow.setPosition(windowX, windowY - trayHeight);
		mainWindow.webContents.send('load-widgets', allWidgets);
	});

	// Open the DevTools.
	// mainWindow.webContents.openDevTools();
}

/** Class representing a widget object. */
class Widget {
	/**
	 * Initialize a widget.
	 * @param {String} name - The name of the widget window.
	 * @param {Number} width - The width of the widget window.
	 * @param {Number} height - The height of the widget window without the title section.
	 * @param {String} backend - The path to the backend file, relative to the main directory.
	 * @param {String} preload - The absolute path to the preload file.
	 * @param {String} htmlFile - The path from the root directory to the HTML file.
	 */
	constructor(name, width, height, backend, preload, htmlFile){
		/** 
		 * The name of the widget window. 
		 * @type {String}
		 */
		this.name = name;
		/**
		 * The width of the widget window.
		 * @type {Number}
		 */
		this.width = width;
		/**
		 * The height of the widget window.
		 * @type {Number}
		 */
		this.height = height + (1/6 * height);   // 1/6th of the inputted height is taken by the title div, so you need to compensate for it.
		/**
		 * The path to the backend file, relative to the main directory.
		 * @type {String}
		 */
		this.backend = backend;
		/**
		 * The absolute path to the preload file.
		 * @type {String}
		 */
		this.preload = preload;
		/**
		 * The path from the root directory to the HTML file.
		 * @type {String}
		 */
		this.htmlFile = htmlFile;
	}

	/**
	 * Creates a transparent, frameless browser window, positioned at the bottom of the z-index stack.
	 * @returns the created browser window
	 */
	createWindow(){
		const window = new BrowserWindow({
			width: this.width,
			height: this.height,
			transparent: true,
			frame: false,
			movable: true,
			resizable: false,
			minimizable: false,
			webPreferences: {
				preload: this.preload,
				nodeIntegration: false,
				contextIsolation: true
			},
		});
		window.loadFile(this.htmlFile);
		window.setSkipTaskbar(true);
		let screenScaleFactor = screen.getPrimaryDisplay().scaleFactor;
		sendWindowToBottom(window, screenScaleFactor);
		// window.webContents.openDevTools();
		return window;
	}
}

module.exports = {
    createMainWindow,
	Widget
};
