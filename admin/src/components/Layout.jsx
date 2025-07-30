import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <MobileSidebar />
        <DesktopSidebar />

        <div className="flex-1 p-2 sm:p-5">{children}</div>
      </div>
    </>
  );
};

export default Layout;
