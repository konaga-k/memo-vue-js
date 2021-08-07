<template>
  <memo-header :signingIn="signingIn" :currentUser="currentUser"></memo-header>
  <div>
    <h1>メモアプリ</h1>
    <div v-if="!signingIn">
      <p>サインインしてください</p>
    </div>
    <div v-else class="memo-container">
      <memo-list :items="memoItems" @create="createItem" @select="selectItem"></memo-list>
      <memo-form :selectedItem="selectedItem" :selectedIndex="selectedIndex" @update="updateItem" @delete="deleteItem" v-show="editing"></memo-form>
    </div>
  </div>
</template>

<script>
import MemoHeader from './components/MemoHeader.vue'
import MemoList from './components/MemoList.vue'
import MemoForm from './components/MemoForm.vue'
import { firebase } from './firebase.js'
const dbKey = 'memoItems'
export default {
  name: 'App',
  components: {
    MemoHeader,
    MemoList,
    MemoForm
  },
  data: function() {
    return {
      signingIn: false,
      currentUser: null,
      memoItems: [],
      selectedItem: null,
      selectedIndex: null,
      editing: false
    }
  },
  beforeCreate: function() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = firebase.auth().currentUser
        this.signingIn = true
        // firebase...child(this.currentUser.uid)をexport defaultの外で予め定数化したいが、
        //   非サインイン時にcurrentUser（=undefined）を呼び出そうとしてエラーになってしまう
        firebase.database().ref(dbKey).child(this.currentUser.uid).on('value', (snapshot) => {
          this.memoItems = snapshot.val() ? Object.values(snapshot.val()) : []
        })
      } else {
        this.currentUser = null
        this.resetSelection()
        this.signingIn = false
      }
    })
  },
  methods: {
    saveMemos: function() {
      // 全行洗い替えなのでレコード数が多くなると重くなりそうだが、試作アプリなのでパフォーマンスまでケアしない
      firebase.database().ref(dbKey).child(this.currentUser.uid).set(this.memoItems)
    },
    createItem: function() {
      const newItem = '新規メモ'
      this.memoItems.push(newItem)
      this.saveMemos()
    },
    selectItem: function(index) {
      this.selectedItem = this.memoItems[index]
      this.selectedIndex = index
      this.editing = true
    },
    updateItem: function(index, newBody) {
      this.memoItems[index] = newBody
      this.selectItem(index)
      this.saveMemos()
    },
    deleteItem: function(index) {
      this.memoItems.splice(index, 1)
      if (this.memoItems.length === 0) {
        this.resetSelection()
      } else {
        this.selectItem(0)
      }
      this.editing = false
      this.saveMemos()
    },
    resetSelection: function () {
      this.selectedItem = null
      this.selectedIndex = null
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}
.memo-container {
  display: flex;
  justify-content: space-between;
}
</style>
