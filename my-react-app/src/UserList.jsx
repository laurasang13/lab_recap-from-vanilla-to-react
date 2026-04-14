import { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
      );
      const data = await response.json();
      
      // Mantenemos los anteriores y añadimos los nuevos
      setUsers((prev) => [...prev, ...data.users]);
      setSkip((prev) => prev + limit);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div id="user-list-container">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.image} alt={user.firstName} />
            <p><strong>{user.firstName} {user.lastName}</strong></p>
          </div>
        ))}
      </div>
      
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? "Loading..." : "Load More"}
      </button>
    </>
  );
};

export default UserList;