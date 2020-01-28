<template>
  <div id="app">
    <ex-form :form-items="formItems" :form-data="formData" :rules="rules" :events="events" label-width="auto" @submit="handleSubmit"/>
  </div>
</template>

<script>
import ExForm from './components/ExForm'

export default {
  name: 'App',
  components: {
    ExForm,
  },
  data () {
    return {
      // 表单配置
      formItems: {
        sfc: { label: '批次号', component: 'el-input', span: 24, placeholder: '请输入批次号登记', disabled: true },
        fromProcess: { label: '发现工序', component: 'ex-select', span: 12, options: { Check: '检测', Assemble: '组装', Pack: '打包' }},
        fromEmp: { label: '登记员编号', component: 'el-input', span: 12, disabled: false },
        qty: { label: '不良数量', component: 'el-input-number', span: 12, disabled: false },
        failTimes: { label: '不良次数', component: 'el-input-number', span: 12, disabled: true },
        canRepair: { label: '处理方案', component: 'el-switch', span: 24, activeText: '维修', inactiveText: '报废', activeColor: '#13ce66', inactiveColor: '#ff4949' },
        disposalProcess: { label: '归还工序', component: 'ex-select', span: 12, options: { Check: '检测', Assemble: '组装', Pack: '打包' }, multiple: true, disabled: true },
        repairRemark: { label: '维修说明', component: 'el-input', span: 24, type: 'textarea', rows: 5 },
      },
      // 默认表单内容
      formData: {
        sfc: 'AT-0001',
        fromProcess: 'Check',
        qty: 10,
        failTimes: 1,
        canRepair: 1,
        fromEmp: '10000',
      },
      // 表单校验细则
      rules: {
        processCode: { required: true, message: '请选择责任工序', trigger: 'change' },
        disposalProcess: { required: true, message: '请选择归还工序', trigger: 'change' },
      },
      // 表单内容监听事件
      events: {
        canRepairChange (form, formItems, rules) {
          // 可维修的情况需选择归还工序，报废时需要清空归还工序
          rules.disposalProcess.required = form.canRepair
          formItems.disposalProcess.disabled = !form.canRepair
          if (!form.handleType) {
            form.disposalProcess = formItems.disposalProcess.multiple ? [] : ''
          }
        },
      },
    }
  },

  methods: {
    handleSubmit (form) {
      console.log(form)
    },
  },
}
</script>
