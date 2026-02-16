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

  const fetchCustomers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(
        `http://localhost:3000/api/v1/customers/pagination?page=${page}&size=10`,
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

      // const data = await response.json();
      // console.log("API Response:", data);
      const data = await response.json();
      console.log("🔥 FULL API RESPONSE:", data);

      if (data && Array.isArray(data.content)) {
        setCustomers(data.content);
      } else {
        console.error("Fetched data is not in expected format:", data);
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
  }, [page]);

  const handleNext = () => {
    if (page < 5) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerPayload = {
      name: customerName,
      email: email,
      phoneNumber: phoneNumber,
      customerType: customerType,
    };

    let url = "";
    let method = "";

    if (customerEdit) {
      url = `http://localhost:3000/api/v1/customers/${customerEdit.id}`;
      method = "PUT";
    } else {
      url = "http://localhost:3000/api/v1/customers";
      method = "POST";
    }

    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(customerPayload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchCustomers();
    } catch (error) {
      console.error(
        `Error ${customerEdit ? "updating" : "creating"} customer:`,
        error,
      );
    }

    setCustomerName("");
    setEmail("");
    setPhoneNumber("");
    setCustomerType("INDIVIDUAL");
    setCustomerEdit(null);
  };

  const handleDelete = async (idToDelete) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/customers/${idToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchCustomers();
      console.log(`Customer with ID ${idToDelete} deleted successfully.`);
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  };

  const handleEdit = (customerToEdit) => {
    setCustomerEdit(customerToEdit);
    setCustomerName(customerToEdit.name);
    setEmail(customerToEdit.email);
    setPhoneNumber(customerToEdit.phoneNumber);
    setCustomerType(customerToEdit.customerType);
  };

  const [searchTerm, setSearchTerm] = useState("");

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
        {/* Customer Form */}
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
              </div>{" "}
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
                  onChange={(e) => {
                    setCustomerType(e.target.value);
                  }}
                  className="outline-none block w-full border border-gray-300 rounded-lg py-2.5 px-3 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm transition duration-150"
                >
                  <option value="" disabled hidden>
                    Select Customer Type
                  </option>
                  <option value={"INDIVIDUAL"}>INDIVIDUAL</option>
                  <option value={"GROUP"}>GROUP</option>
                  <option value={"ORGANIZATION"}>ORGANIZATION</option>
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
        {/* Table Cards */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    #
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Phone Number
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                        {customer.id}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
                        {customer.name}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {customer.email}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            customer.customerType === "ORGANIZATION"
                              ? "bg-blue-100 text-blue-800"
                              : customer.customerType === "GROUP"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800 "
                          }`}
                        >
                          {customer.customerType || "INDIVIDUAL"}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {customer.phoneNumber}
                      </td>

                      <td className="px-6 py-4 whitespace-none text-sm text-gray-600 flex items-center space-x-3">
                        <button
                          onClick={() => handleEdit(customer)}
                          title="Edit Customer"
                        >
                          <FiEdit className="cursor-pointer text-indigo-600 hover:text-indigo-800 h-5 w-5 transition duration-150" />
                        </button>

                        <button
                          onClick={() => handleDelete(customer.id)}
                          title="Delete Customer"
                        >
                          <FiTrash2 className="cursor-pointer text-red-600 hover:text-red-800 h-5 w-5 transition duration-150" />
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

        {/* Pagination Controls */}
        <div className="flex items-center justify-between border-t border-gray-200  bg-white px-4 py-3 sm:px-6 rounded-b-xl shadow-inner">
          <div className="flex flex-1 items-center justify-between">
            {/* Left side  */}
            <div>
              <p className="text-sm text-gray-700 ">
                Showing page <span className="font-medium">{page}</span> of{" "}
                <span className="font-medium">{totalPages}</span>
              </p>
            </div>

            {/* Right Side */}
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                {/* Previous arrow button */}
                <button
                  onClick={handlePrevious}
                  disabled={page === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 transition"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5 "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 010 1.06L9.56 10l3.23 3.71a.75.75 0 01-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Dynamic page buttons */}
                {[...Array(totalPages).keys()].map((index) => {
                  const pageNumber = index + 1;
                  const isActive = pageNumber === page;

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold
                    ${
                      isActive
                        ? "bg-indigo-600 text-white focus:outline-none focus:z-20"
                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20"
                    }
                    focus:outline-offset-0 transition`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {/* Next arrow button */}
                <button
                  onClick={handleNext}
                  disabled={page === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 transition"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 010-1.06L10.44 10 7.21 6.29a.75.75 0 011.06-1.06l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 01-1.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>

        <footer className="py-4 text-center text-gray-500 text-xs mt-8 border-t border-gray-200">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {" "}
            <span>Copyright © Sohclick Technology Ltd</span>
            <div>
              <Link to="/" className="mr-4 hover:underline transition">
                Home
              </Link>
              <a href="/privacy" className="mr-4 hover:underline transition">
                Privacy
              </a>
              <a href="/contact" className="hover:underline transition">
                Contact Us
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Customers;
