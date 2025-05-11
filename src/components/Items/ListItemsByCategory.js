import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import NavCategories from '../Categories/NavCategories';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalDelete from '../ModalDelete';

const ListItemsByCategory = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { id: categoryIdParam } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemsByCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:8082/items/category/${categoryIdParam}`);
        setItems(res.data);
      } catch (err) {
        toast.error("Erro ao buscar itens da categoria");
      }
    };
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8082/categories");
        setCategories(res.data);
      } catch (err) {
        toast.error("Erro ao buscar categorias");
      }
    };
    if (categoryIdParam) {
      fetchItemsByCategory();
    }
    fetchAllCategories();
  }, [categoryIdParam]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/items/${id}`);
      setItems(items.filter(item => item.id !== id));
      setShowConfirm(false);
      setItemToDelete(null);
    } catch (err) {
      toast.error("Erro ao deletar item");
      setShowConfirm(false);
      setItemToDelete(null);
    }
  };

  const getCategoryName = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.nome || cat.name : categoryId;
  };

  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="container">
      <h2 className='w-100 d-flex justify-content-center p-3'>Listando Itens</h2>
      <div className='row'>
        <div className='col-md-12'>
          <NavCategories
            selectedCategory={categoryIdParam ? Number(categoryIdParam) : null}
            onSelectCategory={(catId) => {
              if (catId) {
                navigate(`/items/category/${catId}`);
              } else {
                navigate('/');
              }
            }}
          />
          <p>
            <Link to="/addItem" className="btn btn-success">Adicionar novo Item</Link>
          </p>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Novo ou Usado?</th>
                <th>Data Cadastro</th>
                <th>Data Alteração</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">Nenhum item encontrado.</td>
                </tr>
              ) : (
                [...items]
                  .sort((a, b) => a.id - b.id)
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nome || item.name}</td>
                      <td>{getCategoryName(item.fk_category)}</td>
                      <td>{item.price}</td>
                      <td>{item.used ? "Usado" : "Novo"}</td>
                      <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</td>
                      <td>{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : ''}</td>
                      <td>
                        <Link
                          to={`/readItem/${item.id}`}
                          className="btn btn-success mx-2">Ler</Link>
                        <Link
                          to={`/updateItem/${item.id}`}
                          className="btn btn-info mx-2">Editar</Link>
                        <button
                          onClick={() => {
                            setShowConfirm(true);
                            setItemToDelete(item.id);
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
            onCancel={() => { setShowConfirm(false); setItemToDelete(null); }}
            onConfirm={() => handleDelete(itemToDelete)}
          />
        </div>
      </div>
    </div>
  );
};

export default ListItemsByCategory;
