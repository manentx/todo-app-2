interface LabelProps {
  title: string;
  className?: string;
}

function Label(props: LabelProps) {
  const { title, className } = props;
  return <label className={"text-xl font-bold " + className}>{title}:</label>;
}

export default Label;
