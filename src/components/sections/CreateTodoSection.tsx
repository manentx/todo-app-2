import Input from "../custom/Input";
import Label from "../custom/Label";
import Select from "../custom/Select";
import { Priority } from "../../types/priorityEnum";
import DatePicker from "../custom/DatePicker";
import Button from "../custom/Button";
import Todo from "../../types/todo";
import { v4 as uuid } from "uuid";

interface Props {
  todo: Todo;
  setTodo: React.Dispatch<React.SetStateAction<Todo>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const CreateTodoSection = (props: Props) => {
  const { todo, setTodo, setTodos } = props;

  const onCreateTodoClick = () => {
    if (todo.id !== "") {
      // update
      setTodos(prevState => {
        return prevState.map(todoElement => {
          if (todoElement.id === todo.id) {
            return {
              ...todo
            };
          } else {
            return todoElement;
          }
        });
      });
    } else {
      // create
      setTodos(prevState => {
        return [
          ...prevState,
          {
            ...todo,
            id: uuid()
          }
        ];
      });
    }

    //clear todo
    setTodo({
      id: "",
      title: "",
      expireDate: new Date(),
      priority: Priority.HIGH,
      done: false
    });
  };

  const setValueGlobally = (field: string, value: string | Date | Priority) => {
    setTodo(prevState => {
      return {
        ...prevState,
        [field]: value
      };
    });
  };

  const setValueGloballyByType = <T extends keyof Todo>(field: T, value: Todo[T]) => {
    setTodo(prevState => {
      return {
        ...prevState,
        [field]: value
      };
    });
  };

  return (
    <div className="h-full flex flex-col gap-3 justify-start items-center">
      <div className="flex flex-col gap-2 items-start w-72 lg:w-96 justify-between">
        <Label title="Todo" />
        <Input placeholder="Insert your todo" className="w-full" value={todo.title} setValue={value => setValueGlobally("title", value)} />
      </div>
      <div className="flex flex-col gap-2 items-start w-72 lg:w-96 justify-between">
        <Label title="Priority" />
        <Select
          selectedOption={todo.priority as string}
          onSelectedOptionChange={value => setValueGloballyByType("priority", value as Priority)}
          name="Priority"
          id="priority"
          className="w-full"
          options={[Priority.HIGH, Priority.MEDIUM, Priority.LOW]}
        />
      </div>
      <div className="flex flex-col gap-2 items-start w-72 lg:w-96 justify-between">
        <Label title="Data" />
        <DatePicker className="w-full" value={todo.expireDate} setValue={value => setValueGlobally("expireDate", value)} />
      </div>
      <Button
        disabled={todo.title.trim().length >= 4 ? false : true}
        title={(todo.id ? "Edit " : "Add ") + "todo"}
        className="w-72 lg:w-96 mt-5"
        onClick={onCreateTodoClick}>
        test
      </Button>
    </div>
  );
};

export default CreateTodoSection;
