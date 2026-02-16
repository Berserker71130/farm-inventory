import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerType, setCustomerType] = useState("INDIVIDUAL");
  const [customerEdit, setCustomerEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const totalPages = 5;
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchCustomers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(
        `${API_URL}/api/v1/customers/pagination?page=${page}&size=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status:${response.status}`);
      }

      const data = await response.json();
      if (data && Array.isArray(data.content)) {
        setCustomers(data.content);
      } else {
        setCustomers([]);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error during fetch operation:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page]); // dependency array is correct

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };
  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setPage(pageNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: customerName,
      email,
      phoneNumber,
      customerType,
    };

    const url = customerEdit
      ? `${API_URL}/api/v1/customers/${customerEdit.id}`
      : `${API_URL}/api/v1/customers`;
    const method = customerEdit ? "PUT" : "POST";

    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      await fetchCustomers();
    } catch (err) {
      console.error(err);
    }

    setCustomerName("");
    setEmail("");
    setPhoneNumber("");
    setCustomerType("INDIVIDUAL");
    setCustomerEdit(null);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(`${API_URL}/api/v1/customers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      await fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (customer) => {
    setCustomerEdit(customer);
    setCustomerName(customer.name);
    setEmail(customer.email);
    setPhoneNumber(customer.phoneNumber);
    setCustomerType(customer.customerType);
  };

  return (
    <div className="bg-gray-50 min-h-screen space-y-8 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-1">
            <Link
              to="/"
              className="text-indigo-600 hover:text-indigo-800 transition"
            >
              Home
            </Link>{" "}
            <span className="mx-2 text-gray-500">{">"}</span>{" "}
            <span className="font-semibold text-gray-800">Customers</span>
          </div>
          <h2 className="text-2xl font-bold mt-2 mb-4 text-gray-900">
            Customer Management
          </h2>
        </div>

        <div className="mb-6 p-4 bg-white rounded-xl shadow-lg flex items-center border border-gray-200">
          <FaSearch className="w-5 h-5 text-gray-400 mr-3" />
          <label htmlFor="customerSearch" className="sr-only">
            Search Customers
          </label>
          <input
            type="text"
            placeholder="Search Customers..."
            id="customerSearch"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow border-none focus:ring-0 text-gray-700 placeholder-gray-400 outline-none"
          />
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8 border border-gray-100">
          <form onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
              {customerEdit ? "Update Customer Details" : "Add New Customer"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Customer Name
                </label>
                <input
                  type="text"
                  id="customerName"
                  autoComplete="name"
                  placeholder="Enter Customer Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="block outline-none w-full border border-gray-300 rounded-lg py-2.5 px-3 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm transition duration-150"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Customer Email"
                  className="block outline-none w-full border border-gray-300 rounded-lg py-2.5 px-3 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm transition duration-150"
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter Phone Number"
                  className="block w-full outline-none border border-gray-300 rounded-lg py-2.5 px-3 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm transition duration-150"
                />
              </div>
              <div>
                <label
                  htmlFor="customerType"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Customer Type
                </label>
                <select
                  id="customerType"
                  value={customerType}
                  onChange={(e) => setCustomerType(e.target.value)}
                  className="outline-none block w-full border border-gray-300 rounded-lg py-2.5 px-3 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm transition duration-150"
                >
                  <option value="" disabled hidden>
                    Select Customer Type
                  </option>
                  <option value="INDIVIDUAL">INDIVIDUAL</option>
                  <option value="GROUP">GROUP</option>
                  <option value="ORGANIZATION">ORGANIZATION</option>
                </select>
              </div>
              <div className="col-span-full flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-lg transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg"
                >
                  {customerEdit ? "Update Record" : "Save Record"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Table of customers */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Customer</th>
                  <th>Phone Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-10 text-center text-indigo-600 font-medium"
                    >
                      Loading Customers...
                    </td>
                  </tr>
                ) : customers.length > 0 ? (
                  customers.map((customer, index) => (
                    <tr
                      key={customer.id}
                      className="even:bg-gray-50 hover:bg-indigo-50 transition duration-150"
                    >
                      <td>{index + 1}</td>
                      <td className="font-mono text-gray-500">{customer.id}</td>
                      <td className="font-medium">{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            customer.customerType === "ORGANIZATION"
                              ? "bg-blue-100 text-blue-800"
                              : customer.customerType === "GROUP"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {customer.customerType || "INDIVIDUAL"}
                        </span>
                      </td>
                      <td>{customer.phoneNumber}</td>
                      <td className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEdit(customer)}
                          title="Edit Customer"
                        >
                          <FiEdit className="cursor-pointer text-indigo-600 hover:text-indigo-800 h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id)}
                          title="Delete Customer"
                        >
                          <FiTrash2 className="cursor-pointer text-red-600 hover:text-red-800 h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-10 text-center text-gray-500">
                      No Customers Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
