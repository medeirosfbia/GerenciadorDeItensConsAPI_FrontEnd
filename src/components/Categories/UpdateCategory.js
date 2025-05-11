import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({
    name: "",
    description: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8082/categories/" + id)
      .then(res => setCategory({
        name: res.data.name || "",
        description: res.data.description || ""
      }))
      .catch(() => toast.error("Erro ao buscar categoria"));
  }, [id]);

  const handleChange = (e) => {
    setCategory((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8082/categories/${id}`, category);
      navigate("/categories");
    } catch (err) {
      toast.error("Erro ao atualizar categoria");
    }
  };

  return (
    <div className="container">
      <h1>Formulário para Editar a Categoria</h1>
      <form>
        <div className="mb-3 mt-3">
          <label className="form-label">ID:</label>
          <input type="text" className="form-control" id="id"
            placeholder="ID"
            name="id" value={id}
            disabled />
        </div>
        <div className="mb-3 mt-3">
          <label className="form-label">Nome</label>
          <input type="text" className="form-control" id="name"
            placeholder="Nome da Categoria"
            name="name" value={category.name}
            onChange={handleChange} />
        </div>
        <div className="mb-3 mt-3">
          <label className="form-label">Descrição</label>
          <input type="text" className="form-control" id="description"
            placeholder="Descrição da Categoria"
            name="description" value={category.description}
            onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary"
          onClick={handleClick}>Alterar</button>
      </form>
      <div className='d-flex justify-content-center mt-3'>
        <Link to="/categories" className="btn btn-outline-secondary">
          Veja todas as categorias
        </Link>
      </div>
    </div>
  );
};

export default UpdateCategory;
