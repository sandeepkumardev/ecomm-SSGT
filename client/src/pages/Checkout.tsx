import withAuth from "@/components/shared/withAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import NewAddress from "@/dialogs/NewAddress";
import { url } from "@/lib/utils";
import useUserStore from "@/store/user.store";
import type { IAddress } from "@/types";
import React from "react";
import { toast } from "sonner";

const Checkout = () => {
  const { cart, addresses, addAddress } = useUserStore();
  const [selectedAddress, setSelectedAddress] = React.useState<string>("");
  const [paymentMode, setPaymentMode] = React.useState<string>("COD");
  const [loading, setLoading] = React.useState(false);

  const handleCheckout = async () => {
    if (cart?.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    if (selectedAddress === "") {
      toast.error("Please select an address");
      return;
    }
    if (paymentMode === "") {
      toast.error("Please select a payment mode");
      return;
    }

    try {
      setLoading(true);
      // total price
      const total = cart?.reduce((acc, item) => acc + item.item.price * item.quantity, 0);

      // modified cart
      const modifiedCart = cart?.map((item) => ({ product: item.item._id, quantity: item.quantity }));

      // create a order in the backend [clear the server cart]
      const res = await fetch(`${url}/user/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          shippingAddress: selectedAddress,
          paymentMethod: paymentMode,
          totalAmount: total,
          orderItems: modifiedCart,
        }),
      });
      const json = await res.json();
      if (!json.success) {
        toast.error(json.error || "something went wrong!");
        return;
      }

      toast.success("Order placed successfully");

      // redirect to orders page or order details
      window.location.href = "/orders";
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold my-3">Fill your details</h1>

      <div className="flex gap-2 flex-col">
        <div className="flex gap-2 flex-col sm:flex-row justify-between">
          <h1 className="text-lg font-semibold">Shipping Address</h1>
          <NewAddress />
        </div>
        {addresses?.length === 0 && <p className="text-sm italic">No address found</p>}
        <div className="flex gap-2 flex-col">
          <RadioGroup value={selectedAddress}>
            {addresses?.map((address: IAddress) => (
              <Card
                onClick={() => setSelectedAddress(address._id)}
                key={address._id}
                className="cursor-pointer p-2 flex flex-row items-center gap-2 border-gray-500 w-full"
              >
                <RadioGroupItem value={address._id} />
                <div>
                  <h1 className="text-lg font-semibold">{address.fullName}</h1>
                  <p className="text-sm">
                    {address.line1}, {address.line2}, {address.city}, {address.country},{address.postalCode}
                  </p>
                  <p className="text-sm">
                    Landmark: <span className="italic text-[12px] text-gray-700">{address.landmark}</span>
                  </p>
                  <p className="text-sm">
                    Phone: <span className="italic text-[12px] text-gray-700">{address.phone}</span>
                  </p>
                </div>
              </Card>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="h-[1px] bg-gray-400 my-3" />

      <div className="flex gap-2 flex-col">
        <div className="flex gap-2 flex-col sm:flex-row justify-between">
          <h1 className="text-lg font-semibold">Products</h1>
        </div>

        <div className="flex flex-col gap-2">
          {cart?.map((item) => (
            <Card key={item.item._id} className="p-2 flex flex-row justify-between gap-2 w-full">
              <div>
                <img src={item.item.images[0].url} alt="" className="w-[50px] h-[50px] object-cover rounded-[5px]" />
              </div>
              <div className="flex-1">
                <h1 className="text-sm line-clamp-2">{item.item.title}</h1>
              </div>
              <div className="flex gap-2 items-center">
                <h1 className="font-semibold">₹{item.item.price}</h1>x<h1 className=" font-semibold">{item.quantity}</h1>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-gray-400 my-3" />

      <div className="flex gap-2 flex-col">
        <div className="flex gap-2 flex-col sm:flex-row justify-between">
          <h1 className="text-lg font-semibold">Payment</h1>
        </div>

        <div className="">
          <RadioGroup value={paymentMode} className="flex gap-2">
            {[
              { key: "COD", value: "Cash on Delivery" },
              { key: "UPI", value: "Online" },
            ].map((item) => (
              <div
                onClick={() => setPaymentMode(item.key)}
                key={item.key}
                className="cursor-pointer p-2 flex flex-row items-center gap-2 border-gray-500 w-full"
              >
                <RadioGroupItem value={item.key} />
                <div>
                  <p className="font-semibold">{item.value}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <Button
        className="my-7 cursor-pointer w-full bg-green-500 hover:bg-green-700 text-black text-lg"
        disabled={!cart?.length}
        onClick={handleCheckout}
      >
        {loading ? "Placing order..." : paymentMode === "COD" ? "Place Order" : "Pay Now"}
      </Button>
    </div>
  );
};

export default withAuth(Checkout);
