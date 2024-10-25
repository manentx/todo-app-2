import Todo from "../../types/todo";
import Select from "../custom/Select";
import TodoItem from "../custom/TodoItem";
import Label from "../custom/Label";
import { useState } from "react";
import { OrderPolicy } from "../../types/orderPolicyEnum";
import { getPriorityNumber } from "../../types/priorityEnum";

interface TodoListProps {
  className?: string;
  todoArray: Todo[];

  // Pass to the parent, does not actually use it
  onStatusChange: (id: string, status: boolean) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
}

/**
 * Function to sort all the todos based on a specific policy
 * @param todoArray Todo array to sort
 * @param policyToOrder Policy to apply
 * @returns The sorted todo into a new array
 */
function getSortedTodos(todoArray: Todo[], policyToOrder: OrderPolicy): Todo[] {
  if (policyToOrder === OrderPolicy.EXPIRE_DATE) {
    // Logic to order by expire date
    return [...todoArray].sort((a: Todo, b: Todo): number => {
      const expireA = a.expireDate;
      const expireB = b.expireDate;

      if (expireA > expireB) return 1;
      else if (expireA < expireB) return -1;
      return 0;
    });
  } else {
    return [...todoArray].sort((a: Todo, b: Todo): number => {
      const prioA = getPriorityNumber(a.priority);
      const prioB = getPriorityNumber(b.priority);

      if (prioA > prioB) return -1;
      else if (prioA < prioB) return 1;
      return 0;
    });
  }
}

const TodoList = (props: TodoListProps) => {
  const { className, todoArray, deleteTodo, editTodo } = props;
  const [orderPolicy, setOrderPolicy] = useState<OrderPolicy>(OrderPolicy.EXPIRE_DATE);

  return (
    <div className={"h-full text-center w-72 lg:w-96 " + className}>
      <div className="flex flex-col gap-2 items-start w-72 lg:w-96 justify-between">
        <Label title="Order by" />
        <Select
          name="order-select"
          onSelectedOptionChange={(value: string) => {
            setOrderPolicy(value as OrderPolicy);
          }}
          selectedOption={orderPolicy}
          id="order-select"
          className="w-full"
          options={[OrderPolicy.EXPIRE_DATE, OrderPolicy.PRIORITY]}
        />
      </div>
      <div className="my-8">
        <div className="text-m text-gray-500">To be completed</div>
        <div className="w-full overflow-y-auto p-5 mt-8 flex flex-col space-y-7">
          {getSortedTodos(
            todoArray.filter(todo => {
              /*
            if (todo.done === false) return true;
            return false; */
              return !todo.done;
            }),
            orderPolicy
          ).map(todo => {
            return <TodoItem onStatusChange={props.onStatusChange} key={todo.id} todo={todo} deleteTodo={deleteTodo} editTodo={editTodo} />;
          })}
        </div>
      </div>
      <div className="w-full overflow-y-auto p-5 mt-8 flex flex-col space-y-7">
        <div className="text-m text-gray-500 mb-2">Already done</div>
        {getSortedTodos(
          todoArray.filter(todo => {
            /* Intuitive method: 
          if (todo.done === true) return true;
          return false;*/
            return todo.done;
          }),
          orderPolicy
        ).map(todo => {
          return <TodoItem onStatusChange={props.onStatusChange} key={todo.id} todo={todo} deleteTodo={deleteTodo} editTodo={editTodo} />;
        })}
      </div>
    </div>
  );
};

export default TodoList;
