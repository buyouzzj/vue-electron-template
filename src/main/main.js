import { app, BrowserWindow, shell, globalShortcut } from 'electron'
import path from 'path'
import pkg from './../../package.json'
import initIpcEvent from './modules/ipcEvent'
import createMiniWindow from './modules/miniWindow'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { ACHEME, LOAD_URL } from './config'

const isDevelopment = process.env.NODE_ENV !== 'production'

if (!isDevelopment) {
  global.__img = path.join(__dirname, './img')
  global.__images = path.join(__dirname, './images')
}

let mainWindow = null

const previewIcon = isDevelopment ? 'public/app.ico' : `${global.__images}/app.ico`

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    minWidth: 500,
    height: 650,
    minHeight: 400,
    x: 200,
    y: 50,
    title: pkg.description,
    resizable: true,
    backgroundColor: '#f4f4f4',
    icon: previewIcon,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity: false,
      navigateOnDragDrop: true,
      devTools: true
    }
  })

  global.mainWindow = mainWindow
  // 设置appId才能使用Notification
  if (process.platform === 'win32') {
    app.setAppUserModelId(pkg.appId)
  }
  // 去除原生顶部菜单栏
  mainWindow.setMenu(null)
  mainWindow.webContents.on('context-menu', (event, params) => {
    mainWindow.webContents.send('context-menu', params)
  })
  // mainWindow.setAlwaysOnTop(true)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  } else {
    createProtocol(ACHEME)
    mainWindow.loadURL(LOAD_URL)
  }

  mainWindow.on('close', (event) => {
    event.preventDefault()
    // mainWindow.webContents.send('will-close')
    app.exit()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    global.miniWindow = createMiniWindow(BrowserWindow)
  })

  if (isDevelopment) {
    // 安装vue-devtools
    let extensions = BrowserWindow.getDevToolsExtensions()
    if (!extensions[ 'Vue.js devtools' ]) {
      BrowserWindow.addDevToolsExtension(path.resolve(__dirname, './../../src/main/vue-devtools'))
    }
    // 打开调试窗口
    mainWindow.webContents.openDevTools()
    // log(BrowserWindow)
  }
  globalShortcut.register('CmdOrCtrl+Shift+j', () => {
    if (mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.webContents.closeDevTools()
    } else {
      mainWindow.webContents.openDevTools()
    }
  })
  // 初始化进程之间事件监听
  initIpcEvent()
}

app.allowRendererProcessReuse = true

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (global.mainWindow === null || mainWindow === null) {
    createWindow()
  }
})

app.on('ready', () => {
  global.execPath = process.execPath
  global.argv = process.argv
  createWindow()
})

app.on('quit', () => {
  if (global.downloadFile) {
    shell.openItem(global.downloadFile)
  }
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
