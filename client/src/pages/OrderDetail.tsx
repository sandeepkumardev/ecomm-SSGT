import { Card } from "@/components/ui/card";
import { url } from "@/lib/utils";
import type { IOrder } from "@/types";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const OrderDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<IOrder | null>(null);

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${url}/user/order/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (!data.success) {
          toast.error(data.error || "failed to load info!");
          return;
        }

        setData(data.data);
      } catch (error) {
        console.log(error);
        toast.error("failed to load info!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>loading order detials</div>;
  }

  if (!data) {
    return <div>order not found!</div>;
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "outline";
      case "paid":
        return "success";
      case "failed":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getOrderStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-200 text-gray-500";
      case "shipped":
        return "bg-blue-200 text-black";
      case "delivered":
        return "bg-green-200 text-black";
      case "canceled":
        return "bg-red-200 text-black";
      default:
        return "bg-gray-200 text-gray-500";
    }
  };

  return (
    <div className="p-3 max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold my-3">Order Detail</h1>

      <Card className="p-4 gap-2 mb-5 flex md:flex-row justify-between">
        <div>
          <h1 className="text-lg font-semibold">Order Info</h1>
          <p className="text-sm">
            Order Id: <span className="font-semibold">{data._id}</span>
          </p>
          <p className="text-sm">
            Order Date: <span className="font-semibold">{data.createdAt}</span>
          </p>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Order Status</h1>
          <Badge className={`${getOrderStatusClass(data.status)} uppercase`}>{data.status}</Badge>
        </div>
      </Card>

      <div className="flex gap-2">
        <div className="flex-1 flex flex-col gap-2">
          {data.orderItems.map((item) => (
            <Card key={item._id} className="p-4 gap-2">
              {/* <img src={item.product.images[0].url} alt="" /> */}
              <h1 className="text-lg font-semibold line-clamp-2">{item.product.title}</h1>
              <div className="flex justify-between items-center">
                <p className="text-sm">Price: ₹{item.product.price}</p>
                <p className="text-sm">Quantity: {item.quantity}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="w-[250px] flex flex-col gap-4 ">
          <Card className="p-4 gap-2">
            <h1 className="text-lg font-semibold">Payment Info</h1>
            <p className="text-sm">
              Payment Mode: <span className="font-semibold">{data.paymentMethod}</span>
            </p>
            <p className="text-sm">
              Status:{" "}
              <Badge variant={getStatusVariant(data.paymentStatus)} className="font-semibold uppercase">
                {data.paymentStatus || "pending"}
              </Badge>
            </p>
          </Card>
          <Card className="p-4 gap-2">
            <h1 className="text-lg font-semibold">Order Summary</h1>
            {/* <p className="text-sm">
                Subtotal: <span className="font-semibold">₹{data.totalPrice}</span>
              </p>
              <p className="text-sm">
                Discount: <span className="font-semibold">₹{data.discount}</span>
              </p> */}
            <p className="text-sm">
              Total: <span className="font-semibold">₹{data.totalAmount}</span>
            </p>
          </Card>
          <Card className="p-4 gap-2">
            <h1 className="text-lg font-semibold">Shipping Address</h1>
            <p className="text-sm">
              <span className="font-semibold">{data.shippingAddress.fullName}</span>
            </p>
            <p className="text-sm">
              {data.shippingAddress.line1}, {data.shippingAddress.line2}, {data.shippingAddress.landmark},{" "}
              {data.shippingAddress.city}, {data.shippingAddress.country}, {data.shippingAddress.postalCode}
            </p>

            <p className="text-sm">
              <span className="font-semibold">{data.shippingAddress.phone}</span>
            </p>
          </Card>
        </div>
      </div>

      {data.status === "pending" && (
        <Card className="p-4 gap-2 my-10">
          <h1 className="text-lg font-semibold">Cancel Order</h1>
          <p className="text-sm italic">Terms and Conditions</p>
          <Button variant={"destructive"} onClick={() => {}}>
            Cancel Order
          </Button>
        </Card>
      )}
    </div>
  );
};

export default OrderDetail;
