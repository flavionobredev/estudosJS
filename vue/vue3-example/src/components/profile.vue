<template>
  <div>
    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { User } from "../shared/models/user";

export default defineComponent({
  name: "profile-component",
  props: {
    user: {
      type: User,
      default: () => new User({ email: "mock@teste.com", name: "Mock" }),
    },
  },
});
</script>
