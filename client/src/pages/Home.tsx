import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetch";
import useUserStore from "@/store/user.store";
import type { IProduct } from "@/types";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
  const { data: categories, loading: categoriesLoading } = useFetch("http://localhost:4000/categories");
  const { data: products, loading: productsLoading } = useFetch("http://localhost:4000/products");

  return (
    <div className="p-3">
      <h1 className="text-xl font-semibold mb-3">All Categories</h1>
      {categoriesLoading && <p>loading categories</p>}
      <div className="flex gap-2">
        {categories &&
          categories.map((category: any) => <Category key={category._id} name={category.name} slug={category.slug} />)}
      </div>

      <h1 className="text-xl font-semibold my-3">All Products</h1>
      {productsLoading && <p>loading products</p>}
      <div className="flex gap-2 flex-wrap">
        {products && products.map((product: any) => <Product key={product._id} {...product} />)}
      </div>
    </div>
  );
};

const Category = ({ name, slug }: { name: string; slug: string }) => {
  return (
    <Link to={`/products/${slug}`}>
      <Button className="cursor-pointer hover:bg-gray-400" variant={"link"}>
        {name}
      </Button>
    </Link>
  );
};

const Product = (data: IProduct) => {
  const { user, wishlist, addWishlistItem, removeWishlistItem } = useUserStore();
  const router = useNavigate();

  const wishListObj = {
    _id: data._id,
    title: data.title,
    images: [data.images[0]],
    slug: data.slug,
  };

  const addToWishlist = async () => {
    try {
      // check if user is logged in
      if (!user) {
        router(`/signin?redirect=/product/${data.slug}`);
        return;
      }

      // add item into client wishlist
      addWishlistItem({ item: wishListObj });

      // add item into server wishlist
      const res = await fetch(`http://localhost:4000/user/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ item: data._id }),
      });
      const json = await res.json();
      if (!json.success) {
        toast.error(json.error);
        // remove item from client wishlist
        removeWishlistItem(data._id);
        return;
      }
      toast.success("Added to wishlist!");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
      // remove item from client wishlist
      removeWishlistItem(data._id);
    }
  };

  const removeFromWishlist = async () => {
    try {
      // remove item from client wishlist
      removeWishlistItem(data._id);

      // remove item from server wishlist
      const res = await fetch(`http://localhost:4000/user/wishlist/${data._id}`, {
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

  // @ts-ignore
  const isInWishlist = wishlist?.some((item) => (item.item?._id || item.item) === data._id);

  return (
    <Link to={`/product/${data.slug}`}>
      <Card className="relative w-[200px] p-0 overflow-hidden gap-0">
        <div
          className="absolute top-2 right-2 cursor-pointer z-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {isInWishlist ? (
            <Bookmark fill="red" className="text-red-500" onClick={removeFromWishlist} />
          ) : (
            <Bookmark onClick={addToWishlist} />
          )}
        </div>
        <div className="w-full h-[250px]">
          <img src={data.images[0].url} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="p-2">
          <h1 className="text-sm font-semibold line-clamp-2">{data.title}</h1>
          <div className="pt-3">
            <span className="font-semibold">₹{data.price}</span>/<span className="line-through text-xs">₹{data.mrp}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default Home;
