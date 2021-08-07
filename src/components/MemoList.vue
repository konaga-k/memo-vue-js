<template>
  <div class="memo-list-container">
    <ul>
      <li v-for="(item, index) in items" :key="item">
        <span class="memo-item" @click="changeSelectedItem(index)">{{ memoHead(item) }}</span>
      </li>
      <li>
        <span class="memo-item" @click="createItem">+</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    }
  },
  methods: {
    createItem: function () {
      this.$emit('create')
      this.changeSelectedItem(this.items.length - 1)
    },
    changeSelectedItem: function (index) {
      this.$emit('select', index)
    },
  },
  computed: {
    memoHead: function () {
      return function (value) {
        return value.includes('\n') ? value.slice(0, value.indexOf('\n')) : value
      }
    }
  }
}
</script>

<style>
.memo-list-container {
  width: 45%;
}
.memo-item {
  text-decoration: underline;
}
.memo-item:hover {
  cursor: pointer;
}
</style>
