<template>
    <h2 class="text-center">Categories</h2>

    <div class="container">
        <h2>All categories</h2>
        <button @click="createCategory()" class="btn btn-info">
            Create Category
        </button>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Created Date</th>
                    <th v-if="useAuthStore().user" class="text-center">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(category, index) in useCategoryStore().categories"
                    :key="category.id"
                >
                    <td>{{ index + 1 }}</td>
                    <td>{{ category.name }}</td>
                    <td>{{ category.slug }}</td>
                    <td
                        v-if="useAuthStore().user"
                        class="d-flex w-100 gap-2 justify-content-center"
                    >
                        <button
                            @click="editCategory(category)"
                            class="btn btn-primary btn-sm"
                        >
                            Edit
                        </button>
                        <button
                            type="btn"
                            @click="useCategoryStore().deleteCategory(category)"
                            class="btn btn-danger btn-sm"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
                <!-- Add more rows for additional categories -->
            </tbody>
        </table>
        <Pagination
            v-if="useCategoryStore().categories"
            :current-page="useCategoryStore().currentPage"
            :total-pages="useCategoryStore().totalPages"
        />
        <UpdateCategoryModal
            v-if="isModalVisible"
            :visible="isModalVisible"
            :category="selectedCategory"
            @close="isModalVisible = false"
        />
        <CreateCategoryModal
            v-if="isCategoryCreateModalVisible"
            :visible="isCategoryCreateModalVisible"
            @close="isCategoryCreateModalVisible = false"
        />
        <!-- <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li
                    class="page-item"
                    :class="{ disabled: useCategoryStore().currentPage === 1 }"
                >
                    <a
                        class="page-link"
                        href="#"
                        @click.prevent="
                            changePage(useCategoryStore().currentPage - 1)
                        "
                        >Previous</a
                    >
                </li>
                <li
                    class="page-item"
                    v-for="page in totalPagesArray"
                    :key="page"
                    :class="{ active: page === useCategoryStore().currentPage }"
                >
                    <a
                        class="page-link"
                        href="#"
                        @click.prevent="changePage(page)"
                        >{{ page }}</a
                    >
                </li>
                <li
                    class="page-item"
                    :class="{
                        disabled:
                            useCategoryStore().currentPage ===
                            useCategoryStore().totalPages,
                    }"
                >
                    <a
                        class="page-link"
                        href="#"
                        @click.prevent="
                            changePage(useCategoryStore().currentPage + 1)
                        "
                        >Next</a
                    >
                </li>
            </ul>
        </nav> -->
    </div>
</template>

<script setup>
import { useCategoryStore } from "../stores/category";
import { onMounted, computed, ref } from "vue";
import Pagination from "@/components/Pagination.vue";
import UpdateCategoryModal from "@/components/UpdateCategoryModal.vue";
import CreateCategoryModal from "@/components/CreateCategoryModal.vue";
import { useAuthStore } from "@/stores/auth";

onMounted(async () => {
    await useCategoryStore().fetchCategoriesWithPagination();
});

const totalPagesArray = computed(() => {
    return Array.from(
        { length: useCategoryStore().totalPages },
        (_, i) => i + 1
    );
});

const isModalVisible = ref(false);
const isCategoryCreateModalVisible = ref(false);
const selectedCategory = ref(null);

const editCategory = (category) => {
    selectedCategory.value = category;
    isModalVisible.value = true;
};
const createCategory = () => {
    isCategoryCreateModalVisible.value = true;
};
</script>
