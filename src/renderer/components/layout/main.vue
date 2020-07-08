<template>
  <div class="main">
    <sidebar></sidebar>
    <div class="page" :style="{left: sidebarWidth, width: `calc(100% - ${sidebarWidth})`}">
      <i-header></i-header>
      <div class="container" :style="{height: `calc(100vh - ${headerHeight})`}">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import iHeader from './header'
import sidebar from './sidebar'
export default {
  name: 'Main',
  computed: {
    headerHeight () {
      return this.$store.state.headerHeight + 'px'
    },
    sidebarWidth () {
      return this.$store.state.sidebarWidth + 'px'
    }
  },
  components: {
    iHeader,
    sidebar
  }
}
</script>

<style lang="less" scope>
.main {
  position: relative;
  .page {
    position: absolute;
    background: #f4f4f4;
    overflow: auto;
    transition: all .3s;
    .container {
      padding: 24px;
      overflow: auto;
    }
  }
}
</style>
