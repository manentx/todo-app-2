interface DatePickerProps {
  value: Date;
  setValue: (value: Date) => void;
  className?: string;
}

const DatePicker = (props: DatePickerProps) => {
  const { value, setValue, className } = props;
  return (
    <input
      type="date"
      className={"text-lg h-12 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-gray-300 border border-gray-300 " + className}
      value={value.toISOString().split("T")[0]}
      onChange={event => {
        const value = event.target.value;
        setValue(new Date(value));
      }}
    />
  );
};

export default DatePicker;
