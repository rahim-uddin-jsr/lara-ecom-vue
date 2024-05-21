// src/store/auth.js
import axios from "axios";
import { defineStore } from "pinia";
import api from "../api/api";
import { useRouter } from "vue-router";
import router from "../router";

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        user: null,
        loading: false,
    }),
    actions: {
        login(email, password) {
            const postData = {
                email,
                password,
            };
            axios
                .post("http://127.0.0.1:8000/api/login", postData)
                .then((response) => {
                    if (response.status == 200) {
                        console.log(response.data);
                        this.$state.user = response.data.user;
                        localStorage.setItem("token", response.data.token);
                        router.push("/");
                    }
                    Swal.fire({
                        title: response.data.user.name,
                        text: "Login Successful!",
                        icon: "success",
                    });
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            //  alert(`Logging in with email: ${email}, password: ${password}`);
        },
        register(name, email, password, password_confirmation) {
            const postData = {
                name,
                email,
                password,
                password_confirmation,
            };
            if (password == password_confirmation) {
                axios
                    .post("http://127.0.0.1:8000/api/register", postData)
                    .then((response) => {
                        this.user = response.data.user;
                        localStorage.setItem("token", response.data.token);
                        // console.log(response);
                        router.push("/");
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            }
            alert(
                `Registering user: ${name}, email: ${email}, password: ${password}, confirmPassword: ${password_confirmation}`
            );
        },
        async fetchUser() {
            this.loading = true;
            try {
                const response = await api.get(
                    "http://127.0.0.1:8000/api/user"
                );
                console.log(response);
                this.user = response.data;
            } catch (error) {
                console.error("Fetch user error:", error.response.data);
                this.logout();
            } finally {
                this.loading = false;
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            Swal.fire({
                title: "Bye",
                text: "Logout Successful!",
                icon: "success",
            });
        },
    },
});
