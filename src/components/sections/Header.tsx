import Navbar from "../custom/Navbar";

interface HeaderProps {
  title: string;
  heabarClassName?: string;
  h1ClassName?: string;
  navClassName?: string;
}

function Header(props: HeaderProps) {
  const { title } = props;
  return (
    <header className="flex justify-between items-center py-8 text-4xl text-gray-600 border-b-2 shadow-md">
      <h1 className="flex-grow text-center">{title}</h1>
      <Navbar />
    </header>
  );
}

export default Header;
