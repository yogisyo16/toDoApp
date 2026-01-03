import { ref, onMounted } from "vue";
import type { Todo } from "@/services/todoServices/type";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  toggleTodoComplete,
} from "@/services/todoServices/services";
import { useAlert } from "./useAlert";

export const useTodo = () => {
  const { showSuccess, showError } = useAlert();

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
      showError("Failed to load todos. Please try again.");
    } finally {
      loading.value = false;
    }
  };

  const handleCreateTodo = async (): Promise<boolean> => {
    if (!taskInput.value.trim()) {
      showError("Please fill in the task name.", "Validation Error");
      return false;
    }

    const startDate = new Date(dateStartPart.value);
    const dueDate = new Date(dateDuePart.value);

    if (startDate > dueDate) {
      showError("Start date cannot be after due date.", "Invalid Dates");
      return false;
    }

    try {
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

      taskInput.value = "";
      dateStartPart.value = "";
      dateStartTimePart.value = "";
      dateDuePart.value = "";
      dateDueTimePart.value = "";

      await fetchTodos();
      showSuccess("Todo created successfully!", "Success");

      return true;
    } catch (error: any) {
      console.error("Error creating todo:", error);
      showError(error.message || "Failed to create todo", "Error");
      return false;
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      await fetchTodos();
      showSuccess("Todo deleted successfully!", "Deleted");
      return true;
    } catch (error: any) {
      console.error("Error deleting todo:", error);
      showError(error.message || "Failed to delete todo", "Error");
      return false;
    }
  };

  const handlStatusTodos = async (id: string) => {
    try {
      await toggleTodoComplete(id);
      await fetchTodos();
      showSuccess("Todo status updated!", "Updated");
      return true;
    } catch (error: any) {
      console.error("Error update status:", error);
      showError(error.message || "Failed to update status", "Error");
      return false;
    }
  };

  onMounted(() => {
    fetchTodos();
  });

  return {
    todos,
    taskInput,
    dateStartPart,
    dateStartTimePart,
    dateDuePart,
    dateDueTimePart,
    loading,
    formatDate,
    fetchTodos,
    handleCreateTodo,
    handleDeleteTodo,
    handlStatusTodos,
  };
};
