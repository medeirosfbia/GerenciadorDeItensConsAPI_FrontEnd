import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [category, setCategory] = useState({
    name: '',
    description: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCategory((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8082/categories", category);
      navigate("/categories");
    } catch (err) {
      toast.error("Erro ao cadastrar categoria");
    }
  };

  return (
    <div className="container">
      <h2 className='w-100 d-flex justify-content-center p-3'>Adicionando Categoria</h2>
      <div className='row'>
        <div className='col-md-12'>
          <form>
            <div className="mb-3 mt-3">
              <label className="form-label">Nome:</label>
              <input type="text" className="form-control" id="name"
                placeholder="Digite o nome da Categoria" name="name"
                value={category.name}
                onChange={handleChange} />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Descrição:</label>
              <input type="text" className="form-control" id="description"
                placeholder="Digite a descrição da Categoria" name="description"
                value={category.description}
                onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary"
              onClick={handleClick}>Cadastrar</button>
            <br />
            <div className="d-flex justify-content-center mt-3">
              <Link to="/categories" className="btn btn-outline-secondary">
                Listar Categorias
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
