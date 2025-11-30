const apiUrl = import.meta.env.VITE_API_URL;

export const getTodos = async () => {
    const response = await fetch(`${apiUrl}/todos`);
    return await response.json();
};

export const createTodo = async (todoData: { user_id: string; task: string; date_due: string; }) => {
    const response = await fetch(`${apiUrl}/todos/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
    });
    return await response.json();
};