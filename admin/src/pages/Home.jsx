import Layout from "../components/Layout";
import withAuth from "../components/withAuth";

const Home = () => {
  return <Layout>Home page</Layout>;
};

export default withAuth(Home);
