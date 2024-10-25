interface SelectProps {
  name: string;
  id: string;
  className?: string;
  options: string[];
  onSelectedOptionChange: (value: string) => void;
  selectedOption: string;
}

function Select(props: SelectProps) {
  const { name, id, className, options, selectedOption, onSelectedOptionChange } = props;

  return (
    <select
      name={name}
      id={id}
      value={selectedOption}
      onChange={event => onSelectedOptionChange(event.target.value)}
      className={"p-2 focus:outline-none focus:ring-0 focus:border-gray-300 border border-gray-300 rounded-md h-12 " + className}>
      {options.map((option, index) => {
        return (
          <option key={option + index} className="h-10 text-lg" value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}
export default Select;
