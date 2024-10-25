import { RxDashboard as Dashboard } from "react-icons/rx";
import { TbLogin2 as Login } from "react-icons/tb";
import { FaWhatsapp as Whatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="absolute right-10 flex gap-10">
      <Link to="/">
        <Dashboard className="cursor-pointer hover:text-gray-900 text-3xl" />
      </Link>
      <Link to="/login">
        <Login className="cursor-pointer hover:text-gray-900 text-3xl" />
      </Link>
      <Link to="/contact-us">
        <Whatsapp className="cursor-pointer text-[#128c7e] hover:text-gray-900 text-3xl" />
      </Link>
    </nav>
  );
}

export default Navbar;
