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
} = useTodo();

// Modal state
const isModalOpen = ref(false);

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const handleSubmit = async () => {
    // Call handleCreateTodo and wait for result
    const success = await handleCreateTodo();

    // Only close modal if creation was successful
    if (success) {
        closeModal();
    }
};
</script>

<template>
    <!-- Rest of your template remains the same -->
    <div class="p-4 max-w-6xl mx-auto">
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
                        <span class="text-sm font-medium">
                            {{ todo.completed ? "✅ Done" : "⏳ Pending" }}
                        </span>
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
