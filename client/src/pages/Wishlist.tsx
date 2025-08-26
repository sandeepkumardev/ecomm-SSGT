import withAuth from "@/components/shared/withAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useUserStore from "@/store/user.store";
import type { IWishlist } from "@/types";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Wishlist = () => {
  const { wishlist, loading } = useUserStore();

  return (
    <div className="p-3">
      <h1 className="text-xl font-semibold my-3">All Products</h1>
      {loading && <p>loading wishlist itmes</p>}

      {wishlist && wishlist.length === 0 && <p>Wishlist is empty</p>}
      <div className="flex gap-2 flex-wrap">
        {wishlist && wishlist.map((product: any) => <Product key={product._id} {...product} />)}
      </div>
    </div>
  );
};

const Product = (data: IWishlist) => {
  const { removeWishlistItem, addWishlistItem, moveToCart, rollbackToWishlist } = useUserStore();

  const wishListObj = {
    _id: data.item._id,
    title: data.item.title,
    images: [data.item.images[0]],
    slug: data.item.slug,
    price: data.item.price,
    mrp: data.item.mrp,
  };

  const handleMoveToCart = async () => {
    try {
      // data flow in client
      moveToCart({ item: wishListObj });

      // data flow in server
      const res = await fetch(`http://localhost:4000/user/wishlist/move-to-cart/${data.item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await res.json();
      if (!json.success) {
        toast.error(json.error || "something went wrong!");
        rollbackToWishlist({ item: wishListObj });
        return;
      }
      toast.success(json.message || "Moved to cart!");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
      rollbackToWishlist({ item: wishListObj });
    }
  };

  const removeFromWishlist = async () => {
    try {
      // remove item from client wishlist
      removeWishlistItem(data.item._id);

      // remove item from server wishlist
      const res = await fetch(`http://localhost:4000/user/wishlist/${data.item._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await res.json();
      if (!json.success) {
        toast.error(json.error || "something went wrong!");
        // add item into client wishlist
        addWishlistItem({ item: wishListObj });
        return;
      }
      toast.success("Removed from wishlist!");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
      // add item into client wishlist
      addWishlistItem({ item: wishListObj });
    }
  };

  return (
    <Card className="relative w-[200px] p-0 overflow-hidden gap-0">
      <div className="w-full h-[250px]">
        <img src={data.item.images[0].url} alt="" className="w-full h-full object-cover" />
      </div>
      <Link to={`/product/${data.item.slug}`} className="p-2">
        <h1 className="text-sm font-semibold line-clamp-2">{data.item.title}</h1>
      </Link>
      <div className="p-2 flex flex-col gap-2">
        <Button variant={"outline"} className="cursor-pointer" onClick={handleMoveToCart}>
          Move to Cart
        </Button>
        <Button variant={"destructive"} className="cursor-pointer" onClick={removeFromWishlist}>
          Remove
        </Button>
      </div>
    </Card>
  );
};

export default withAuth(Wishlist);
