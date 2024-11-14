const { app, BrowserWindow } = require('electron');
const path = require('path');
const Store = require('electron-store');

// Initialize electron store
const store = new Store();

function createWindow() {
    // Create the browser window
    const win = new BrowserWindow({
        width: 800,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // Register global shortcut
    const { globalShortcut } = require('electron');
    globalShortcut.register('CommandOrControl+Shift+T', () => {
        showWindow();
    });


    function showWindow() {
        if (!win.isDestroyed()) {
            if (win.isMinimized()) win.restore();
            win.show();
            win.focus();
        } else {
            createWindow();
        }
    }

    win.loadFile('index.html');
}

// When Electron has finished initialization and is ready to create browser windows
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
