import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [hover, setHover] = useState(false);
  const [btnHover, setBtnHover] = useState({});

  return (
    <nav className="navbar navbar-expand navbar-dark mb-4 shadow-sm" style={{ background: 'var(--primary)' }}>
      <div className="container d-flex justify-content-between align-items-center">
        <Link
          className="navbar-brand"
          to="/"
          style={{
            color: hover ? 'var(--accent-dark)' : 'var(--accent)',
            fontWeight: 900,
            fontSize: '2rem',
            letterSpacing: 2,
            transition: 'color 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Itens
        </Link>
        <div className="navbar-nav ms-auto d-flex flex-row align-items-center">
          <Link
            className="btn btn-primary mx-2"
            to="/"
            style={{
              cursor: 'pointer',
              filter: btnHover['itens'] ? 'brightness(1.15)' : 'none',
              transition: 'filter 0.2s'
            }}
            onMouseEnter={() => setBtnHover({ ...btnHover, itens: true })}
            onMouseLeave={() => setBtnHover({ ...btnHover, itens: false })}
          >
            Itens
          </Link>
          <Link
            className="btn btn-primary mx-2"
            to="/categories"
            style={{
              cursor: 'pointer',
              filter: btnHover['categorias'] ? 'brightness(1.15)' : 'none',
              transition: 'filter 0.2s'
            }}
            onMouseEnter={() => setBtnHover({ ...btnHover, categorias: true })}
            onMouseLeave={() => setBtnHover({ ...btnHover, categorias: false })}
          >
            Categorias
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
