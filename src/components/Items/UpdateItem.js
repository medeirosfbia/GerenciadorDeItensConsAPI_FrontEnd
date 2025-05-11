import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateItem() {
    const { id } = useParams();
    const [item, setItem] = useState({
        name: "",
        price: "",
        used: false,
        fk_category: ""
    });
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Buscar dados do item
        axios.get("http://localhost:8082/items/" + id)
            .then(res => {
                setItem({
                    ...res.data,
                    price: res.data.price,
                    used: !!res.data.used,
                    fk_category: res.data.fk_category
                });
            })
            .catch(() => toast.error("Erro ao buscar item"));
        // Buscar categorias
        axios.get("http://localhost:8082/categories")
            .then(res => setCategories(res.data))
            .catch(() => toast.error("Erro ao buscar categorias"));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "used") {
            setItem((prev) => ({
                ...prev,
                used: value === "true"
            }));
        } else {
            setItem((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8082/items/${id}`, {
                ...item,
                price: parseFloat(item.price),
                fk_category: parseInt(item.fk_category)
            });
            navigate("/");
        } catch (err) {
            toast.error("Erro ao atualizar item");
        }
    };

    return (
        <div className="container">
            <h1>Formulário para Editar o Item</h1>
            <form>
                <div className="mb-3 mt-3">
                    <label className="form-label">ID:</label>
                    <input type="text" className="form-control" id="id"
                        placeholder="ID"
                        name="id" value={item.id}
                        disabled />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" id="name"
                        placeholder="Nome do Item"
                        name="name" value={item.name || ""}
                        onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Preço</label>
                    <input type="number" className="form-control" id="price"
                        placeholder="Preço do Item"
                        name="price" value={item.price}
                        onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Usado ou Novo</label>
                    <select
                        className="form-control"
                        name="used"
                        value={item.used}
                        onChange={handleChange}
                    >
                        <option value={false}>Novo</option>
                        <option value={true}>Usado</option>
                    </select>
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Categoria</label>
                    <select
                        className="form-control"
                        name="fk_category"
                        value={item.fk_category}
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
                <div className="mb-3 mt-3">
                    <label className="form-label">createdAt:</label>
                    <input type="text" className="form-control"
                        id="createdAt" placeholder="Data da criação"
                        name="createdAt" value={item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                        disabled />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">updatedAt:</label>
                    <input type="text" className="form-control"
                        id="updatedAt" placeholder="Data de Alteração"
                        name="updatedAt" value={item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : ""}
                        disabled />
                </div>
                <button type="submit" className="btn btn-primary"
                    onClick={handleClick}>Alterar</button>
            </form>
            <div className='d-flex justify-content-center mt-3'>
                <Link to="/items" className="btn btn-outline-secondary">
                    Veja todos os itens
                </Link>
            </div>
        </div>
    );
}

export default UpdateItem;