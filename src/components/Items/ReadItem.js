import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ReadItem = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        axios.get("http://localhost:8082/items/" + id)
            .then(res => {
                setItem(res.data);
                if (res.data.fk_category) {
                    axios.get("http://localhost:8082/categories/" + res.data.fk_category)
                        .then(catRes => {
                            setCategoryName(catRes.data.nome || catRes.data.name || '');
                        })
                        .catch(() => setCategoryName(res.data.fk_category));
                }
            }).catch(() => toast.error("Erro ao buscar item"));
    }, [id]);

    return (
        <div className="container">
            <div className='row'>
                <div className='col-md-12'>
                    <h1>Detalhes do Item</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Categoria</th>
                                <th>Preço</th>
                                <th>Novo ou Usado?</th>
                                <th>Data Cadastro</th>
                                <th>Data Alteração</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.nome || item.name}</td>
                                <td>{categoryName}</td>
                                <td>{item.price}</td>
                                <td>{item.used ? "Usado" : "Novo"}</td>
                                <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</td>
                                <td>{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ReadItem;