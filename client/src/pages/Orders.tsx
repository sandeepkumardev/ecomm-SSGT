import withAuth from "@/components/shared/withAuth";
import { Card } from "@/components/ui/card";
import { url } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${url}/user/order`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setOrders(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-3 max-w-7xl mx-auto">Loading...</div>;

  return (
    <div className="p-3 max-w-7xl mx-auto">
      <h1 className="text-xl font-semibold my-3">All Orders</h1>

      {orders && orders.length === 0 && <p>Orders is empty</p>}
      <div className="flex gap-2 flex-col">
        {orders &&
          orders.map((order: any) => (
            <Card className="p-4 gap-1" key={order._id}>
              <div className="flex items-center justify-between gap-2">
                <p className="">
                  ID:{" "}
                  <Link to={`/order/${order._id}`} className="font-semibold">
                    #{order.orderNo}
                  </Link>
                </p>
                <p className="">
                  Status: <span className="font-semibold capitalize">{order.status}</span>
                </p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p>
                  Total Items: <span className="font-semibold">{order.orderItems.length}</span>
                </p>
                <p className="">
                  Amount: <span className="font-semibold">₹{order.totalAmount}</span>
                </p>
              </div>
              <p>
                Date: <span className="font-semibold">{order.createdAt.split("T")[0]}</span>
              </p>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default withAuth(Orders);
