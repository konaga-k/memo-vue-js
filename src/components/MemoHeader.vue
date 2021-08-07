<template>
  <header class="memo-header">
    <div v-if="!signingIn">
      <span @click="signIn" class="sign-in-out">サインイン</span>
    </div>
    <div v-else>
      <span>{{this.currentUser.displayName}}</span>
      <span @click="signOut" class="sign-in-out">サインアウト</span>
    </div>
  </header>
</template>

<script>
import { firebase } from '../firebase.js'
export default {
  props: {
    signingIn: {
      type: Boolean,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    }
  },
  methods: {
    signIn: function () {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    signOut: function () {
      firebase.auth().signOut();
    }
  }
}
</script>

<style>
.memo-header {
  display: flex;
  justify-content: flex-end;
}
.sign-in-out {
  margin-left: 10px;
  text-decoration: underline;
}
.sign-in-out:hover {
  cursor: pointer;
}
</style>
