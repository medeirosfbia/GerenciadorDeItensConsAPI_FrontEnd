import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";

const NavCategories = ({ onSelectCategory, selectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8082/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => {
        setCategories([]);
        toast.error("Erro ao buscar categorias");
      });
  }, []);

  return (
    <div className="mb-3" style={{ overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: 8 }}>
      <button
        className={`btn mx-1 ${!selectedCategory ? 'btn-primary' : 'btn-outline-secondary'}`}
        style={{ minWidth: 120, marginBottom: 4, borderRadius: 18, fontWeight: 600 }}
        onClick={() => onSelectCategory(null)}
      >
        Todas
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          className={`btn mx-1 ${selectedCategory === cat.id ? 'btn-primary' : 'btn-outline-secondary'}`}
          style={{ minWidth: 120, marginBottom: 4, borderRadius: 18, fontWeight: 600 }}
          onClick={() => onSelectCategory(cat.id)}
        >
          {cat.nome || cat.name}
        </button>
      ))}
    </div>
  );
};

export default NavCategories;
