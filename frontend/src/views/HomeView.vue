<script setup>
import { useAuthStore } from "../stores/auth";
import { onMounted } from "vue";

const authStore = useAuthStore();
</script>

<template>
    <main>
        <div v-if="authStore.loading" className="loading-spinner">
            Loading...
        </div>
        <div v-else>
            <h2 className="text-primary text-center mt-3">
                Welcome to Laravel vue app {{ authStore.user?.name }}
            </h2>
            <button @click="showAlert" class="btn btn-dark">show</button>
            <br />
        </div>
    </main>
</template>

<style>
.loading-spinner {
    /* Add your loading spinner styles here */
    text-align: center;
    font-size: 20px;
    padding: 20px;
}
</style>
