<template>
  <div
    v-show="visible"
    v-clickoutside="handleClose"
    class="modal-wrapper">
    <div v-for="item in contextMenuList" :key="item.id" class="modal-item" @click="clickAction(item)">
      <span class="left">{{ item.left }}</span>
      <span class="right">{{ item.right }}</span>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import clickoutside from 'view-design/src/directives/clickoutside'
export default {
  name: 'ContextMenu',
  data () {
    return {
      visible: false,
      contextMenuList: [
        {
          left: '开发者工具',
          right: 'Ctrl+Shift+j',
          click: 'showDevtool'
        }
      ]
    }
  },
  directives: {
    clickoutside
  },
  mounted () {
    const modalWrapper = document.querySelector('.modal-wrapper')
    ipcRenderer.on('context-menu', (e, data) => {
      console.log(data)
      modalWrapper.style.left = data.x + 'px'
      modalWrapper.style.top = data.y + 'px'
      this.visible = true
    })
  },
  methods: {
    handleClose () {
      this.visible = false
    },
    clickAction (item) {
      switch (item.click) {
        case 'showDevtool':
          ipcRenderer.send('show-devtool')
          this.visible = false
          break
      }
    }
  }
}
</script>

<style lang="less" scope>
.modal-wrapper {
  padding: 6px 0px;
  position: absolute;
  width: 240px;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 #ccc;
  .modal-item {
    display: flex;
    padding: 4px 8px;
    cursor: pointer;
    justify-content: space-between;
    transition: all .3s;
    &:hover {
      background-color: #eee;
    }
  }
}
</style>
