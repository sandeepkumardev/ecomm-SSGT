import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { Pencil } from "lucide-react";
import ImageContainer from "../components/ImageContainer";

const Product = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:4000/admin/product/" + slug, {
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

    getProduct();
  }, []);

  if (loading) return <Layout>Loading...</Layout>;

  if (!data && !loading) return <Layout>Product not found!</Layout>;

  return (
    <Layout>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Product Details</h1>

          <button className="bg-blue-400 cursor-pointer p-1 text-sm px-2 rounded text-white font-semibold flex items-center gap-2">
            <Pencil className="w-4 h-4" />
            Edit
          </button>
        </div>

        <ImageContainer />

        <div>
          <label className="font-semibold">Title</label>
          <div className="border border-gray-300 p-2 rounded">{data.title}</div>
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <div className="border border-gray-300 p-2 rounded">{data.description}</div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="font-semibold">Price</label>
            <div className="border border-gray-300 p-2 rounded">{data.price}</div>
          </div>

          <div>
            <label className="font-semibold">MRP</label>
            <div className="border border-gray-300 p-2 rounded">{data.mrp}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="font-semibold">Rating</label>
            <div className="border border-gray-300 p-2 rounded">{data.rating}</div>
          </div>

          <div>
            <label className="font-semibold">Stock</label>
            <div className="border border-gray-300 p-2 rounded">{data.stock}</div>
          </div>
        </div>

        <div>
          <label className="font-semibold">Category</label>
          <div className="border border-gray-300 p-2 rounded">{data.category?.name || "-"}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
