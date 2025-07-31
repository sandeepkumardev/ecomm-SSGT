import { useEffect } from "react";
import Layout from "../components/Layout";
import withAuth from "../components/withAuth";

const Users = () => {
  useEffect(() => {
    const getData = async () => {
      try {
        const url = import.meta.env.VITE_SERVER_URL;
        const res = await fetch(`${url}/admin/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();

        if (!data.success) {
          alert(data.error || "failed to fetch users!");
          return;
        }

        console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return <Layout>Users page</Layout>;
};

export default withAuth(Users);
