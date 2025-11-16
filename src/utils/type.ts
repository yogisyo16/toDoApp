export interface Todo {
    id: string;
    task: string;
    completed: boolean;
    created_at: string;
    update_at: string;
};

export interface User {
    id: string;
    name: string;
    email: string;
    created_at: string;
    update_at: string;
}