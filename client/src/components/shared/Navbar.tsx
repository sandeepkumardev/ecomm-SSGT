import React from "react";
import { Button } from "../ui/button";
import { Bookmark, ShoppingCart, Sidebar as SidebarIcon } from "lucide-react";
import useAppStore from "@/store/app.store";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserStore from "@/store/user.store";

const Navbar = () => {
  const { openSidebar } = useAppStore();
  const { setUser, cart, wishlist } = useUserStore();
  const { user, loading } = useAuth();

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refToken");
    setUser(null);
  };

  return (
    <div className="w-full h-[60px] flex justify-between items-center px-5 py-3 border-b border-gray-300 shadow-lg">
      <div className="flex items-center gap-3">
        <SidebarIcon onClick={openSidebar} className="cursor-pointer" />
        <Sidebar />
        <Link to="/">
          <h1 className="text-2xl font-bold">E-commerce</h1>
        </Link>
      </div>

      {user ? (
        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative">
            {cart!?.length > 0 && (
              <p className="text-xs bg-red-500 text-white w-4 h-4 rounded-full absolute top-[-5px] right-[-5px] flex items-center justify-center">
                {cart?.length}
              </p>
            )}
            <ShoppingCart className="cursor-pointer" />
          </Link>
          <Link to="/wishlist" className="relative">
            {wishlist!?.length > 0 && (
              <p className="text-xs bg-red-500 text-white w-4 h-4 rounded-full absolute top-[-5px] right-[-5px] flex items-center justify-center">
                {wishlist?.length}
              </p>
            )}
            <Bookmark className="cursor-pointer" />
          </Link>
          <Button size={"sm"} onClick={logOut}>
            Log Out
          </Button>
          <Avatar className="cursor-pointer">
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback className="uppercase">{user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <Button variant="link" className="cursor-pointer">
          <Link to="/signin">Sign In</Link>
        </Button>
      )}
    </div>
  );
};

export default Navbar;
