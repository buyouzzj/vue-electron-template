<template>
  <Card dis-hover class="auto-build">
    <Form ref="buildForm" :model="formData" :rules="ruleValidate" :label-width="0" inline>
      <Row>
        <i-col span="10">
          <FormItem label="源代码地址" prop="sourceCodeUrl" :label-width="100">
            <Input v-model="formData.sourceCodeUrl" placeholder="客户端代码所在地址" />
          </FormItem>
        </i-col>
        <i-col span="11">
          <FormItem label="打包后代码地址" prop="buildUrl" :label-width="130">
            <Input v-model="formData.buildUrl" placeholder="客户端安装后的地址" />
          </FormItem>
        </i-col>
        <i-col span="3">
          <FormItem label=" " prop="">
            <Button type="primary" @click="showConfirm">确定地址</Button>
          </FormItem>
        </i-col>
      </Row>
      <FormItem label="手动设置第几步" :label-width="120">
        <Select style="width: 120px;" @on-change="jumpTo">
          <Option v-for="step in [1, 2, 3, 4]" :key="step" :value="step">{{ step }}</Option>
        </Select>
      </FormItem>
    </Form>
    <Steps :current="current">
      <Step title="第一次打包" content="删除打包后地址里小微+当前打包版本号的目录及对应的压缩文件，同时删除after-build里面的压缩文件，然后执行第一次打包"></Step>
      <Step title="打开安装包"></Step>
      <Step title="重命名+压缩+复制"></Step>
      <Step title="第二次打包" content="执行第二次打包"></Step>
    </Steps>
    <div class="build-content">
      <Button type="primary" :loading="loading" @click="release">第{{ current + 1 }}步操作</Button>
    </div>
  </Card>
</template>

<script>
import { ipcRenderer } from 'electron'
import { getItem, setItem } from '../../utils/storage'
export default {
  name: 'Home',
  data () {
    return {
      current: 0,
      loading: false,
      formData: {
        sourceCodeUrl: '',
        buildUrl: ''
      },
      ruleValidate: {
        sourceCodeUrl: [
          { required: true, message: '客户端代码所在地址' }
        ],
        buildUrl: [
          { required: true, message: '客户端安装后的地址' }
        ]
      }
    }
  },
  mounted () {
    this.showBuildUrl()
    ipcRenderer.on('release-success', (e, data) => {
      console.log('返回的是第几步: ', data)
      this.$Message.success('操作成功！')
      this.loading = false
      if (data === 3) this.current = 0
      else this.current = data += 1
    })
    ipcRenderer.on('release-fail', (e, data) => {
      this.loading = false
      this.$Notice.config({
        top: 60
      })
      this.$Notice.error({
        title: 'error',
        desc: data,
        duration: 0
      })
    })
  },
  methods: {
    showBuildUrl () {
      const buildUrl = getItem('buildUrl')
      this.formData = buildUrl ? JSON.parse(buildUrl) : {
        sourceCodeUrl: '',
        buildUrl: ''
      }
    },
    jumpTo (step) {
      this.current = step - 1
    },
    release () {
      this.$refs.buildForm.validate(valid => {
        if (valid) {
          this.loading = true
          ipcRenderer.send('release-first', this.current)
          if (this.current === 0 || this.current === 3) {
            this.$Message.info('打包需要3分钟左右，请耐心等待！')
          }
        }
      })
    },
    showConfirm () {
      this.$refs.buildForm.validate(valid => {
        if (valid) {
          this.$Modal.confirm({
            title: 'Tips',
            content: `<p>当前源代码地址：${this.formData.sourceCodeUrl}</p><p>客户端安装后地址：${this.formData.buildUrl}</p>`,
            onOk: () => {
              setItem('buildUrl', JSON.stringify(this.formData))
              ipcRenderer.send('confirm-url', this.formData)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.auto-build {
  .build-content {
    margin: 24px 0;
  }
  .ivu-form-item {
    width: 100%;
  }
}
</style>
