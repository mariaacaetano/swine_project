import './Erro404.css'

export default function Error404() {
  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-text">
          <h1>404</h1>
          <h2>Oinc! Página não encontrada</h2>
          <p>
            Parece que essa página sumiu... talvez o porquinho tenha levado 🐷
          </p>

          <div className="buttons">
            <button className="btn-secondary" onClick={() => window.history.back()}>
              Voltar
            </button>
            <button className="btn-primary" onClick={() => (window.location.href = "/")}>
              Home
            </button>
          </div>
        </div>

        <div className="error-image">
          <img src={"./pig_error.jpg"} alt="Porquinho" />
        </div>
      </div>
    </div>
  );
}