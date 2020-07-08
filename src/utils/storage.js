const Store = require('electron-store')

const storage = new Store()

export const getItem = item => storage.get(item)
export const setItem = (item, value) => storage.set(item, value)
