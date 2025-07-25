import { createContext, useState } from "react";

export const appStore = createContext({});

const AppProvider = ({ children }) => {
  const [sidebar, setOpenSidebar] = useState(false);

  const closeSidebar = () => setOpenSidebar(false);
  const openSidebar = () => setOpenSidebar(true);

  return <appStore.Provider value={{ sidebar, openSidebar, closeSidebar }}>{children}</appStore.Provider>;
};

export default AppProvider;
