export interface Todo {
  id: string;
  user_id: string;
  task: string;
  completed: boolean;
  date_start: string;
  date_due: string;
  created_at: string;
  update_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  update_at: string;
}
