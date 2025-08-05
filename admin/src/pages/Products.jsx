import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import withAuth from "../components/withAuth";
import NewProduct from "../dialogs/NewProduct";
import EditProduct from "../dialogs/EditProduct";
import DeleteProduct from "../dialogs/DeleteProduct";

const Products = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const addProduct = (newProduct) => {
    setData([...data, { ...newProduct, category: categories.find((c) => c._id === newProduct.category) }]);
  };

  const updateProduct = (id, newData) => {
    setData(
      data.map((item) => {
        if (item._id === id) {
          return { ...item, ...newData, category: categories.find((c) => c._id === newData.category) };
        }
        return item;
      })
    );
  };

  const deleteProduct = (id) => {
    setData(data.filter((item) => item._id !== id));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = import.meta.env.VITE_SERVER_URL;
        const res = await fetch(`${url}/admin/product`, {
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

        // fetch categories
        const res2 = await fetch(`${url}/admin/category`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data2 = await res2.json();

        if (!data2.success) {
          alert(data2.error || "Something went wrong!");
          return;
        }

        setCategories(data2.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="flex justify-between items-center p-3 border-b border-gray-300 h-[50px] select-none">
        <h1 className="font-bold">Products</h1>

        <NewProduct addProduct={addProduct} categories={categories} />
      </div>

      <div className="flex justify-center items-center">{!data.length && loading && <h1>Loading...</h1>}</div>

      {data.length !== 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price / MRP
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item._id} className="border border-x-0 border-gray-300">
                  <td className="px-6 py-0 text-sm font-medium text-gray-900 line-clamp-1">{item.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.stock || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="font-bold text-black">{item.price}</span> / <span className="text-xs">{item.mrp}</span>
                  </td>
                  <td className="flex gap-2 px-6 py-4 text-sm text-gray-500">
                    <EditProduct id={item._id} item={item} categories={categories} update={updateProduct} />
                    <DeleteProduct id={item._id} remove={deleteProduct} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default withAuth(Products);
