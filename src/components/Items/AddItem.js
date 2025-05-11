import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddItem = () => {
    const [Item, setItem] = useState({
        name: '',
        price: '',
        used: false,
        fk_category: ''
    });
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Buscar categorias para o select
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:8082/categories");
                setCategories(res.data);
            } catch (err) {
                toast.error("Erro ao buscar categorias");
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (name === "used") {
            setItem((prevItem) => ({
                ...prevItem,
                used: value === "true"
            }));
        } else if (name === "price") {
            setItem((prevItem) => ({
                ...prevItem,
                price: value
            }));
        } else {
            setItem((prevItem) => ({
                ...prevItem,
                [name]: value
            }));
        }
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8082/items", {
                ...Item,
                price: parseFloat(Item.price),
                fk_category: parseInt(Item.fk_category)
            });
            navigate("/");
        } catch (err) {
            toast.error("Erro ao cadastrar item");
        }
    }

    return (
        <div className="container">
            <h2 className='w-100 d-flex justify-content-center p-3'>Adicionando Item</h2>
            <div className='row'>
                <div className='col-md-12'>
                    <form>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Nome:</label>
                            <input type="text" className="form-control" id="name"
                                placeholder="Digite o nome do Item" name="name"
                                value={Item.name}
                                onChange={handleChange} />
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Preço:</label>
                            <input type="number" className="form-control" id="price"
                                placeholder="Digite o Preço do Item" name="price"
                                value={Item.price}
                                onChange={handleChange} />
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Usado ou Novo:</label>
                            <select
                                className="form-control"
                                name="used"
                                value={Item.used}
                                onChange={handleChange}
                            >
                                <option value={false}>Novo</option>
                                <option value={true}>Usado</option>
                            </select>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Categoria:</label>
                            <select
                                className="form-control"
                                name="fk_category"
                                value={Item.fk_category}
                                onChange={handleChange}
                            >
                                <option value="">Selecione uma categoria</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nome || cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary"
                            onClick={handleClick}>Cadastrar</button>
                        <br />
                        <div className="d-flex justify-content-center mt-3">
                          <Link to="/" className="btn btn-outline-secondary">
                            Listar Itens
                          </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddItem;