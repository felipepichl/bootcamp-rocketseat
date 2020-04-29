import React, { useState, useEffect } from "react";
import api from "./services/api";

import Header from "./components/Header";

import "./App.css";

/**
 * Component
 * Properties
 * State and Immutable State
 */

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    function loadProjects() {
      api.get("projects").then((response) => {
        setProjects(response.data);
      });
    }

    loadProjects();
  }, []);

  async function handleAddProject() {
    //setProjects([...projects, `Novo project => ${Date.now()}`]);

    const response = await api.post("projects", {
      title: "Front-end with ReactJS",
      owner: "Felipe",
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Projects" />

      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>

      <button type="submit" onClick={handleAddProject}>
        Adicionar
      </button>
    </>
  );
}
