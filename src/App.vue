<template>
  <memo-header :signingIn="signingIn" :currentUser="currentUser"></memo-header>
  <div>
    <h1>メモアプリ</h1>
    <div v-if="!signingIn">
      <p>サインインしてください</p>
    </div>
    <div v-else class="memo-container">
      <memo-list :items="memoItems" @create="createItem" @select="selectItem"></memo-list>
      <memo-form :selectedItemBody="selectedItem.body" :selectedIndex="selectedIndex" @update="updateItem" @delete="deleteItem" v-show="editing"></memo-form>
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
      nextItemId: 1,
      selectedItem: { id: null, body: null },
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
          if (snapshot.val()) {
            this.memoItems = Object.values(snapshot.val())
            this.nextItemId = this.memoItems[this.memoItems.length - 1].id + 1
          } else {
            this.memoItems = []
          }
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
      const newItem = { id: this.nextItemId,  body: '新規メモ' }
      this.memoItems.push(newItem)
      this.saveMemos()
    },
    selectItem: function(index) {
      this.selectedItem = this.memoItems[index]
      this.selectedIndex = index
      this.editing = true
    },
    updateItem: function(newBody) {
      this.memoItems[this.selectedIndex].body = newBody
      this.selectItem(this.selectedIndex)
      this.saveMemos()
    },
    deleteItem: function() {
      this.memoItems.splice(this.selectedIndex, 1)
      this.resetSelection()
      this.editing = false
      this.saveMemos()
    },
    resetSelection: function () {
      this.selectedItem = { id: null, body: null }
      this.selectedIndex = null
    }
  }
}
</script>

<style scoped>
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
