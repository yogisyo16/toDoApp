import { ref, onMounted } from "vue";
import type { Todo } from "@/services/todoServices/type";
import { getTodos, createTodo } from "@/services/todoServices/services";

export const useTodo = () => {
  // State
  const todos = ref<Todo[]>([]);
  const taskInput = ref("");
  const dateStartPart = ref("");
  const dateStartTimePart = ref("");
  const dateDuePart = ref("");
  const dateDueTimePart = ref("");
  const loading = ref(true);

  // Methods
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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

  const handleCreateTodo = async (): Promise<boolean> => {
    // Validation - only task and dates are required
    if (!taskInput.value.trim() || !dateStartPart.value || !dateDuePart.value) {
      alert("Please fill in the task name, start date, and due date.");
      return false; // Return false on validation failure
    }

    // Date validation - start must be before or equal to due
    const startDate = new Date(dateStartPart.value);
    const dueDate = new Date(dateDuePart.value);

    if (startDate > dueDate) {
      alert("Start date cannot be after due date. Please check your dates.");
      return false; // Return false on validation failure
    }

    try {
      // If time is provided, send full datetime; otherwise just send date
      const dateStart = dateStartTimePart.value
        ? `${dateStartPart.value}T${dateStartTimePart.value}:00Z`
        : dateStartPart.value;

      const dateDue = dateDueTimePart.value
        ? `${dateDuePart.value}T${dateDueTimePart.value}:00Z`
        : dateDuePart.value;

      await createTodo({
        task: taskInput.value,
        date_start: dateStart,
        date_due: dateDue,
        completed: false,
      });

      // Clear inputs only on success
      taskInput.value = "";
      dateStartPart.value = "";
      dateStartTimePart.value = "";
      dateDuePart.value = "";
      dateDueTimePart.value = "";

      // Refresh todos
      await fetchTodos();

      return true; // Return true on success
    } catch (error: any) {
      console.error("Error creating todo:", error);
      alert(`Error: ${error.message}`);
      return false; // Return false on error
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
    dateStartPart,
    dateStartTimePart,
    dateDuePart,
    dateDueTimePart,
    loading,

    // Methods
    formatDate,
    fetchTodos,
    handleCreateTodo,
  };
};
