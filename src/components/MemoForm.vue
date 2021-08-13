<template>
  <div class="memo-form-container">
    <textarea name="memo-body" id="memo-body" class="memo-body" rows="10" :value="selectedItem"></textarea>
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
      const newBody = document.querySelector("#memo-body").value
      this.$emit('update', newBody)
    },
    deleteItem: function () {
      this.$emit('delete')
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
