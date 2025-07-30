import Layout from "../components/Layout";
import withAuth from "../components/withAuth";

const Users = () => {
  return <Layout>Users page</Layout>;
};

export default withAuth(Users);
