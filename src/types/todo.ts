import { Priority } from "./priorityEnum";

const TODO_KEY = "todos";

/*
 * Represents a TODO in this application
 */
interface Todo {
  id: string;
  title: string;
  expireDate: Date;
  done: boolean;
  priority: Priority;
}

/**
 * Function to save all the todos into the localstorage
 * @param todoArray 
 */
export function saveTodos(todoArray: Todo[]): void {
  const toStr = JSON.stringify(todoArray);

  localStorage.setItem(TODO_KEY, toStr);
}

/**
 * Load the todos from the localstorage
 * @returns 
 */
export function loadTodos(): Todo[] {
  const item = localStorage.getItem(TODO_KEY);

  if(item) {
    const todos = JSON.parse(item as string);
    for(const todo of todos) {
      todo.expireDate = new Date(todo.expireDate);
    }

    return todos;
  }

  return [];
}

export default Todo;
