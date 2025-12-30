<script setup lang="ts">
import { ref } from "vue";
import { useTodo } from "@/utils/useTodo";
import Modal from "./Modal.vue";

const {
    todos,
    taskInput,
    dateStartPart,
    timeStartPart,
    datePart,
    timePart,
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

const handleSubmit = () => {
    handleCreateTodo();
    closeModal(); // Close modal after creating todo
};
</script>

<template>
    <div class="p-4 max-w-xl mx-auto flex flex-row gap-4">
        <div class="flex flex-col">
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex flex-col gap-2">
                    <h1 class="text-2xl font-bold mb-4">Create Todos</h1>
                    <button
                        @click="openModal"
                        class="bg-indigo-500 p-1.5 rounded-md hover:cursor-pointer hover:bg-indigo-600 hover:text-white transition-colors text-white"
                    >
                        Create
                    </button>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-2xl font-bold mb-4">My Todos</h1>

                    <div v-if="loading" class="text-white">
                        <p>Loading...</p>
                    </div>

                    <ul v-else class="flex flex-wrap gap-4">
                        <li v-if="todos.length === 0" class="text-white italic">
                            No todos found.
                        </li>

                        <li
                            v-for="todo in todos"
                            :key="todo.id"
                            class="flex-1 min-w-[300px] flex justify-between items-center border-b border-gray-100 py-2.5"
                        >
                            <div>
                                <strong class="block text-white">
                                    {{ todo.task }}
                                </strong>
                                <div class="flex flex-col">
                                    <small class="text-white">
                                        Start: {{ formatDate(todo.date_start) }}
                                    </small>
                                    <small class="text-white">
                                        Due: {{ formatDate(todo.date_due) }}
                                    </small>
                                </div>
                            </div>
                            <span class="text-sm font-medium">
                                {{ todo.completed ? "✅ Done" : "⏳ Pending" }}
                            </span>
                        </li>
                    </ul>
                </div>
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
                            >Task Name</label
                        >
                        <input
                            type="text"
                            v-model="taskInput"
                            placeholder="What needs to be done?"
                            required
                            class="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div class="flex gap-3">
                        <div class="flex flex-col gap-2">
                            <div class="flex-1 flex flex-col">
                                <label
                                    class="text-sm font-bold mb-1 text-gray-700"
                                    >Date Start</label
                                >
                                <input
                                    type="date"
                                    v-model="dateStartPart"
                                    required
                                    class="p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>

                            <div class="flex-1 flex flex-col">
                                <label
                                    class="text-sm font-bold mb-1 text-gray-700"
                                    >Date</label
                                >
                                <input
                                    type="date"
                                    v-model="datePart"
                                    required
                                    class="p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="flex-1 flex flex-col">
                                <label
                                    class="text-sm font-bold mb-1 text-gray-700"
                                    >Time Start</label
                                >
                                <input
                                    type="time"
                                    v-model="timeStartPart"
                                    required
                                    class="p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>
                            <div class="flex-1 flex flex-col">
                                <label
                                    class="text-sm font-bold mb-1 text-gray-700"
                                    >Time</label
                                >
                                <input
                                    type="time"
                                    v-model="timePart"
                                    required
                                    class="p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>
                        </div>
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
