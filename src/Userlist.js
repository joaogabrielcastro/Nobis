import React, { useEffect, useState } from "react";
import './Userlist.css'; 

function UserList() { 
  const [users, setUsers] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Deu erro na API 🚨");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
        console.error("Erro na requisição:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  if (isLoading) return <div className="loading">Carregando usuários...</div>;
  if (error) return <div className="error">Erro: {error}</div>;

  return (
    <div className="container">
      <h1>🔍 Lista de Usuários</h1>
      <input
        type="text"
        placeholder="Buscar por nome..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {filteredUsers.length > 0 ? (
        <ul className="user-list">
          {filteredUsers.map((user) => (
            <li key={user.id} className="user-item">
              <strong>Nome:</strong>{" "}
              <span 
                className="user-name" 
                onClick={() => handleUserClick(user)}
              >
                {user.name}
              </span>
              <br />
              <strong>Email:</strong> {user.email}
              <br />
              <strong>Telefone:</strong> {user.phone}
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          Nenhum usuário encontrado 🤷‍♂️
        </div>
      )}

      {selectedUser && (
        <div className="user-details">
          <h2>Detalhes de {selectedUser.name}</h2>
          <p><strong>🌐 Site:</strong> {selectedUser.website}</p>
          <p><strong>🏢 Empresa:</strong> {selectedUser.company.name}</p>
          <p><strong>📍 Cidade:</strong> {selectedUser.address.city}</p>
        </div>
      )}
    </div>
  );
}

export default UserList;