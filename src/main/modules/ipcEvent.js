import { ipcMain, app } from 'electron'
import log from '../utils/log'
import Logs from '../commander/logs'

const logs = new Logs()

export default function () {
  ipcMain.on('toggle-mini', (event, value) => {
    log(value)
    if (value) {
      global.miniWindow.show()
      global.mainWindow.hide()
    } else {
      global.miniWindow.hide()
      global.mainWindow.show()
    }
  })

  ipcMain.on('show-window', () => {
    global.mainWindow.show()
  })

  ipcMain.on('window-hide', () => {
    log('隐藏窗口')
    global.mainWindow.minimize()
  })

  ipcMain.on('window-max', () => {
    if (global.mainWindow.isMaximized()) {
      log('恢复窗口大小')
      global.mainWindow.restore()
    } else {
      log('放大窗口')
      global.mainWindow.maximize()
    }
  })

  ipcMain.on('show-devtool', () => {
    global.mainWindow.webContents.openDevTools()
  })

  ipcMain.on('window-close', () => {
    log('关闭窗口')
    global.mainWindow.close()
  })

  ipcMain.on('move-dll', async (e, data) => {
    console.log(__dirname)
  })

  ipcMain.on('get-log-files', async () => {
    logs.getFiles()
  })

  ipcMain.on('show-file-content', (e, file) => {
    logs.showFileContent(file)
  })

  ipcMain.on('window-mini', () => {

  })

  ipcMain.on('app-exit', () => {
    // 所有窗口都将立即被关闭，而不询问用户，而且 before-quit 和 will-quit 事件也不会被触发。
    app.exit()
  })
}
