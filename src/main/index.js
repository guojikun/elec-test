'use strict'

import { app, BrowserWindow, Menu, Tray, ipcMain } from 'electron'
const path = require('path')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path')
        .join(__dirname, '/static')
        .replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */

    // hide menu
    Menu.setApplicationMenu(null)

    mainWindow = new BrowserWindow({
        height: 670,
        useContentSize: true,
        width: 1022,
        minWidth: 1022,
        frame: false,
        resizable: false
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    // 新增的：安装vue-devtools
    BrowserWindow.addDevToolsExtension(path.resolve(__dirname, '../../devTools/vue'))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

ipcMain.on('min', e => {
    mainWindow.minimize()
})
ipcMain.on('max', e => {
    console.log(e)
    const isMax = mainWindow.isMaximized()
    if (isMax) {
        console.log(true)
        mainWindow.unmaximize()
    } else {
        console.log(false)
        mainWindow.maximize()
    }
})
ipcMain.on('close', e => mainWindow.close())
