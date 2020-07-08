import { ipcRenderer } from 'electron'
import { Notice } from 'view-design'

Notice.config({
  top: 60,
  duration: 0
})
ipcRenderer.on('console', (e, d) => {
  console.log(d)
})

ipcRenderer.on('show-message', (e, d = {}) => {
  if (d.message) {
    if (d.type === 'success') Notice.success({ desc: d.message })
    else if (d.type === 'error') Notice.error({ desc: d.message })
  }
})
