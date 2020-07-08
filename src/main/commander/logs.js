import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)

export default class Logs {
  async getFiles () {
    const files = await readdir(path.resolve(__dirname, '../src/logs'))
    global.mainWindow.webContents.send('log-files', files)
  }
  async showFileContent (file) {
    const content = await readFile(path.resolve(__dirname, '../src/logs', file))
    global.mainWindow.webContents.send('show-file-content', content.toString())
  }
}
