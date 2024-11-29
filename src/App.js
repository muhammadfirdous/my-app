import React from "react";
import UserList from "./UserList";
import PostList from "./PostList";
import ErrorHandlingExample from "./ErrorHandlingExample";

function App() {
  return (
    <div>
      <h1>React Fetch Examples</h1>
      <h2>Users</h2>
      <UserList />
      <h2>Posts</h2>
      <PostList />
      <h2>Error Handling</h2>
      <ErrorHandlingExample />
    </div>
  );
}

export default App;
