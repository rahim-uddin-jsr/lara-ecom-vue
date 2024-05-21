<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="#">Navbar</router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link
                            class="nav-link active"
                            aria-current="page"
                            to="/"
                            >Home</router-link
                        >
                    </li>
                    <li v-if="!useAuthStore().user" class="nav-item">
                        <router-link class="nav-link" to="/login"
                            >Login</router-link
                        >
                    </li>
                    <li v-if="useAuthStore().user" class="nav-item">
                        <router-link class="nav-link" to="/categories"
                            >Categories</router-link
                        >
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Dropdown
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <router-link class="dropdown-item" to="/"
                                    >Action</router-link
                                >
                            </li>
                            <li>
                                <router-link class="dropdown-item" to="/"
                                    >Another action</router-link
                                >
                            </li>
                            <li><hr class="dropdown-divider" /></li>
                            <li>
                                <router-link class="dropdown-item" to="/"
                                    >Something else here</router-link
                                >
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#">Disabled</a>
                    </li>
                    <li class="nav-item">
                        <button
                            v-if="useAuthStore().user"
                            @click="useAuthStore().logout()"
                            class="btn btn-dark"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
                <form
                    class="d-flex"
                    role="search"
                    @submit.prevent="handleSearch"
                >
                    <input
                        class="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        v-model="searchQuery"
                    />
                    <button class="btn btn-outline-success" type="submit">
                        Search
                    </button>
                </form>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const searchQuery = ref("");
const router = useRouter();

const handleSearch = () => {
    // Handle the search logic here
    console.log(`Search for: ${searchQuery.value}`);
    // Example: navigate to a search results page
    router.push({ name: "search", query: { q: searchQuery.value } });
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
