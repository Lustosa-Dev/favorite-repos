import React, { useState, useCallback, useEffect } from "react";
import { Link } from 'react-router-dom';
// icons
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
// styles
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";
// api
import { api } from "../../services/Api";

export function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorys, setRepositorys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

//   buscar
useEffect(() => {
const repoStorage = localStorage.getItem('repos');

    if(repoStorage){
        setRepositorys(JSON.parse(repoStorage))
    }

}, [])

// salvar alterações
useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorys))
}, [repositorys])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        setAlert(null)
        try {

            if(newRepo === ''){
                throw new Error('Você precisa indicar um repositório')
            }

          const response = await api.get(`repos/${newRepo}`);

          const hasRepo = repositorys.find(repo => repo.name === newRepo);
          if(hasRepo){
            throw new Erro('Repositório duplicado')
          }

          const data = {
            name: response.data.full_name,
          };

          setRepositorys([...repositorys, data]);
          setNewRepo("");
        } catch (error) {
            setAlert(true);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [newRepo, repositorys]
  );

  function handleInputChange(e) {
    setNewRepo(e.target.value);
    setAlert(null)
  }

  const handleDelete = useCallback(repo => {
    const find = repositorys.filter( r => r.name != repo)
    setRepositorys(find)
  }, [repositorys])

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>
      <Form onSubmit={handleSubmit} error={alert}>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositorys.map((repo) => (
          <li key={repo.name}>
            <span>
                <DeleteButton onClick={() => handleDelete(repo.name)}>
                    <FaTrash size={14}/>
                </DeleteButton>
                {repo.name}
            </span>

            <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
       
      </List>
    </Container>
  );
}
