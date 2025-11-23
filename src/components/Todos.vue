<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Todo } from '@/utils/type';

// --- STATE ---
const todos = ref<Todo[]>([]);
const taskInput = ref("");
// Split state into two variables
const datePart = ref(""); // Stores "2025-11-20"
const timePart = ref(""); // Stores "14:30"
const loading = ref(true);

const apiUrl = import.meta.env.VITE_API_URL;

// --- METHODS ---
const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString(); 
};

const fetchTodos = async () => {
    try {
        loading.value = true;
        const res = await fetch(`${apiUrl}/api/v1/todos`);
        const data = await res.json();
        todos.value = data.data.items || [];
    } catch (error) {
        console.error("Error fetching todos:", error);
    } finally {
        loading.value = false;
    }
};

const handleCreateTodo = async () => {
    // Validation: Ensure Task, Date, and Time are all present
    if (!taskInput.value.trim() || !datePart.value || !timePart.value) {
        alert("Please fill in the task, date, and time.");
        return;
    }

    try {
        // datePart = "2025-11-20", timePart = "14:30"
        // Result = "2025-11-20T14:30"
        const combinedDateTime = `${datePart.value}T${timePart.value}`;

        // 2. Convert to ISO 8601 for the backend
        const isoDate = new Date(combinedDateTime).toISOString();

        const res = await fetch(`${apiUrl}/api/v1/todos/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                task: taskInput.value,
                date_due: isoDate,
                completed: false,
            }),
        });

        if (res.ok) {
            // Clear all inputs
            taskInput.value = "";
            datePart.value = "";
            timePart.value = "";
            fetchTodos();
        } else {
            const errorData = await res.json();
            alert(`Error: ${errorData.Msg}`);
        }
    } catch (error) {
        console.error("Error creating todo:", error);
    }
};

onMounted(() => {
    fetchTodos();
});
</script>

<template>
    <div class="p-4 max-w-2xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">Create Todo</h1>
        
        <form @submit.prevent="handleCreateTodo" class="mb-8 bg-gray-50 p-5 rounded-lg shadow-sm max-w-md">
            <div class="mb-3 flex flex-col">
                <label class="text-sm font-bold mb-1 text-gray-600">Task Name</label>
                <input 
                    type="text" 
                    v-model="taskInput" 
                    placeholder="What needs to be done?" 
                    class="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
            </div>

            <div class="flex gap-3">
                <div class="flex-1 flex flex-col mb-3">
                    <label class="text-sm font-bold mb-1 text-gray-600">Date</label>
                    <input 
                        type="date" 
                        v-model="datePart" 
                        required 
                        class="p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                </div>

                <div class="flex-1 flex flex-col mb-3">
                    <label class="text-sm font-bold mb-1 text-gray-600">Time</label>
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
                class="mt-3 w-full p-2.5 bg-gray-800 text-white rounded cursor-pointer text-base hover:bg-gray-700 transition-colors"
            >
                Add Todo
            </button>
        </form>

        <hr class="my-6 border-gray-200" />

        <h1 class="text-2xl font-bold mb-4">My Todos</h1>
        
        <div v-if="loading" class="text-white">
            <p>Loading...</p>
        </div>
        
        <ul v-else class="space-y-2">
            <li v-if="todos.length === 0" class="text-white italic">No todos found.</li>
            
            <li v-for="todo in todos" :key="todo.id" class="flex justify-between items-center border-b border-gray-100 py-2.5">
                <div>
                    <strong class="block text-white">{{ todo.task }}</strong>
                    <small class="text-white">Due: {{ formatDate(todo.date_due) }}</small>
                </div>
                <span class="text-sm font-medium">
                    {{ todo.completed ? "✅ Done" : "⏳ Pending" }}
                </span>
            </li>
        </ul>
    </div>
</template>