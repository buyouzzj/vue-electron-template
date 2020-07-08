<template>
  <div class="logs">
    <Row class="log-card">
      <i-col v-for="(file, i) in files" :key="i" span="3">
        <span class="file-name" @click="showContent(file)">{{ file }}</span>
      </i-col>
    </Row>
    <Card v-if="fileContent">
      <Row>
        <div v-for="(l, i) in fileContent.split('\n')" :key="i">
          {{ l }}
        </div>
      </Row>
    </Card>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'Logs',
  data () {
    return {
      files: [],
      fileContent: ''
    }
  },
  mounted () {
    ipcRenderer.send('get-log-files')
    ipcRenderer.on('log-files', (e, files = []) => {
      this.files = files
    })
    ipcRenderer.on('show-file-content', (e, content) => {
      this.fileContent = content
    })
  },
  updated () {
    ipcRenderer.send('get-log-files')
  },
  methods: {
    showContent (file) {
      ipcRenderer.send('show-file-content', file)
    }
  }
}
</script>

<style lang="less" scoped>
.logs {
  .log-card {
    margin-bottom: 20px;
    .file-name {
      cursor: pointer;
      border: 1px solid #19be6b;
      color: #19be6b;
      border-radius: 4px;
      padding: 4px 6px;
    }
  }
}
</style>
