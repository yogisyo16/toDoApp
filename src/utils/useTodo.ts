import { ref, onMounted } from "vue";
import type { Todo } from "@/services/todoServices/type";
import { getTodos, createTodo } from "@/services/todoServices/services";

export const useTodo = () => {
  // State
  const todos = ref<Todo[]>([]);
  const taskInput = ref("");
  const datePart = ref("");
  const timePart = ref("");
  const loading = ref(true);
  const finishTodos = ref(false);

  // Methods
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString();
  };

  const fetchTodos = async () => {
    try {
      loading.value = true;
      todos.value = await getTodos();
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      loading.value = false;
    }
  };

  const handleCreateTodo = async () => {
    // Validation
    if (!taskInput.value.trim() || !datePart.value || !timePart.value) {
      alert("Please fill in the task, date, and time.");
      return;
    }

    try {
      // Combine date and time
      const combinedDateTime = `${datePart.value}T${timePart.value}`;
      const isoDate = new Date(combinedDateTime).toISOString();

      await createTodo({
        task: taskInput.value,
        date_due: isoDate,
        completed: false,
      });

      // Clear inputs
      taskInput.value = "";
      datePart.value = "";
      timePart.value = "";

      // Refresh todos
      await fetchTodos();
    } catch (error: any) {
      console.error("Error creating todo:", error);
      alert(`Error: ${error.message}`);
    }
  };

  // Initialize
  onMounted(() => {
    fetchTodos();
  });

  return {
    // State
    todos,
    taskInput,
    datePart,
    timePart,
    loading,
    finishTodos,

    // Methods
    formatDate,
    fetchTodos,
    handleCreateTodo,
  };
};
