import { ref } from "vue";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertOptions {
  title?: string;
  message: string;
  type?: AlertType;
}

const isAlertOpen = ref(false);
const alertTitle = ref("");
const alertMessage = ref("");
const alertType = ref<AlertType>("info");

export const useAlert = () => {
  const showAlert = (options: AlertOptions) => {
    alertTitle.value = options.title || "";
    alertMessage.value = options.message;
    alertType.value = options.type || "info";
    isAlertOpen.value = true;
  };

  const closeAlert = () => {
    isAlertOpen.value = false;
  };

  // Convenience methods
  const showSuccess = (message: string, title?: string) => {
    showAlert({ message, title, type: "success" });
  };

  const showError = (message: string, title?: string) => {
    showAlert({ message, title, type: "error" });
  };

  const showWarning = (message: string, title?: string) => {
    showAlert({ message, title, type: "warning" });
  };

  const showInfo = (message: string, title?: string) => {
    showAlert({ message, title, type: "info" });
  };

  return {
    isAlertOpen,
    alertTitle,
    alertMessage,
    alertType,
    showAlert,
    closeAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
