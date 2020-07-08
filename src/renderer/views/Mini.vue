<template>
  <div class="mini" @click="toggleMini">
    <img src="../assets/horse_min.png" style="width: 48px; height: 48px;" />
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'Mini',
  methods: {
    toggleMini () {
      ipcRenderer.send('toggle-mini', false)
    }
  }
}
</script>

<style lang="less" scope>
.mini {
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-content: center;
  border: none;
  border-radius: 50%;
  -webkit-app-region: drag;
}
</style>
