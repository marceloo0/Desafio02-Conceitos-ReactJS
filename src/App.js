import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })

    const repository = response.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

      const newRepositories = []
      repositories.map(repository => {
        if (repository.id !== id) {
          newRepositories.push(repository)
        }
        return newRepositories
      })
    
      setRepositories(newRepositories);
  }

  return (
    <div>
      <h1>Repositories</h1>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <h2>{repository.title}</h2>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
