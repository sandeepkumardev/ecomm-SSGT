import withAuth from "@/components/shared/withAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import NewAddress from "@/dialogs/NewAddress";
import useUserStore from "@/store/user.store";
import type { IAddress } from "@/types";
import React from "react";

const Checkout = () => {
  const { addresses, addAddress } = useUserStore();
  const [selectedAddress, setSelectedAddress] = React.useState<string>("");
  const [paymentMode, setPaymentMode] = React.useState<string>("COD");

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
        disabled={!selectedAddress}
      >
        {paymentMode === "COD" ? "Place Order" : "Pay Now"}
      </Button>
    </div>
  );
};

export default withAuth(Checkout);
