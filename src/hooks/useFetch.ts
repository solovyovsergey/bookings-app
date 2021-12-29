import { useEffect, useState } from "react";
import { getData } from "../utils/api";

export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let doUpdate = true;

    setIsLoading(true);
    setData(undefined);
    setError(null);

    getData<T>(url)
      .then((data) => {
        if (doUpdate) {
          setData(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (doUpdate) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      doUpdate = false;
    };
  }, [url]);

  return { data, isLoading, error };
}
