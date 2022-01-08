const { BrowserWindow } = require('electron');
const ref = require('ref-napi');
const StructType = require('ref-struct-di')(ref);
const { HWND_BOTTOM, SWP_NOSIZE, SWP_NOMOVE, SWP_NOZORDER } = require('win-setwindowpos');

const WINDOWPOS = StructType({
	hwnd: ref.types.int32,
	hwndInsertAfter: ref.types.int32,
	x: ref.types.int32,
	y: ref.types.int32,
	cx: ref.types.int32,
	cy: ref.types.int32,
	flags: ref.types.uint32,
});

const WM_WINDOWPOSCHANGING = 0x0046;

/**
 * Prevents the change of the z-index of the window.
 * @param {BrowserWindow} win The browser window
 */
const preventZOrderChange = win => {
  win.hookWindowMessage(WM_WINDOWPOSCHANGING, (wParam, lParam)=> {
	const buf = Buffer.alloc(8);
	buf.type = ref.refType(WINDOWPOS);
	lParam.copy(buf);
	const actualStructDataBuffer = buf.deref();
	const windowPos = actualStructDataBuffer.deref();
	const newFlags = windowPos.flags | SWP_NOZORDER | SWP_NOMOVE | SWP_NOSIZE;
	actualStructDataBuffer.writeUInt32LE(newFlags, 6);
	actualStructDataBuffer.writeUInt32LE(HWND_BOTTOM, 1);
  });
};

module.exports = {
	preventZOrderChange
};
