<template>
  <el-form ref="form" :model="form" :rules="rules" v-bind="$attrs">
    <el-row :gutter="20">
      <el-col v-for="item in items" :key="item.value" :span="item.span">
        <el-form-item :label="item.label" :prop="item.value">
          <component
            :is="item.component"
            v-model.trim="form[item.value]"
            v-bind="item.attrs"
            @change="handleChange(item.value)"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
      <slot :form="form"/>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'ExForm',
  props: {
    formData: {
      type: Object,
      required: true,
    },
    formItems: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      default () {
        return {}
      },
    },
    events: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  data () {
    return {
      form: {},
    }
  },
  computed: {
    items () {
      const keys = Object.keys(this.formItems)
      return keys.map(key => {
        const { label, component, span = 24, ...attrs } = this.formItems[key]
        return {
          value: key,
          component,
          label,
          span,
          attrs,
        }
      })
    },
  },
  created () {
    this._resetForm()
  },
  methods: {
    _resetForm () {
      const form = {}
      for (const key in this.formItems) {
        if (this.formItems[key].component === 'ex-select') {
          form[key] = this.formItems[key].multiple ? [] : ''
        }
        if (key in this.formData) {
          form[key] = this.formData[key]
        }
      }
      this.form = form
    },

    _clone (obj) {
      return JSON.parse(JSON.stringify(obj))
    },

    handleChange (field) {
      const event = `${field}Change`
      if (event in this.events) {
        this.$nextTick(() => {
          this.events[event](this.form, this.formItems, this.rules)
        })
      }
    },

    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('submit', this._clone(this.form))
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>
