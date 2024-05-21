<script setup>
import { RouterView } from "vue-router";

import { onMounted } from "vue";
import { useAuthStore } from "./stores/auth";
import Navigation from "./components/Navigation.vue";

const authStore = useAuthStore();
onMounted(async () => {
    await authStore.fetchUser();
});
</script>

<template>
    <Navigation />
    <RouterView />
</template>

<style scoped></style>
