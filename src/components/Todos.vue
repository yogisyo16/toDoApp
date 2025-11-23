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
    <div>
        <h1>Create Todo</h1>
        <form @submit.prevent="handleCreateTodo" class="create-form">
            <div class="form-group">
                <label>Task Name</label>
                <input 
                    type="text" 
                    v-model="taskInput" 
                    placeholder="What needs to be done?" 
                    class="full-width"
                />
            </div>

            <div class="datetime-row">
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" v-model="datePart" required />
                </div>

                <div class="form-group">
                    <label>Time</label>
                    <input type="time" v-model="timePart" required />
                </div>
            </div>
            
            <button type="submit" class="submit-btn">Add Todo</button>
        </form>

        <hr />

        <h1>My Todos</h1>
        <div v-if="loading">
            <p>Loading...</p>
        </div>
        <ul v-else>
            <li v-if="todos.length === 0">No todos found.</li>
            <li v-for="todo in todos" :key="todo.id" class="todo-item">
                <div>
                    <strong>{{ todo.task }}</strong>
                    <br />
                    <small style="color: gray;">Due: {{ formatDate(todo.date_due) }}</small>
                </div>
                <span>{{ todo.completed ? "✅ Done" : "⏳ Pending" }}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.create-form {
    max-width: 400px;
    margin-bottom: 2rem;
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
}

.form-group {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
}

.form-group label {
    font-size: 0.85rem;
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
}

/* Inputs styling */
input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
}

/* Layout for Date and Time side-by-side */
.datetime-row {
    display: flex;
    gap: 10px;
}

.datetime-row .form-group {
    flex: 1; /* Makes them equal width */
}

.full-width {
    width: 100%;
    box-sizing: border-box; /* Ensures padding doesn't break width */
}

.submit-btn {
    margin-top: 10px;
    width: 100%;
    padding: 10px;
    background-color: #2f2f30;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
}

.todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
}
</style>