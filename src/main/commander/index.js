/**
 * 源代码文件夹：E:\weier\ai-client-xiaowei
 * 打包后的文件夹：C:\Users\ywwl\AppData\Local\Programs
 */
// 执行shell脚本
import { ipcMain } from 'electron'
import log, { showMessage } from '../utils/log'
import { getItem } from '../../utils/storage'
const { promisify } = require('util')
const exec = promisify(require('child_process').exec) // 返回promise
const execFile = promisify(require('child_process').execFile)
const fs = require('fs')
const path = require('path')

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)
const rename = promisify(fs.rename)
const access = promisify(fs.access)
const rmdir = promisify(fs.rmdir)

let localUrlStr = getItem('buildUrl') || '{}'
let localUrl = JSON.parse(localUrlStr)
let cwd = `${localUrl.sourceCodeUrl}`
let buildPath = `${localUrl.buildUrl}`
let packageJson = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json')))
let version = packageJson.version
let setupExeCwd = path.join(cwd, 'build', `小微 Setup ${version}.exe`)
ipcMain.on('confirm-url', (e, data) => {
  if (data) {
    localUrl = data
  }
  log(localUrl)
  cwd = path.resolve(`${localUrl.sourceCodeUrl}`)
  packageJson = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json')))
  buildPath = path.resolve(`${localUrl.buildUrl}`)
  version = packageJson.version
  setupExeCwd = path.join(cwd, 'build', `小微 Setup ${version}.exe`)
})

// 必须使用管理员命令
// 判断当前的node版本，如果不是8.x版本的，通过nvm切换
export async function toggleNodeVersion () {
  const { stdout } = await exec('node -v').catch(e => {
    showMessage(e, 'error')
  })
  log(`当前node版本：${stdout}`)
  if (!stdout.startsWith('v8')) {
    exec('nvm use 8.12.0 32')
    showMessage('版本切换成功', 'success')
    return Promise.resolve(true)
  }
  return Promise.resolve(true)
}
// 第一步 进入对应目录 删除rar文件

export async function deleteRar () {
  // 先删除after-build文件夹下面的rar文件
  const win32Dir = path.resolve(cwd, 'after-build', 'xiaowei-win32-ia32')
  await exec(`rm -rf xiaowei${version}.rar`, {
    cwd: win32Dir
  })
    .then(() => {
      showMessage(`删除 ${win32Dir}\\xiaowei${version}.rar 成功`, 'success')
    })
    .catch(e => {
      showMessage(`删除 ${win32Dir}\\xiaowei${version}.rar 失败，如果没有此文件，请忽视`, 'error')
    })
  // 再删除buildPath文件夹下面的rar文件和对应的目录
  await exec(`rm -rf xiaowei${version} xiaowei${version}.rar`, {
    cwd: buildPath
  })
    .then(() => {
      showMessage(`删除 ${buildPath}\\xiaowei${version}.rar 成功`, 'success')
    })
    .catch(e => {
      showMessage(`删除 ${buildPath}\\xiaowei${version} ${buildPath}\\xiaowei${version}.rar 失败，如果没有此文件，请忽视`, 'error')
    })
  return Promise.resolve(true)
}
// 执行打包命令 npm run releaseFirst 或者 npm run release
export async function runRelease (isFirst) {
  log(`打包版本：${version}`)
  await exec(
    `npm run release${isFirst ? 'First' : ''}`,
    { cwd }
  ).then(() => {
    showMessage(`打包成功`, 'success')
    return Promise.resolve(true)
  }).catch(e => {
    return Promise.reject(new Error(e))
  })
}
// 第二步 双击打开exe文件
export async function openExe () {
  await execFile(setupExeCwd).catch(e => {
    showMessage(e, 'error')
  })
  log(`打开安装包位置：${setupExeCwd}`)
  return Promise.resolve(true)
}

// 删除文件夹或者rar文件
export async function rmdirFun (filePath) {
  const exists = await access(filePath, fs.constants.F_OK)
  if (!exists) {
    log(`${filePath}${exists ? '不' : ''}存在`)
    await rmdir(filePath, { recursive: true }).then(() => {
      log(`目录${filePath}已删除`)
      showMessage(`目录${filePath}已删除`, 'success')
    }).catch(e => {
      showMessage(`删除${filePath}失败，请手动删除`, 'error')
    })
    return Promise.resolve(true)
  } else {
    return Promise.resolve(true)
  }
}
// 第三步 修改文件夹名字，然后压缩
export async function compress () {
  // 删除文件夹内的以xiaowei开头的目录
  await readdir(`${buildPath}\\xiaowei`).then(files => {
    files = files.filter(f => f.startsWith('xiaowei'))
    files.forEach(async f => {
      const file = path.resolve(buildPath, 'xiaowei', f)
      if ((await stat(file)).isDirectory()) {
        await exec(`rm -rf ${file}`)
      }
    })
  })
  await rename(
    `${buildPath}\\xiaowei`,
    `${buildPath}\\xiaowei${version}`
  ).then(() => {
    showMessage('重命名成功！', 'success')
  }).catch(e => {
    log(`
      重命名文件夹失败，请手动尝试！
      可能有以下几个原因：
      1. 没有此文件夹
      2. 文件夹内容正在被使用
      3. 千牛如果是打开的，请关闭
      4. 如果以上办法还不行，删除控制管理器当中所有与小微有关的程序，如千牛程序
    `)
    return Promise.reject(
      new Error(`
      重命名文件夹失败，请手动尝试！
      可能有以下几个原因：
      1. 没有此文件夹
      2. 文件夹内容正在被使用
      3. 千牛如果是打开的，请关闭
      4. 如果以上办法还不行，删除控制管理器当中所有与小微有关的程序，如千牛程序
    `)
    )
  })
  // 压缩成rar文件
  await exec(
    `winrar a ${buildPath}\\xiaowei${version}.rar ${buildPath}\\xiaowei${version}\\*`,
    { cwd: 'C:\\Program Files\\WinRAR' }
  ).then(() => {
    showMessage('压缩成功！', 'success')
  }).catch(e => {
    return Promise.reject(new Error('压缩失败，请手动压缩'))
  })
  await exec(
    `cp ${buildPath}\\xiaowei${version}.rar ${cwd}\\after-build\\xiaowei-win32-ia32`
  ).then(() => {
    showMessage('复制成功！', 'success')
  }).catch(e => {
    return Promise.reject(new Error('复制失败，请手动复制'))
  })
  return Promise.resolve(true)
}
// 第四步 将压缩后的文件夹复制到after-build中去
export function copyRar () {
  exec(
    `cp ${buildPath}\\xiaowei${version}.rar ${cwd}\\after-build\\xiaowei-win32-ia32`
  ).then(async () => {
    log('copy success')
    // 第五步 执行 npm run release
    await runRelease()
    return Promise.resolve(true)
  })
}
