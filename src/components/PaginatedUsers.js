import React, { useState, useEffect } from "react";
import '../styles/PaginatedUsers.css';  // Import the CSS file

const PaginatedUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 2;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + usersPerPage);

  const handleNext = () => {
    if (startIndex + usersPerPage < users.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <h2>Paginated Users</h2>
      <ul>
        {paginatedUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <button
        onClick={handleNext}
        disabled={startIndex + usersPerPage >= users.length}
      >
        Next
      </button>
    </div>
  );
};

export default PaginatedUsers;
