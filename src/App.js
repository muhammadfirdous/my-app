import React, { useEffect, useState } from "react";
import DynamicUserPosts from "./components/DynamicUserPosts";
import PaginatedUsers from "./components/PaginatedUsers";
import SearchablePosts from "./components/SearchablePosts";
import InfiniteScrollPosts from "./components/InfiniteScrollPosts";
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch users.");
        setLoading(false);
      });
  }, []);

  const handleRetry = () => {
    setError("");
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch users.");
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>React Fetching App</h1>

      <section>
        <h2>All Users</h2>
        {loading && <p>Loading users...</p>}
        {error ? (
          <div>
            <p>{error}</p>
            <button onClick={handleRetry}>Retry</button>
          </div>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Dynamic User Posts</h2>
        <DynamicUserPosts />
      </section>

      <section>
        <h2>Paginated Users</h2>
        <PaginatedUsers users={users} />
      </section>

      <section>
        <h2>Searchable Posts</h2>
        <SearchablePosts />
      </section>

      <section>
        <h2>Infinite Scrolling Posts</h2>
        <InfiniteScrollPosts />
      </section>
    </div>
  );
}

export default App;
