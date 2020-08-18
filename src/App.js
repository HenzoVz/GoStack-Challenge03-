import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [title, setTitle] = useState("");
  const [repositories, setRepositories] = useState([]);


  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: title,
      url: `github.com/Challenges/${title}`,
      techs: ["NodeJS", "ReactJS"]
    });

    const repository = response.data;
    console.log(repository)

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const new_repositories = repositories.filter((repository) => repository.id !== id);
    
    setRepositories(new_repositories);
  }

  return (
    <div>
      <form onSubmit={handleAddRepository}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          value={title}
          onChange = {event => setTitle(event.target.value)}
          placeholder="Repository Name"
        />
      </form>
      <ul data-testid="repository-list">
        { repositories.map(repository => 
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>
      <button type="submit" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
