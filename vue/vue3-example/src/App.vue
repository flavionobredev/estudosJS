<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Profile :user="{ name: 'flavio', email: 'flavio@teste.com' }" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Profile from "./components/profile.vue";
export default defineComponent({
  name: "App",
  components: {
    Profile,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
