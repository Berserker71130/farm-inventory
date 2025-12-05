import { Suspense, useEffect, useState } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SalesChart from "./SalesChart";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [recentSales, setRecentSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("userToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      };
      const dashboardStatsUrl =
        "http://localhost:3000/api/v1/reports/dashboard";
      const recentSalesUrl =
        "http://localhost:3000/api/v1/reports/recent-sales/";

      try {
        const statsResponse = await fetch(dashboardStatsUrl, { headers });
        if (!statsResponse.ok) {
          throw new Error(`Failed to fetch stats: ${statsResponse.status}`);
        }
        const statsData = await statsResponse.json();
        setDashboardData(statsData);

        const salesResponse = await fetch(recentSalesUrl, { headers });
        if (!salesResponse.ok) {
          throw new Error(
            `Failed to fetch recent sales: ${salesResponse.status}`
          );
        }
        const salesData = await salesResponse.json();
        if (Array.isArray(salesData)) {
          setRecentSales(salesData);
        } else {
          console.error("Fetched sales data is not an array:", salesData);
          setRecentSales([]);
        }
      } catch (err) {
        setError(err.message);
        toast.error("Failed to fetch dashboard data.");
        console.error("Error fetching dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div>
        <div className="text-center p-10">Loading Dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="text-center p-10 text-red-600">Error:{error}</div>
      </div>
    );
  }
  return (
    <div>
      <div className="bg-gray-100 space-y-8">
        <div className="flex flex-1 w-full justify-center">
          <main className="p-6 w-full max-w-screen-xl lg:max-w-screen-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* First Card */}
              <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Total Amount
                </h3>
                <div className="text-3xl font-bold text-gray-900 flex items-center justify-between">
                  {dashboardData?.totalAmount?.toLocaleString() ?? "N/A"}
                  {""}
                  <span className="flex items-center text-sm font-semibold text-blue-500 bg-blue-200 px-2 py-1 rounded-full">
                    <FiTrendingUp size={16} className="mr-1" />
                    {dashboardData?.totalAmountPercentage?.toFixed(1) ?? "N/A"}%
                  </span>
                </div>
                <p className="text-sm mt-1 text-gray-500">
                  You made an extra{" "}
                  <span className="text-blue-500 font-bold">
                    {dashboardData?.extraAmount?.toLocaleString() ?? "N/A"}
                  </span>{" "}
                  this year
                </p>
              </div>

              {/* Second card */}
              <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Total Customers
                </h3>
                <div className="text-3xl font-bold text-gray-900 flex items-center justify-between">
                  {dashboardData?.totalAmount?.toLocaleString() ?? "N/A"}
                  {""}
                  <span className="flex items-center text-sm font-semibold text-green-500 bg-green-200 px-2 py-1 rounded-full">
                    <FiTrendingUp size={16} className="mr-1" />
                    {dashboardData?.totalAmountPercentage?.toFixed(1) ?? "N/A"}%
                  </span>
                </div>
                <p className="text-sm mt-1 text-gray-500">
                  You made an extra{" "}
                  <span className="text-green-500 font-bold">
                    {dashboardData?.extraAmount?.toLocaleString() ?? "N/A"}
                  </span>{" "}
                  this year
                </p>
              </div>

              {/* Third card */}
              <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Total KG
                </h3>
                <div className="text-3xl font-bold text-gray-900 flex items-center justify-between">
                  {dashboardData?.totalAmount?.toLocaleString() ?? "N/A"}
                  {""}
                  <span className="flex items-center text-sm font-semibold text-red-500 bg-red-200 px-2 py-1 rounded-full">
                    <FiTrendingDown size={16} className="mr-1" />
                    {dashboardData?.totalAmountPercentage?.toFixed(1) ?? "N/A"}%
                  </span>
                </div>
                <p className="text-sm mt-1 text-gray-500">
                  You made an extra{" "}
                  <span className="text-red-500 font-bold">
                    {dashboardData?.extraAmount?.toLocaleString() ?? "N/A"}
                  </span>{" "}
                  this year
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Total Sales
                </h3>
                <div className="text-3xl font-bold text-gray-900 flex items-center justify-between">
                  ₦{dashboardData?.totalSales?.toLocaleString() ?? "N/A"}
                  {""}
                  <span className="flex items-center text-sm font-semibold text-indigo-500 bg-indigo-200 px-2 py-1 rounded-full">
                    <FiTrendingDown
                      className="inline-block mr-1 text-indigo-500 align-middle"
                      size={16}
                    />
                    {dashboardData?.totalSalesPercentage?.toFixed(1) ?? "N/A"}%
                  </span>
                </div>
                <p className="text-indigo-500 text-sm">
                  You made an extra{" "}
                  <span className="text-yellow-500 font-bold">
                    {dashboardData?.extraSales?.toLocaleString() ?? "N/A"}
                  </span>{" "}
                  this year
                </p>
              </div>
            </div>

            {/* Recent Sales Section */}

            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-4 mt-4">
                Recent Sales
              </h2>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="py-3 px-6 font-semibold text-gray-600">
                          CUSTOMER
                        </th>
                        <th className="py-3 px-6 font-semibold text-gray-600">
                          KIT NO
                        </th>
                        <th className="py-3 px-6 font-semibold text-gray-600">
                          NO. OF KG
                        </th>
                        <th className="py-3 px-6 font-semibold text-gray-600">
                          PRICE PER KG
                        </th>
                        <th className="py-3 px-6 font-semibold text-gray-600">
                          TOTAL AMOUNT
                        </th>
                        <th className="py-3 px-6 font-semibold text-gray-600">
                          DATE
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {recentSales.length > 0 ? (
                        recentSales.map((sale, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-100 transition duration-150"
                          >
                            <td className="py-3 px-6 text-sm text-gray-800">
                              {sale.customerName}
                            </td>
                            <td className="py-3 px-6 text-sm text-gray-800">
                              {sale.kitNo}
                            </td>
                            <td className="py-3 px-6 text-sm text-gray-800">
                              {sale.kg ?? sale.noOfKg}
                            </td>
                            <td className="py-3 px-6 text-sm text-gray-800">
                              ₦{sale.pricePerKg?.toLocaleString()}
                            </td>
                            <td className="py-3 px-6 text-sm font-medium text-gray-900">
                              ₦{sale.totalAmount?.toLocaleString()}
                            </td>
                            <td className="py-3 px-6 text-sm text-gray-500">
                              {new Date(sale.date).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="6"
                            className="py-10 text-center text-gray-500"
                          >
                            No Recent Sales To Display
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-xl shadow-lg p-6 h-80 flex items-center justify-center border border-gray-200">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-full">
                      Analyzing Trends...
                    </div>
                  }
                >
                  {recentSales.length > 0 ? (
                    <SalesChart data={recentSales} />
                  ) : (
                    <div className="text-gray-400">
                      No Data Available For Chart
                    </div>
                  )}
                </Suspense>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 h-80 flex items-center justify-center border border-gray-200">
                Inventory Alerts Placeholder
              </div>
            </section>
          </main>
        </div>
        <footer className="bg-grey-200 py-4 px-6 text-center text-gray-500 text-sm">
          Copyright © Sohclick Technology Ltd |
          <a href="#" className="hover:underline">
            Home
          </a>{" "}
          |{" "}
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="#" className="hover:underline">
            Contact us
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
