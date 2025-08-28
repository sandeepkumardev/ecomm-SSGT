import { url } from "@/lib/utils";
import useUserStore from "@/store/user.store";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useAuth = () => {
  const { user, setUser, setCart, setWishlist, setAddresses, setLoading: setUserLoading } = useUserStore();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(token ? true : false);

  useEffect(() => {
    if (!user && loading) {
      const fetchInfo = async () => {
        try {
          const res = await fetch(`${url}/user/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();
          if (data.success) {
            setUser(data.data.user);
            setCart(data.data.cart);
            setWishlist(data.data.wishlist);
            setAddresses(data.data.addresses);
          } else {
            throw new Error(data.error || "something went wrong!");
          }
        } catch (error: any) {
          // alert(error);
          localStorage.removeItem("token");
          localStorage.removeItem("refToken");
        } finally {
          setLoading(false);
          setUserLoading(false);
        }
      };

      fetchInfo();
    } else {
      setLoading(false);
      setUserLoading(false);
    }
  }, []);

  return { user, loading };
};
