<!-- src/components/Login.vue -->
<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title mb-4">Login</h3>
                        <form @submit.prevent="handleSubmit">
                            <div class="mb-3">
                                <label for="email" class="form-label"
                                    >Email</label
                                >
                                <input
                                    type="email"
                                    class="form-control"
                                    id="email"
                                    v-model="email"
                                    required
                                />
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label"
                                    >Password</label
                                >
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    v-model="password"
                                    required
                                />
                            </div>
                            <button type="submit" class="btn btn-primary">
                                Login
                            </button>
                        </form>
                        <div class="d-flex gap-2">
                            <p>Don't have an account?</p>
                            <router-link class="" :to="{ name: 'register' }"
                                >Register</router-link
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import { ref } from "vue";

const email = ref("");
const password = ref("");

const handleSubmit = () => {
    useAuthStore().login(email.value, password.value);
};
</script>

<style scoped>
/* Add styles specific to the Login component here */
</style>
