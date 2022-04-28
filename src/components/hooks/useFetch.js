import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = (method = 'get', url, options = null) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios({
      method: method,
      baseURL: url,
      options
    }).then(res => {
      console.count('useFetch');
      setResponse(res.data);
      setLoading(false);
    }).catch(err => {
      if (err.response) {
        // if server send response
        setError({
          message: err.response.data.message,
          status: err.response.status,
        })
      } else if (!err.status) {
        // network error
        setError({
          message: "Network Error",
          status: 502,
        })
      } else {
        setError({
          message: err.message,
          status: err.status,
        })
      }
    });
  }, [url, method, options]);
  return [response, error, loading];
};

export default useFetch;