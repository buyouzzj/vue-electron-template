import { LOAD_URL, LOCAL_LOAD_URL } from './../config'

const miniWinURL =
  process.env.NODE_ENV === 'development'
    ? `${LOCAL_LOAD_URL}/mini`
    : `${LOAD_URL}/mini`
const createMiniWindow = function (BrowserWindow) {
  let obj = {
    x: 1000,
    y: 0,
    height: 48,
    width: 48,
    show: false,
    frame: false,
    fullscreenable: false,
    skipTaskbar: true,
    resizable: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      backgroundThrottling: false,
      webSecurity: false,
      devTools: true
    }
  }

  let miniWindow = new BrowserWindow(obj)

  miniWindow.loadURL(miniWinURL)

  miniWindow.on('closed', () => {
    miniWindow = null
  })

  return miniWindow
}
export default createMiniWindow
