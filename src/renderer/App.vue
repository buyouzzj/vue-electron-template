<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <context-menu></context-menu>
  </div>
</template>

<script>
import contextMenu from './components/contextMenu'
import { iconCss, iconJs } from './config'
export default {
  name: 'App',
  components: {
    contextMenu
  },
  data () {
    return {
    }
  },
  created () {
    this.createIconfont()
  },
  methods: {
    createIconfont () {
      // iconfont css版
      const linkEL = document.createElement('link')
      linkEL.rel = 'stylesheet'
      linkEL.href = iconCss
      document.head.appendChild(linkEL)
      // iconfont js版
      const scriptEl = document.createElement('script')
      scriptEl.async = true
      scriptEl.src = iconJs
      var scriptElement = document.getElementsByTagName('script')[0]
      scriptElement.parentNode.insertBefore(scriptEl, scriptElement)
    }
  }
}
</script>

<style>
#app {
  background-color: transparent;
}
</style>
