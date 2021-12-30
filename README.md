# Zwidget

[![Windows](https://badgen.net/badge/icon/windows?icon=windows&label)](https://microsoft.com/windows/)

> This repository is a work in progress.

## Quick start

Run `npm install` in the root directory to install the dependencies.
Run `npm start` to build the css files, and start the app.

## How to add your own widget

1. Add a template HTML file in `src/renderer/templates` for your widget (this will be the frontend of the widget).
2. Add an input CSS file in `src/renderer/css/input` for your widget, and add a `tailwind-compile-[widgetname]` npm script in `package.json`. Make sure to add this script to the `npm start` command.
3. Add a preload file in the `src/preload` directory.
4. Add a JavaScript file in `src/main/widgets-backend` for your widget (this will be the backend logic of the widget).
5. Open `widgets.js` located in `src/main`, define your widget object, add it to the `allWidgets` array.
