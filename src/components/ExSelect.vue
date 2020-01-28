<template>
  <el-select class="ex-select" :value="value" filterable v-bind="$attrs" v-on="listers">
    <el-option v-for="opt in opts" :key="opt.value" :value="opt.value" :label="opt.label">
      <Render :render="optionRender" :option="opt"/>
    </el-option>
  </el-select>
</template>

<script>
const Render = {
  functional: true,
  props: {
    option: Object,
    index: Number,
    render: Function,
  },
  render (h, ctx) {
    const params = {
      option: ctx.props.option,
      index: ctx.props.index,
    }

    return ctx.props.render(h, params)
  },
}

export default {
  name: 'ExSelect',
  components: {
    Render,
  },
  props: {
    options: {
      type: [Array, Object],
      required: true,
    },
    value: {
      type: [String, Number, Array],
      required: true,
    },
    render: {
      type: Function,
      default: null,
    },
  },
  computed: {
    opts () {
      if (Array.isArray(this.options)) {
        return this.options.map((opt, idx) => {
          const value = (typeof opt === 'string') ? idx : opt.value
          const label = opt.label || opt.value || opt
          return { value, label }
        })
      } else {
        return Object.entries(this.options).map(([value, label]) => ({ value, label }))
      }
    },

    optionRender () {
      if (typeof this.render === 'function') {
        return this.render
      } else {
        return (h, { option, index }) => h('span', option.label)
      }
    },

    listers () {
      return {
        ...this.$listeners,
        input: value => this.$emit('input', value),
        clear: value => this.$emit('input', ''),
      }
    },
  },
}
</script>

<style scoped>
.ex-select {
  width: 100%;
}
</style>
