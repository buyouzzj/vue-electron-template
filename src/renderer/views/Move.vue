<template>
  <div>移动</div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'Move',
  mounted () {
    ipcRenderer.send('move-dll')
  }
}
</script>

<style lang="less" scoped>

</style>
