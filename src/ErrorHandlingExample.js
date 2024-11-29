import React, { useState } from "react";

const ErrorHandlingExample = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setError(null);
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/invalid-endpoint")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && (
        <div>
          <p>Error: {error}</p>
          <button onClick={fetchData}>Retry</button>
        </div>
      )}
      {data && <p>Data fetched successfully!</p>}
      {!data && !loading && !error && (
        <button onClick={fetchData}>Fetch Data</button>
      )}
    </div>
  );
};

export default ErrorHandlingExample;
