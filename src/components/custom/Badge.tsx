import {Priority} from "../../types/priorityEnum";

interface BadgeProps {
  priority: Priority;
  className?: string;
}

function Badge(props: BadgeProps) {
  const { priority } = props;
  const getPillBackground = (priority: Priority): string => {
    switch (priority) {
      case Priority.HIGH:
        return "bg-red-500 text-white";
      case Priority.MEDIUM:
        return "bg-yellow-500 text-white";
      case Priority.LOW:
        return "bg-blue-500 text-white";
        default:
          return "";
    }
  };
  return <div className={"absolute -top-4 -right-2 py-1 px-2 text-sm rounded-lg text-center " + getPillBackground(priority)}>{priority}</div>;
}

export default Badge;
