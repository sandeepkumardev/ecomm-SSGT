import { useEffect } from "react";
import Layout from "../components/Layout";
import withAuth from "../components/withAuth";
import { useState } from "react";

const Orders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (id, status) => {
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/admin/order/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();

      if (!data.success) {
        alert(data.error || "Something went wrong!");
        return;
      }

      setData((prev) =>
        prev.map((item) => {
          if (item._id === id) {
            return { ...item, status };
          }
          return item;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-gray-200 text-gray-500";
      case "shipped":
        return "bg-blue-200 text-black";
      case "delivered":
        return "bg-green-100 text-green-500";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-200 text-gray-500";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = import.meta.env.VITE_SERVER_URL;
        const res = await fetch(`${url}/admin/order`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();

        if (!data.success) {
          alert(data.error || "Something went wrong!");
          return;
        }

        setData(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="flex justify-between items-center p-3 border-b border-gray-300 h-[50px] select-none">
        <h1 className="font-bold">Orders</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order No.
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((order) => (
              <tr key={order._id} className="border border-x-0 border-gray-300">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.orderNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex flex-col">
                  <span>{order.user.name}</span>
                  <span>{order.user.email}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getOrderStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.totalAmount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select defaultValue={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default withAuth(Orders);
