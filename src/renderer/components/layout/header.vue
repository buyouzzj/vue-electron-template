<template>
  <header class="header" :style="{left: $store.state.sidebarWidth + 'px'}">
    <div class="title-wrapper" @click="toggleCollapse">
      <Icon type="md-menu" style="font-size: 20px;" :class="collapse ? 'rotate90' : ''" />
    </div>
    <!-- <div>
      <Button type="success" size="small" class="no-drag" @click="reload">刷新</Button>
    </div> -->
    <div class="icon-wrapper">
      <Tooltip v-for="item in iconList" :key="item.action" placement="bottom" transfer :content="item.tooltip">
        <Icon :type="item.type" @click="setFrame(item.action)" />
      </Tooltip>
    </div>
  </header>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'Header',
  data () {
    return {
      iconList: [
        { type: 'md-remove', action: 'hide', tooltip: '隐藏' },
        { type: 'md-qr-scanner', action: 'max', tooltip: '最大最小化' },
        // { type: 'md-resize', action: 'mini', tooltip: '迷你' },
        { type: 'md-close', action: 'close', tooltip: '关闭' }
      ]
    }
  },
  computed: {
    collapse () {
      return this.$store.state.collapse
    }
  },
  methods: {
    toggleCollapse () {
      this.$store.commit('updateState', {
        collapse: !this.collapse,
        sidebarWidth: this.collapse ? 150 : 60
      })
      if (this.collapse) {
      }
    },
    setFrame (type) {
      switch (type) {
        case 'hide':
          ipcRenderer.send('window-hide')
          break
        case 'max':
          ipcRenderer.send('window-max')
          break
        case 'mini':
          ipcRenderer.send('toggle-mini', true)
          this.$router.push('/mini')
          break
        case 'close':
          ipcRenderer.send('window-close')
          break
        default:
          break
      }
    },
    reload () {
      location.reload()
    }
  }
}
</script>

<style lang="less" scope>
.header {
  position: sticky;
  overflow: hidden;
  z-index: 100;
  left: 0 !important;
  top: 0;
  right: 0;
  padding: 12px 24px;
  line-height: 1.5;
  border-bottom: 1px solid #e9e9e9;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .title-wrapper {
    .rotate90 {
      transform: rotate(90deg);
    }
  }
  .icon-wrapper {
    min-width: 200px;
    text-align: right;
    i {
      margin-left: 12px;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
