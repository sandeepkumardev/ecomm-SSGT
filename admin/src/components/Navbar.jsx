import { useContext } from "react";
import { PanelRightClose, PanelRightOpen, ShieldUser } from "lucide-react";
import { appStore } from "../store/app.store";

const Navbar = () => {
  const { sidebar, openSidebar, closeSidebar } = useContext(appStore);
  return (
    <div className="flex justify-between items-center p-3 border-b border-gray-300 h-[50px] select-none">
      <div className="flex items-center gap-2">
        <div className="sm:hidden cursor-pointer">
          {sidebar ? <PanelRightOpen onClick={closeSidebar} /> : <PanelRightClose onClick={openSidebar} />}
        </div>
        <h1 className="font-bold">Admin</h1>
      </div>

      <div>
        <ShieldUser className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
