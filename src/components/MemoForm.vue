<template>
  <div class="memo-form-container">
    <textarea name="memo-body" id="memo-body" class="memo-body" rows="10" v-model="selectedItemInput"></textarea>
    <button @click="updateItem">更新</button>
    <button @click="deleteItem">削除</button>
  </div>
</template>

<script>
export default {
  props: {
    selectedItem: {
      type: String,
      required: false,
      default: null
    },
    selectedIndex: {
      type: Number,
      required: false,
      default: null
    }
  },
  methods: {
    updateItem: function () {
      const newBody = this.selectedItemInput
      this.$emit('update', this.selectedIndex, newBody)
    },
    deleteItem: function () {
      this.$emit('delete', this.selectedIndex)
    }
  },
  computed: {
    selectedItemInput: {
      get: function () {
        return this.selectedItem
      },
      set: function (newBody) {
        this.$emit('change', newBody)
      }
    }
  }
}
</script>

<style>
.memo-form-container {
  width: 45%;
  margin-right: 20px;
}
.memo-body {
  width: 100%;
}
</style>
