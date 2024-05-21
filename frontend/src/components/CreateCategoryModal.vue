<template>
    <teleport to="body">
        <div v-if="visible" class="modal-overlay" @click.self="closeModal">
            <div
                class="modal-dialog"
                initial="initial"
                enter="enter"
                leave="leave"
            >
                <div class="modal-content">
                    <div
                        class="modal-header d-flex justify-content-between mb-2"
                    >
                        <h5 class="modal-title">Create Category</h5>
                        <button
                            type="button"
                            class="btn btn-close"
                            @click="closeModal"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="createCategory">
                            <div class="mb-3">
                                <label for="categoryName" class="form-label"
                                    >Category Name</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="categoryName"
                                    v-model="category"
                                />
                            </div>
                            <button type="submit" class="btn btn-primary">
                                Create Category
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { ref } from "vue";
import { useCategoryStore } from "@/stores/category";

const props = defineProps({
    visible: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["close"]);

const categoryStore = useCategoryStore();
const category = ref("");

const closeModal = () => {
    emit("close");
};

const createCategory = async () => {
    await categoryStore.createCategory(category.value);
    closeModal();
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-dialog {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    max-width: 500px;
    padding: 24px;
    width: 100%;
}
</style>
