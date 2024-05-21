<!-- src/components/Register.vue -->
<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title mb-4">Register</h3>
                        <form @submit.prevent="handleSubmit">
                            <div class="mb-3">
                                <label for="name" class="form-label"
                                    >Name</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="name"
                                    v-model="name"
                                    required
                                />
                            </div>
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
                            <div class="mb-3">
                                <label
                                    for="password_confirmation"
                                    class="form-label"
                                    >Confirm Password</label
                                >
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password_confirmation"
                                    v-model="password_confirmation"
                                    required
                                />
                            </div>
                            <button type="submit" class="btn btn-primary">
                                Register
                            </button>
                        </form>
                        <div class="d-flex gap-2">
                            <p>Already have an account?</p>
                            <router-link :to="{ name: 'login' }"
                                >Login</router-link
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

const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");

const handleSubmit = () => {
    useAuthStore().register(name.value,email.value,password.value,password_confirmation.value);
};
</script>

<style scoped>
/* Add styles specific to the Register component here */
</style>
