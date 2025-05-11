import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Estilo para o hover do título (mais simples)
const brandDefault = { fontWeight: 'bold', fontSize: '1.5rem', transition: 'color 0.2s' };
const brandHover = { ...brandDefault, color: '#ffc107' };

const Header = () => {
  const [hover, setHover] = useState(false);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
      <div className="container">
        <Link
          className="navbar-brand"
          to="/"
          style={hover ? brandHover : brandDefault}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Itens App
        </Link>
        <div className="navbar-nav">
          <Link className="btn btn-primary mx-2" to="/">Itens</Link>
          <Link className="btn btn-primary mx-2" to="/categories">Categorias</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
