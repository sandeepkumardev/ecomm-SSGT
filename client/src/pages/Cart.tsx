import withAuth from "@/components/shared/withAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useUserStore from "@/store/user.store";
import type { ICart } from "@/types";
import { Minus, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, loading } = useUserStore();

  return (
    <div className="p-3 max-w-7xl mx-auto">
      <h1 className="text-xl font-semibold my-3">All Products</h1>
      {loading && <p>loading cart itmes</p>}

      {cart && cart.length === 0 && <p>Cart is empty</p>}
      {cart?.length && (
        <div className="flex gap-2 flex-col md:flex-row">
          <div className="flex gap-2 flex-wrap flex-1">
            {cart && cart.map((product: any) => <Product key={product._id} {...product} />)}
          </div>

          <div className="w-full md:w-[250px] bg-gray-300">
            <h1>Total Price</h1>
          </div>
        </div>
      )}
    </div>
  );
};

const Product = (data: ICart) => {
  return (
    <Card className="relative p-2 overflow-hidden flex flex-row gap-2">
      <div className="w-[100px] h-full">
        <img src={data.item.images[0].url} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-between w-full">
        <Link to={`/product/${data.item.slug}`} className="p-2">
          <h1 className="text-sm font-semibold line-clamp-2">{data.item.title}</h1>
        </Link>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Button variant={"outline"}>
              <Minus />
            </Button>
            <h1 className="font-bold text-xl">{data.quantity}</h1>
            <Button variant={"outline"}>
              <Plus />
            </Button>
          </div>
          <Button variant={"destructive"}>Remove</Button>
        </div>
      </div>
    </Card>
  );
};

export default withAuth(Cart);
