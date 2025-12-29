<script setup lang="ts">
import { useTodo } from "@/utils/useTodo";

const {
    todos,
    taskInput,
    datePart,
    timePart,
    loading,
    formatDate,
    handleCreateTodo,
} = useTodo();
</script>

<template>
    <div class="p-4 max-w-2xl mx-auto flex flex-row gap-4">
        <div class="flex flex-col">
            <h1 class="text-2xl font-bold mb-4 pb-2.5">Create Todo</h1>

            <form
                @submit.prevent="handleCreateTodo"
                class="mb-8 bg-gray-50 p-5 rounded-lg shadow-sm max-w-md"
            >
                <div class="mb-3 flex flex-col">
                    <label class="text-sm font-bold mb-1 text-gray-600"
                        >Task Name</label
                    >
                    <input
                        type="text"
                        v-model="taskInput"
                        placeholder="What needs to be done?"
                        class="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                </div>

                <div class="flex gap-3 pb-4">
                    <div class="flex-1 flex flex-col mb-3">
                        <label class="text-sm font-bold mb-1 text-gray-600"
                            >Date</label
                        >
                        <input
                            type="date"
                            v-model="datePart"
                            required
                            class="p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    <div class="flex-1 flex flex-col mb-3">
                        <label class="text-sm font-bold mb-1 text-gray-600"
                            >Time</label
                        >
                        <input
                            type="time"
                            v-model="timePart"
                            required
                            class="p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    class="w-full p-2.5 bg-gray-800 text-white rounded cursor-pointer text-base hover:bg-gray-700 transition-colors"
                >
                    Add Todo
                </button>
            </form>
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
                        <strong class="block text-white">{{
                            todo.task
                        }}</strong>
                        <small class="text-white"
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
</template>
