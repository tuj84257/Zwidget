# Zwidget

[![Windows](https://badgen.net/badge/icon/windows?icon=windows&label)](https://microsoft.com/windows/)

> This repository is a work in progress.

## Quick start

1. Run `npm install` in the root directory to install the dependencies.
2. Run `npm start` to build the CSS files, and start the app.

**NOTE**: The npm scripts in this repo's `package.json` will work only if you're running them with the `Git Bash` shell. To use the `Git Bash` shell, run this command on the terminal:

```bash
npm config set script-shell "C:\Program Files\Git\bin\bash.exe"
```

This is assuming you have installed `Git Bash` on your machine, and your `Git Bash` executable is located in the path above. However, you can also use the `PowerShell` shell like this, but keep in mind you'd have to make changes to `package.json` and the scripts in the `scripts` directory:

```bash
npm config set script-shell "powershell"
```

## How to add your own widget (to the existing file structure)

1. Run the `create-files` npm script in the root directory:

```bash
npm run create-files '[Widget Name]'   # e.g. npm run create-files 'Stock Watch'
```

This script will generate these files in their respective directories (their names will be `camelCased` according to the name of the widget):

- A template HTML file in `src/renderer/templates`.
- An input CSS file in `src/renderer/css/input`. You will most likely never have to change this file.
- A JavaScript file in `src/renderer/javascript`. This file will contain the renderer logic of the widget.

> These files will be the frontend of your widget. Since Tailwind CSS is used, you will need to add a `tailwind-compile-[widgetname]` npm script in `package.json`. Make sure to add this script to the `npm start` command, as well.

- A JavaScript preload file in the `src/preload` directory. You will most likely never have to change this file.
- A JavaScript file in `src/main/widgets-backend`. This file will contain the backend logic of your widget.

2. Open the `widgets.js` file, located in `src/main`, define your widget object, and add it to the `allWidgets` array, so that the window for your widget can be created when needed.
