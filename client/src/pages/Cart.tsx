import withAuth from "@/components/shared/withAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useUserStore from "@/store/user.store";
import type { ICart } from "@/types";
import { Minus, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  const { cart, loading } = useUserStore();

  if (!cart) return null;

  return (
    <div className="p-3 max-w-7xl mx-auto">
      <h1 className="text-xl font-semibold my-3">All Products</h1>
      {loading && <p>loading cart itmes</p>}

      {cart && cart.length === 0 && (
        <div className="h-[calc(100vh-200px)] flex items-center justify-center">
          <p className="text-xl font-semibold font-mono">Cart is empty</p>
        </div>
      )}
      {cart?.length! > 0 && (
        <div className="flex gap-2 flex-col md:flex-row">
          <div className="flex gap-2 flex-wrap flex-1 h-fit">
            {cart && cart.map((product: any) => <Product key={product._id} {...product} />)}
          </div>

          <Card className="p-4 w-full h-fit md:w-[250px]">
            <h1 className="text-xl font-semibold mb-3">Order Summary</h1>

            <div className="flex justify-between border-b border-gray-300">
              <span className="font-semibold">Total Items:</span>
              <span className="font-semibold">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300">
              <span className="font-semibold">Total Price:</span>
              <span className="font-semibold">₹{cart.reduce((acc, item) => acc + item.quantity * item.item.price, 0)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300">
              <span className="font-semibold">Discount:</span>
              <span className="font-semibold">
                ₹
                {cart.reduce((acc, item) => acc + item.quantity * item.item.mrp, 0) -
                  cart.reduce((acc, item) => acc + item.quantity * item.item.price, 0)}
              </span>
            </div>

            <Link to="/checkout">
              <Button className="w-full mt-3 bg-amber-400 font-bold text-black hover:bg-amber-600">Proceed</Button>
            </Link>
          </Card>
        </div>
      )}
    </div>
  );
};

const Product = (data: ICart) => {
  const { removeCartItem, addCartItem, updateQuantity } = useUserStore();

  const totalPrice = data.quantity * data.item.price;

  const handleQuantity = async (value: number) => {
    try {
      if (value < 1) {
        const result = confirm("Are you sure you want to remove this item from cart?");
        if (!result) return;
        removeCartItem(data.item._id);
      } else {
        updateQuantity(data.item._id, value);
      }

      const res = await fetch(`http://localhost:4000/user/cart/${data.item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ quantity: value }),
      });
      const json = await res.json();
      if (!json.success) {
        toast.error(json.error || "something went wrong!");
        updateQuantity(data.item._id, data.quantity);
        return;
      }
      toast.success("Quantity updated!");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
      updateQuantity(data.item._id, data.quantity);
    }
  };

  const handleRemove = async () => {
    try {
      removeCartItem(data.item._id);

      const res = await fetch(`http://localhost:4000/user/cart/${data.item._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await res.json();
      console.log(json);
      if (!json.success) {
        toast.error(json.error || "something went wrong!");
        addCartItem({ item: data.item, quantity: data.quantity });
        return;
      }
      toast.success("Removed from cart!");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
      addCartItem({ item: data.item, quantity: data.quantity });
    }
  };
  return (
    <Card className="relative p-2 overflow-hidden flex flex-row gap-2">
      <div className="w-[100px] h-full rounded overflow-hidden">
        <img src={data.item.images[0].url} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-between w-full">
        <Link to={`/product/${data.item.slug}`} className="p-2">
          <h1 className="text-sm font-semibold line-clamp-2">{data.item.title}</h1>
        </Link>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Button variant={"outline"} onClick={() => handleQuantity(data.quantity - 1)}>
              <Minus />
            </Button>
            <h1 className="font-bold text-xl">{data.quantity}</h1>
            <Button variant={"outline"} onClick={() => handleQuantity(data.quantity + 1)}>
              <Plus />
            </Button>
          </div>
          <div className="flex gap-2 items-center">
            <h1 className="font-bold text-lg">₹{totalPrice}</h1>
            <Button
              variant={"ghost"}
              className="text-red-500 hover:bg-red-100 hover:text-red-600 cursor-pointer"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default withAuth(Cart);
