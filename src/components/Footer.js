const Footer = () => (
  <footer className="navbar navbar-expand" style={{ background: 'var(--primary-light)', minHeight: 60 }}>
    <div className="container d-flex justify-content-center py-2">
      <span className="navbar-text text-light" style={{ fontSize: '1.05rem', letterSpacing: 1 }}>
        &copy; {new Date().getFullYear()} <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Itens App</span> &mdash; Fatec
      </span>
    </div>
  </footer>
);

export default Footer;
