import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [data, setdata] = useState();
  useEffect(() => {
    const autoFetch = async () => {
      console.log(`${import.meta.env.VITE_APP_API_ENDPOINT_BASE}/${url}`);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_ENDPOINT_BASE}/${url}`
        );
        if (res.status == 200 || res.status == 201) {
          let response = res.data;
          setdata(response);
          setloading(false);
        }
      } catch (error) {
        setloading(false);
        const err = Error(error);
        seterror(err.message);
      }
    };
    autoFetch();
  }, [url]);
  return { loading, error, data };
};

export default useFetch;
