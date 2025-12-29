const apiUrl = import.meta.env.VITE_API_URL;

export const getTodos = async () => {
  const response = await fetch(`${apiUrl}/api/v1/todos`);
  const data = await response.json();
  return data.data.items || [];
};

export const createTodo = async (todoData: {
  task: string;
  date_due: string;
  completed: boolean;
}) => {
  const response = await fetch(`${apiUrl}/api/v1/todos/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.Msg || "Failed to create todo");
  }

  return await response.json();
};
