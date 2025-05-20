
const ModalDelete = ({ show, onCancel, onConfirm }) => {
  if (!show) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, width: "100vw", height: "100vh",
        background: "rgba(0,0,0,0.5)", zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center"
      }}
    >
      <div style={{ background: "#fff", padding: 32, borderRadius: 8, minWidth: 300 }}>
        <h5>Você tem certeza que deseja deletar?</h5>
        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn btn-secondary mx-2"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="btn btn-danger"
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
