import { ipcMain, app } from 'electron'
import log from '../utils/log'
import Logs from '../commander/logs'
import {
  toggleNodeVersion,
  deleteRar,
  runRelease,
  openExe,
  compress
} from '../commander'

const logs = new Logs()

function awaitWrapper (promise) {
  return promise.catch(err => {
    global.mainWindow.send('release-fail', err)
  })
}

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

  ipcMain.on('release-first', async (e, data) => {
    if (data === 0) {
      // 第一步
      log('第一次打包')
      await awaitWrapper(toggleNodeVersion())
      await awaitWrapper(deleteRar())
      await awaitWrapper(runRelease(true))
      global.mainWindow.send('release-success', data)
    }
    if (data === 1) {
      log('安装中...')
      openExe()
        .then(
          bool => bool && global.mainWindow.send('release-success', data)
        ).catch(e => {
          global.mainWindow.send('release-fail', e)
        })
    }
    if (data === 2) {
      compress()
        .then(bool => bool && global.mainWindow.send('release-success', data))
        .catch(e => {
          global.mainWindow.send('release-fail', e)
        })
    }
    if (data === 3) {
      log('第二次打包')
      runRelease()
        .then(() => {
          global.mainWindow.send('release-success', data)
        }).catch(e => {
          global.mainWindow.send('release-fail', e)
        })
    }
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
