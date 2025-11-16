<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Define the type to match your Go service
type Todo = {
  id: string;
  task: string;
  completed: boolean;
  created_at: string;
  update_at: string;
};

// --- STATE ---
// ref() creates reactive state, similar to useState() in React
const todos = ref<Todo[]>([]);
const taskInput = ref(""); // This will be linked to the input field
const loading = ref(true);

// Get the API URL from the .env file
const apiUrl = import.meta.env.VITE_API_URL;

// --- METHODS ---

// Function to fetch todos
const fetchTodos = async () => {
  try {
    loading.value = true;
    const res = await fetch(`${apiUrl}/api/v1/todos`);
    const data = await res.json();
    todos.value = data || []; // Assign the data to the ref
  } catch (error) {
    console.error("Error fetching todos:", error);
  } finally {
    loading.value = false;
  }
};

// Function to create a new todo
const handleCreateTodo = async () => {
  if (!taskInput.value.trim()) return; // Don't add empty tasks

  try {
    const res = await fetch(`${apiUrl}/api/v1/todos/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: taskInput.value,
        completed: false,
      }),
    });

    if (res.ok) {
      taskInput.value = ""; // Clear the input
      fetchTodos(); // Refresh the todo list
    } else {
      console.error("Failed to create todo");
    }
  } catch (error) {
    console.error("Error creating todo:", error);
  }
};

// --- LIFECYCLE ---
// onMounted() runs code after the component is added to the page
// This is similar to useEffect(..., []) in React
onMounted(() => {
  fetchTodos();
});
</script>

<template>
  <div>
    <h1>Create Todo</h1>
    <form @submit.prevent="handleCreateTodo">
      <input
        type="text"
        v-model="taskInput"
        placeholder="New todo task..."
      />
      <button type="submit">Add Todo</button>
    </form>

    <hr />

    <h1>My Todos</h1>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <ul v-else>
      <li v-if="todos.length === 0">No todos found.</li>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.task }} - {{ todo.completed ? "Done" : "Pending" }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Add your styles here */
form {
  margin-bottom: 1rem;
}
</style>