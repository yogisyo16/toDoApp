<script setup lang="ts">
import { ref } from "vue";
import { useTodo } from "@/utils/useTodo";
import Modal from "./Modal.vue";

const {
    todos,
    taskInput,
    dateStartPart,
    dateStartTimePart,
    dateDuePart,
    dateDueTimePart,
    loading,
    formatDate,
    handleCreateTodo,
    handleDeleteTodo,
} = useTodo();

// Modal state
const isModalOpen = ref(false);

// Track which menu is open (by todo id)
const openMenuId = ref<string | null>(null);

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const handleSubmit = async () => {
    const success = await handleCreateTodo();
    if (success) {
        closeModal();
    }
};

const toggleMenu = (todoId: string) => {
    if (openMenuId.value === todoId) {
        openMenuId.value = null;
    } else {
        openMenuId.value = todoId;
    }
};

const closeMenu = () => {
    openMenuId.value = null;
};

const handleEdit = (todoId: string) => {
    console.log("Edit todo:", todoId);
    // TODO: Implement edit functionality
    closeMenu();
};

const handleDetails = (todoId: string) => {
    console.log("View details:", todoId);
    // TODO: Implement details view
    closeMenu();
};

const handleDelete = async (todoId: string) => {
    if (confirm("Are you sure you want to delete this todo?")) {
        await handleDeleteTodo(todoId);
        closeMenu();
    }
};
</script>

<template>
    <!-- Rest of your template remains the same -->
    <div class="p-4 mx-auto">
        <div class="flex flex-row gap-8">
            <div class="flex flex-col gap-2">
                <h1 class="text-2xl font-bold mb-4 text-white">Create Todos</h1>
                <button
                    @click="openModal"
                    class="bg-indigo-500 p-1.5 rounded-md hover:cursor-pointer hover:bg-indigo-600 hover:text-white transition-colors text-white"
                >
                    Create
                </button>
            </div>

            <div class="flex flex-col flex-1">
                <h1 class="text-2xl font-bold mb-4 text-white">My Todos</h1>

                <div v-if="loading" class="text-white">
                    <p>Loading...</p>
                </div>

                <ul v-else class="flex flex-col gap-4">
                    <li v-if="todos.length === 0" class="text-white italic">
                        No todos found.
                    </li>

                    <li
                        v-for="todo in todos"
                        :key="todo.id"
                        class="flex justify-between items-center bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                        <div>
                            <strong class="block text-white text-lg">{{
                                todo.task
                            }}</strong>
                            <small class="text-gray-400"
                                >Start: {{ formatDate(todo.date_start) }}</small
                            >
                            <br />
                            <small class="text-gray-400"
                                >Due: {{ formatDate(todo.date_due) }}</small
                            >
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="text-sm font-medium">
                                {{ todo.completed ? "✅ Done" : "⏳ Pending" }}
                            </span>

                            <!-- Menu Button with Dropdown -->
                            <div class="relative">
                                <button
                                    @click="toggleMenu(todo.id)"
                                    class="text-white bg-gray-700 hover:bg-gray-600 p-2 rounded-md transition-colors"
                                    aria-label="Options menu"
                                >
                                    <!-- Three dots icon -->
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                                        />
                                    </svg>
                                </button>

                                <!-- Dropdown Menu -->
                                <div
                                    v-if="openMenuId === todo.id"
                                    class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                                >
                                    <div class="py-1">
                                        <!-- Edit Option (disabled for now) -->
                                        <button
                                            class="w-full text-left px-4 py-2 text-sm text-gray-400 cursor-not-allowed flex items-center gap-2"
                                            disabled
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-4 w-4"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                                />
                                            </svg>
                                            Edit (Coming soon)
                                        </button>

                                        <!-- Details Option (disabled for now) -->
                                        <button
                                            class="w-full text-left px-4 py-2 text-sm text-gray-400 cursor-not-allowed flex items-center gap-2"
                                            disabled
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-4 w-4"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                                                />
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                            Details (Coming soon)
                                        </button>

                                        <!-- Divider -->
                                        <div
                                            class="border-t border-gray-200"
                                        ></div>

                                        <!-- Delete Option (active) -->
                                        <button
                                            @click="handleDelete(todo.id)"
                                            class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-4 w-4"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Modal Component -->
        <Modal
            :isOpen="isModalOpen"
            @close="closeModal"
            title="Create New Todo"
        >
            <template #body>
                <form @submit.prevent="handleSubmit" class="space-y-4">
                    <div class="flex flex-col">
                        <label class="text-sm font-bold mb-1 text-gray-700"
                            >Task Name *</label
                        >
                        <input
                            type="text"
                            v-model="taskInput"
                            placeholder="What needs to be done?"
                            required
                            class="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div class="flex flex-col">
                        <label class="text-sm font-bold mb-1 text-gray-700"
                            >Start Date *</label
                        >
                        <input
                            type="date"
                            v-model="dateStartPart"
                            required
                            class="p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div class="flex flex-col">
                        <label class="text-sm font-bold mb-1 text-gray-700"
                            >Start Time (Optional)</label
                        >
                        <input
                            type="time"
                            v-model="dateStartTimePart"
                            class="p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <small class="text-gray-500 mt-1"
                            >If not specified, defaults to 00:00</small
                        >
                    </div>

                    <div class="flex flex-col">
                        <label class="text-sm font-bold mb-1 text-gray-700"
                            >Due Date *</label
                        >
                        <input
                            type="date"
                            v-model="dateDuePart"
                            required
                            class="p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div class="flex flex-col">
                        <label class="text-sm font-bold mb-1 text-gray-700"
                            >Due Time (Optional)</label
                        >
                        <input
                            type="time"
                            v-model="dateDueTimePart"
                            class="p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <small class="text-gray-500 mt-1"
                            >If not specified, defaults to 00:00</small
                        >
                    </div>
                </form>
            </template>

            <template #footer>
                <div class="flex gap-2 justify-end">
                    <button
                        @click="closeModal"
                        class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        @click="handleSubmit"
                        class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
                    >
                        Add Todo
                    </button>
                </div>
            </template>
        </Modal>
    </div>
</template>
