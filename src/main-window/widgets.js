const { Widget } = require('./windows');
const path = require('path');

// Create all widget objects here
const batteryLevelWidget = new Widget('Battery Level', 160, 150, '../battery-level/backend/backend.js', path.join(__dirname, '../battery-level/preload/preload.js'), './src/battery-level/frontend/template.html');

// Push all created widget objects to the `allWidgets` array here
/** An array that stores all application widgets. */
const allWidgets = [
    batteryLevelWidget,
];

// Export the widget objects
module.exports = {
    allWidgets
}
