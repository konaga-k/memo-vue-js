<template>
  <div class="memo-form-container">
    <textarea name="memo-body" id="memo-body" class="memo-body" rows="10" :value="selectedItemBody" @input="form.body=$event.target.value"></textarea>
    <button @click="updateItem">更新</button>
    <button @click="deleteItem">削除</button>
  </div>
</template>

<script>
export default {
  props: {
    selectedItemBody: {
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
  data() {
    return {
      form: {
        body: this.selectedItemBody,
      },
    }
  },
  methods: {
    updateItem: function () {
      this.$emit('update', this.form.body)
    },
    deleteItem: function () {
      this.$emit('delete')
    }
  }
}
</script>

<style scoped>
.memo-form-container {
  width: 45%;
  margin-right: 20px;
}
.memo-body {
  width: 100%;
}
</style>
