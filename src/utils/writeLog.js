import { dateNow, timeNow } from '../utils/dateNow'
import fs from 'fs'
import path from 'path'

export default function writeLog (content) {
  const c = `${timeNow()} ${JSON.stringify(content)} \n`
  fs.appendFile(path.resolve(__dirname, '../src/logs', `${dateNow()}.txt`), c, (err) => {
    if (err) throw err
  })
}
