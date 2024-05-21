// src/store/auth.js
import axios from "axios";
import { defineStore } from "pinia";
import api from "../api/api";
import { useRouter } from "vue-router";
import router from "../router";

export const useCategoryStore = defineStore({
    id: "category",
    state: () => ({
        categories: null,
        currentPage: 1,
        totalPages: 1,
        perPage: 10,
        loading: false,
    }),
    actions: {
        async fetchCategories() {
            this.loading = true;
            try {
                const response = await api.get(
                    "http://127.0.0.1:8000/api/category-paginate"
                );
                console.log(response);
                this.categories = response.data.categories;
            } catch (error) {
                console.error("Fetch user error:", error.response.data);
                // this.logout();
            } finally {
                this.loading = false;
            }
        },
        async fetchCategoriesWithPagination(page = 1) {
            this.loading = true;
            try {
                const response = await api.get(
                    `http://127.0.0.1:8000/api/category-paginate?page=${page}`
                );
                console.log(response);
                this.categories = response.data.categories.data;
                this.currentPage = response.data.categories.current_page;
                this.totalPages = response.data.categories.last_page;
                this.perPage = response.data.categories.per_page;
            } catch (error) {
                console.error("Fetch user error:", error.response.data);
                // this.logout();
            } finally {
                this.loading = false;
            }
        },
        async updateCategory(category) {
            try {
                const data = {
                    category_name: category.name,
                };
                const response = await api.put(
                    `/categories/${category.id}`,
                    data
                );
                // Update the local category data
                const index = this.categories.findIndex(
                    (cat) => cat.id === category.id
                );
                if (index !== -1) {
                    this.categories[index] = response.data.category;
                }
                Swal.fire({
                    title: "Updated!",
                    text: "Category updated successfully!",
                    icon: "success",
                });
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Failed to update category",
                    icon: "success",
                });
            }
        },
        async createCategory(name) {
            try {
                const data = {
                    category_name: name,
                };
                const response = await api.post(`/categories/`, data);
                this.categories.push(response.data.category);
                Swal.fire({
                    title: "Created!",
                    text: "Category created successfully!",
                    icon: "success",
                });
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Failed to create category",
                    icon: "success",
                });
            }
        },
        async deleteCategory(category) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    try {
                        const response = api.delete(
                            `http://127.0.0.1:8000/api/categories/${category.id}`
                        );
                        this.categories = this.categories.filter(
                            (item) => item.id !== category.id
                        );
                        Swal.fire({
                            title: "Deleted!",
                            text: "Category deleted successfully!",
                            icon: "success",
                        });
                    } catch (error) {
                        Swal.fire({
                            title: "Error",
                            text: "Failed to update category",
                            icon: "error",
                        });
                    }
                }
            });
        },
    },
});
