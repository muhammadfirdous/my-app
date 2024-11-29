import React, { useState, useEffect } from "react";

// Main App Component
function App() {
  // States for Fetching Data 1
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(false);

  // States for Fetching Data 2
  const [userId, setUserId] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 2;
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Users (Basic Fetch and Loading)
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, [retry]);

  // Fetch Posts Dynamically for a Specific User
  const fetchPostsByUser = () => {
    if (!userId) return;
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch posts for user");
        setLoading(false);
      });
  };

  // Paginated Users
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + usersPerPage);

  const handleNextPage = () => {
    if (startIndex + usersPerPage < users.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Fetch Posts for Searchable Component
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Retry Error Handling
  const handleRetry = () => {
    setRetry((prev) => !prev);
    setError("");
  };

  return (
    <div>
      <h1>Comprehensive Fetching App</h1>

      {/* Basic Fetch with Loading State */}
      <section>
        <h2>Fetch User Data</h2>
        {loading && <p>Loading...</p>}
        {error && (
          <div>
            <p>{error}</p>
            <button onClick={handleRetry}>Retry</button>
          </div>
        )}
        <ul>
          {!loading &&
            !error &&
            users.map((user) => (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            ))}
        </ul>
      </section>

      {/* Dynamic Fetch for Specific User */}
      <section>
        <h2>Fetch Posts by User ID</h2>
        <input
          type="number"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={fetchPostsByUser}>Fetch Posts</button>
        {loading && <p>Loading posts...</p>}
        <ul>
          {userPosts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </section>

      {/* Paginated Users */}
      <section>
        <h2>Paginated Users</h2>
        <ul>
          {paginatedUsers.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={startIndex + usersPerPage >= users.length}
        >
          Next
        </button>
      </section>

      {/* Searchable Posts */}
      <section>
        <h2>Search Posts by Title</h2>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul>
          {filteredPosts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
