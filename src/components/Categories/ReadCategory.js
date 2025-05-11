import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ReadCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8082/categories/" + id)
      .then(res => setCategory(res.data))
      .catch(() => toast.error("Erro ao buscar categoria"));
  }, [id]);

  return (
    <div className="container">
      <div className='row'>
        <div className='col-md-12'>
          <h1>Detalhes da Categoria</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{category.id}</td>
                <td>{category.nome || category.name}</td>
                <td>{category.descricao || category.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReadCategory;
