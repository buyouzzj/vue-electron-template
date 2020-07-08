import writeLog from '../../utils/writeLog'

export default function log (value) {
  global.mainWindow.webContents.send('console', value)
  writeLog(value)
}

export function showMessage (message, type) {
  global.mainWindow.webContents.send('show-message', {
    message,
    type
  })
  writeLog(message)
}
