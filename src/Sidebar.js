import { Link } from "react-router-dom";
import {
  FiClock,
  FiUsers,
  FiTrendingUp,
  FiTrendingDown,
  FiSettings,
} from "react-icons/fi";

const Sidebar = ({ className }) => {
  return (
    <aside className={`p-4 flex flex-col justify-between rounded-lg ${className}`}>
      <nav className="flex-1">
        <ul className="list-none p-0">
          <li className="mb-2">
            <span className="text-xl font-bold">DASHBOARD</span>
            <ul className="list-none p-0 ml-2">
              <li className="rounded-md bg-blue-50 text-gray-700 font-semibold">
                <Link
                  to="/"
                  className="block py-2 px-4 hover:text-blue-500 font-semibold flex items-center"
                >
                  <FiClock className="h-5 w-5 mr-2" /> Dashboard
                </Link>
              </li>
            </ul>
          </li>

          <li className="mb-2">
            <span className="block py-2 pl-0 text-white font-semibold text-sm">
              Form Management
            </span>
          </li>

          <li className="mb-2">
            <Link
              to="/customers"
              className="text-white block py-2 px-3 rounded hover:text-blue-400 flex items-center font-semibold"
            >
              <FiUsers className="h-5 w-5 mr-2" /> Customers
            </Link>
          </li>

          <li className="mb-2">
            <Link
              to="/income"
              className="text-white block py-2 px-4 hover:text-blue-500 font-semibold flex items-center"
            >
              <FiTrendingUp className="h-5 w-5 mr-2" /> Income
            </Link>
          </li>

          <li className="mb-2">
            <Link
              to="/expenses"
              className="text-white block py-2 px-4 hover:text-blue-500 font-semibold flex items-center"
            >
              <FiTrendingDown className="h-5 w-5 mr-2" /> Expenses
            </Link>
          </li>

          <li className="mb-2">
            <span className="block py-2 pl-0 text-white font-semibold text-sm">
              Reports
            </span>
          </li>

          <li className="mb-2">
            <Link
              to="/dashboard/upload-excel"
              className="text-white block py-2 px-4 hover:text-blue-500 font-semibold flex items-center"
            >
              <FiSettings className="h-5 w-5 mr-2" /> Sales Expenses
            </Link>
          </li>

          <li className="mb-2">
            <span className="block py-2 pl-0 text-white font-semibold text-sm">
              Uploads
            </span>
          </li>

          <li className="mb-2">
            <Link
              to="/upload-expenses"
              className="text-white block py-2 px-4 hover:text-blue-500 font-semibold flex items-center"
            >
              <FiSettings className="h-5 w-5 mr-2" /> Upload Expenses
            </Link>
          </li>

          <li className="mb-2">
            <Link
              to="/upload-excel"
              className="text-white block py-2 px-4 hover:text-blue-500 font-semibold flex items-center"
            >
              <FiSettings className="h-5 w-5 mr-2" /> Upload Income
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
