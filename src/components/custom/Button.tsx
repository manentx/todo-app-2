interface ButtonProps {
  children?: string;
  title: string;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button(props: ButtonProps) {
  const { title, className, onClick, disabled } = props;

  return (
    <button
      disabled={disabled}
      className={"px-4 py-2 text-gray-50 bg-blue-500 rounded-lg text-lg hover:bg-blue-600 disabled:bg-slate-400 " + className}
      onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
