import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ModalDelete from '../ModalDelete';

const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8082/categories");
        setCategories(res.data);
      } catch (err) {
        toast.error("Erro ao buscar categorias");
      }
    };
    fetchAllCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/categories/${id}`);
      setCategories(categories.filter(cat => cat.id !== id));
      setShowConfirm(false);
      setCategoryToDelete(null);
    } catch (err) {
      toast.error("Erro ao deletar categoria");
      setShowConfirm(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="container">
      <h2 className='w-100 d-flex justify-content-center p-3'>Listando Categorias</h2>
      <div className='row'>
        <div className='col-md-12'>
          <p>
            <Link to="/addCategory" className="btn btn-success">Adicionar nova Categoria</Link>
          </p>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">Nenhuma categoria encontrada.</td>
                </tr>
              ) : (
                [...categories]
                  .sort((a, b) => a.id - b.id)
                  .map((cat) => (
                    <tr key={cat.id}>
                      <td>{cat.id}</td>
                      <td>{cat.nome || cat.name}</td>
                      <td>{cat.descricao || cat.description}</td>
                      <td>
                        <Link
                          to={`/readCategory/${cat.id}`}
                          className="btn btn-success mx-2">Ler</Link>
                        <Link
                          to={`/updateCategory/${cat.id}`}
                          className="btn btn-info mx-2">Editar</Link>
                        <button
                          onClick={() => {
                            setShowConfirm(true);
                            setCategoryToDelete(cat.id);
                          }}
                          className="btn btn-danger">Deletar</button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
          <ModalDelete
            show={showConfirm}
            onCancel={() => { setShowConfirm(false); setCategoryToDelete(null); }}
            onConfirm={() => handleDelete(categoryToDelete)}
          />
        </div>
      </div>
    </div>
  );
};

export default ListCategories;
