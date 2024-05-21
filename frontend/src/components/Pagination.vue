<template>
    <nav aria-label="Page navigation">
        <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a
                    class="page-link"
                    href="#"
                    @click.prevent="changePage(currentPage - 1)"
                    >Previous</a
                >
            </li>

            <li
                v-for="page in pagesToShow"
                :key="page"
                class="page-item"
                :class="{ active: page === currentPage }"
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
                :class="{ disabled: currentPage === totalPages }"
            >
                <a
                    class="page-link"
                    href="#"
                    @click.prevent="changePage(currentPage + 1)"
                    >Next</a
                >
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { useCategoryStore } from "@/stores/category";
import { computed } from "vue";

const props = defineProps({
    currentPage: {
        type: Number,
        required: true,
    },
    totalPages: {
        type: Number,
        required: true,
    },
});

const categoryStore = useCategoryStore();

const maxVisiblePages = 4; // Adjust this value to show more or fewer page links

const pagesToShow = computed(() => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = props.currentPage - half;
    let end = props.currentPage + half;

    if (start < 1) {
        start = 1;
        end = Math.min(maxVisiblePages, props.totalPages);
    }

    if (end > props.totalPages) {
        end = props.totalPages;
        start = Math.max(1, props.totalPages - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
});

const changePage = (page) => {
    categoryStore.fetchCategoriesWithPagination(page);
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
