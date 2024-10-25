import { useEffect, useState } from "react";
import CreateTodoSection from "../components/sections/CreateTodoSection";
import Header from "../components/sections/Header";
import TodoList from "../components/sections/TodoList";
import Todo, { loadTodos, saveTodos } from "../types/todo";
import { Priority } from "../types/priorityEnum";

function Dashboard() {
  const [todo, setTodo] = useState<Todo>({
    id: "",
    title: "",
    expireDate: new Date(),
    priority: Priority.HIGH,
    done: false
  });

  const [todos, setTodos] = useState<Todo[]>(loadTodos());

  useEffect(() => {
    console.log("The todo list has changed. ", todos);

    saveTodos(todos);
  }, [todos]);

  /**
   * Function to handle when a todo status gets changed by the user
   *
   * @param creationDate Useful to uniquely identify a todo
   * @param status The new status of the todo
   */
  const handleChildTodoStatusChange = (id: string, status: boolean) => {
    // Create a clone of the array to edit
    let todosClone = [...todos];
    for (const todo of todosClone) {
      if (todo.id === id) {
        // This is the right element to edit
        todo.done = status;
      }
    }

    setTodos(todosClone);
  };

  const deleteTodo = (id: string) => {
    setTodos(prevState => {
      return prevState.filter(todo => todo.id !== id);
    });
  };

  const editTodo = (id: string) => {
    const foundTodo = todos.find(todo => todo.id === id);
    if (foundTodo === undefined) {
      alert("Todo not found");
      return;
    }
    setTodo({ ...foundTodo });
  };

  return (
    <div className="grid grid-rows-12 h-screen">
      <Header title="Dashboard" />
      <h1 className="text-4xl text-center mt-3">Simple Todo List</h1>
      <main className="row-span-10 flex sm:flex-col sm:items-center md:flex-row gap-4 justify-between items-start w-4/6 max-w-[900px] mx-auto relative">
        <CreateTodoSection setTodos={setTodos} todo={todo} setTodo={setTodo} />
        <TodoList onStatusChange={handleChildTodoStatusChange} todoArray={todos} deleteTodo={deleteTodo} editTodo={editTodo} />
      </main>
    </div>
  );
}

export default Dashboard;
