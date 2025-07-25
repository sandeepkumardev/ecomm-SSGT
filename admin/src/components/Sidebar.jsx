import { Blocks, Home, List, Package, Users } from "lucide-react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { appStore } from "../store/app.store";

const Sidebar = () => {
  return (
    <div className="border-r border-gray-300 w-[200px] h-[calc(100vh-50px)] overflow-hidden bg-white">
      <div className="flex flex-col gap-5 p-5">
        <SideLink icon={Home} link="/" label="Home" />
        <SideLink icon={Package} link="/products" label="Products" />
        <SideLink icon={List} link="/categories" label="Categories" />
        <SideLink icon={Blocks} link="/orders" label="Orders" />
        <SideLink icon={Users} link="/users" label="Users" />
      </div>
    </div>
  );
};

const SideLink = ({ icon, link, label }) => {
  const { closeSidebar } = useContext(appStore);
  const { pathname } = useLocation();
  const isActive = pathname === link;
  const Icon = icon;

  return (
    <Link
      to={link}
      onClick={closeSidebar}
      className={`flex gap-2 items-center text-gray-700 ${isActive ? "text-gray-950 font-semibold" : ""}`}
    >
      <Icon className="w-5 h-5" /> {label}
    </Link>
  );
};

export default Sidebar;
