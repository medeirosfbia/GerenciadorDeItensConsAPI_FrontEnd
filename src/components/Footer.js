import React from 'react';

const Footer = () => (
  <footer className="navbar navbar-expand navbar-dark bg-dark mt-4">
    <div className="container d-flex justify-content-center">
      <span className="navbar-text text-light">
        &copy; {new Date().getFullYear()} Itens App &mdash; Fatec
      </span>
    </div>
  </footer>
);

export default Footer;
