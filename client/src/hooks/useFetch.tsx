import { useEffect, useState } from "react";
import type { ICategory } from "../types";
import type { IProduct } from "../types";

export const useFetch = (url: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ICategory[] | IProduct[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        if (!json.success) {
          setError(json.error || "Something went wrong!");
          return;
        }
        setData(json.data);
      } catch (error: any) {
        setError(error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { loading, error, data };
};
