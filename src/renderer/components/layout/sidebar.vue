<template>
  <div class="sidebar" :style="{width: sidebarWidth}">
    <Menu :active-name="activeName" theme="dark" width="auto" @on-select="handleSelect">
      <Tooltip v-for="menu in routes" :key="menu.name" :content="menu.title" placement="right" transfer :disabled="!$store.state.collapse">
        <MenuItem :name="menu.name">
          <Icon :type="menu.icon" />
          <span v-if="!$store.state.collapse">
            {{ menu.title }}
          </span>
        </MenuItem>
      </Tooltip>
    </Menu>
  </div>
</template>

<script>
import { mainRoutes as routes } from '../../router'
export default {
  name: 'Sidebar',
  data () {
    return {
      routes,
      activeName: this.$route.name
    }
  },
  computed: {
    sidebarWidth () {
      return this.$store.state.sidebarWidth + 'px'
    }
  },
  methods: {
    handleSelect (name) {
      this.$router.push(name)
    }
  }
}
</script>

<style lang="less" scope>
.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
  overflow: auto;
  background: #515a6e;
  transition: all .3s;
  .ivu-tooltip {
    width: 100%;
  }
}
</style>
