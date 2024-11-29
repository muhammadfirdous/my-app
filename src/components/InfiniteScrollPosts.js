import React, { useState, useEffect, useRef } from "react";

function InfiniteScrollPosts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const observer = useRef();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts((prevPosts) => [...prevPosts, ...data]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch initial posts and subsequent pages
  useEffect(() => {
    fetchPosts();
  }, [page]);

  const lastPostRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  return (
    <div>
      <h2>Infinite Scrolling Posts</h2>
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <div key={post.id} ref={lastPostRef} style={{ marginBottom: "20px" }}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          );
        } else {
          return (
            <div key={post.id} style={{ marginBottom: "20px" }}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          );
        }
      })}
      {loading && <p>Loading more posts...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default InfiniteScrollPosts;
