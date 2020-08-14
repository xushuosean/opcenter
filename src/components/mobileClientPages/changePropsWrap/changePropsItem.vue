<template>
  <div class="propsTypeWrap">

    <!-- 属性为 string 或 number -->
    <template v-if="checkType(value) === 'string' || checkType(value) === 'number'">
      <div v-if="name" class="changePropsItemKey">{{ name }}</div>
      <el-input :value="value" @change="$emit('input', $event.target.value)" />
    </template>

    <!-- 属性为 boolean -->
    <template v-if="checkType(value) === 'boolean'">
      <div v-if="name" class="changePropsItemKey">{{ name }}</div>
      <el-switch :default-checked="value" @change="$emit('input', $event)" />
    </template>

    <!-- 属性为 object -->
    <template v-if="checkType(value) === 'object'">
      <div v-if="name" class="changePropsItemKey">{{ name }}</div>
      <template v-for="(item, index) in value">
        <PropsItem :key="index" v-model="value[index]" :name="index" />
      </template>
    </template>

    <!-- 属性为 array -->
    <template v-if="checkType(value) === 'array'">
      <div v-if="name" class="changePropsItemKey">{{ name }}</div>
      <template v-for="(item, index) in value">
        <div :key="index" class="propsTypeArrayItemWrap">
          <el-button v-if="value.length > 1" class="propsTypeArrayItemRemove" type="danger" shape="circle" icon="minus" @click="handleRemoveItem(index)" />
          <PropsItem v-model="value[index]" :name="''" />
        </div>
      </template>
      <el-button type="primary" class="propsTypeArrayAdd" @click="handleAddItem">追加一条数据</el-button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'PropsItem',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: [Object, Array, Number, String, Boolean]
    },
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    checkType: function(data) {
      return Object.prototype.toString.call(data).match(/\[object (.*?)\]/)[1].toLocaleLowerCase()
    },

    /**
     * 数组追加一条
     */
    handleAddItem: function() {
      let newValue = this.value
      let newItem = {}
      if (newValue[0]) {
        for (let item in newValue[0]) {
          newItem[item] = newValue[0][item]
        }
        newValue.push(newItem)
        this.$emit('input', newValue)
      }
    },

    /**
     * 数组移除单条
     */
    handleRemoveItem: function(index) {
      let newValue = [].concat(this.value)
      newValue.splice(index, 1)
      this.$emit('input', newValue)
    }
  }
}
</script>

<style>

</style>
