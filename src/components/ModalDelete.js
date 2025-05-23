const ModalDelete = ({ show, onCancel, onConfirm }) => {
  if (!show) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, width: "100vw", height: "100vh",
        background: "rgba(26,35,126,0.18)", zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center"
      }}
    >
      <div style={{
        background: "#fff",
        padding: "2.2rem 2.5rem",
        borderRadius: 18,
        minWidth: 340,
        boxShadow: "0 4px 32px rgba(26,35,126,0.13)",
        border: "2px solid var(--accent)"
      }}>
        <h5 className="mb-3 text-center" style={{ color: "var(--accent-dark)", fontWeight: 700 }}>
          Você tem certeza que deseja deletar?
        </h5>
        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn btn-outline-secondary mx-2"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="btn btn-danger"
            style={{ fontWeight: 700 }}
            onClick={onConfirm}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
