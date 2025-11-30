import Button from "../components/ui/Button";

function Battle() {
  const containerBg = "#091D3C";

  return (
    <div
      style={{ backgroundColor: containerBg }}
      className="text-white min-vh-100 d-flex flex-column justify-content-center fundo-degrade-itens"
    >
      <div className="container py-5">
        <h1 className="mb-5 fw-bold text-center text-md-start">Batalhar</h1>

        {/* --- POKEMON 1 (Pikachu) --- */}
        {/* Mobile: Coluna (Imagem em cima). Desktop: Linha (Imagem na esquerda) */}
        <div className="d-flex flex-column flex-md-row align-items-center mb-5 mb-md-3">
          {/* Imagem */}
          <div className="mb-3 mb-md-0 me-md-5 text-center">
            <img
              src="/src/assets/pikachu.png"
              alt="Pikachu"
              className="img-fluid"
              style={{ width: "120px", maxWidth: "150px" }}
            />
          </div>

          {/* Card de Status */}
          <div
            className="p-3 bg-transparent rounded-3 w-100"
            style={{ maxWidth: "350px" }} // Limita largura apenas em telas grandes
          >
            <div className="d-flex justify-content-between mb-1">
              <h5 className="mb-0">Pikachu Lv.14</h5>
              <span className="badge bg-warning text-dark">ELECTRIC</span>
            </div>
            <div className="progress mb-2" style={{ height: "8px" }}>
              <div
                className="progress-bar bg-success"
                style={{ width: "80%" }} // Ajustei visualmente
              ></div>
            </div>
            <hr className="my-2 opacity-50"></hr>
            <h6 className="mb-0 small text-light opacity-75">
              Treinador Marcos
            </h6>
          </div>
        </div>

        {/* Divisor Visual (Linha do meio) */}
        <div
          className="position-relative w-100 my-5 d-none d-md-block"
          style={{ height: "2px" }}
        >
          <hr className="w-100 border-white border-1 m-0" />
        </div>

        {/* --- POKEMON 2 (Squirtle) --- */}
        {/* Mobile: Coluna (Invertida ou Normal). Vamos manter Card em cima da imagem ou padrão? 
            Para mobile, geralmente Imagem -> Info é melhor, mas vamos adaptar para 
            ficar visualmente alinhado à direita no desktop.
        */}
        <div className="d-flex flex-column flex-md-row justify-content-end align-items-center mt-3">
          {/* Card de Status (No desktop vem antes da imagem) */}
          {/* A ordem visual no mobile será controlada pela ordem do HTML ou classes 'order' */}
          <div
            className="p-3 bg-transparent rounded-3 w-100 order-2 order-md-1"
            style={{ maxWidth: "350px" }}
          >
            <div className="d-flex justify-content-between mb-1">
              <h5 className="mb-0">Squirtle Lv.13</h5>
              <span className="badge bg-primary">WATER</span>
            </div>
            <div className="progress mb-2" style={{ height: "8px" }}>
              <div
                className="progress-bar bg-success"
                style={{ width: "60%" }}
              ></div>
            </div>
            <hr className="my-2 opacity-50"></hr>
            <h6 className="mb-0 small text-light opacity-75">Treinador Ash</h6>
          </div>

          {/* Imagem (No desktop vem depois) */}
          <div className="mb-3 mb-md-0 ms-md-5 text-center order-1 order-md-2">
            <img
              src="/src/assets/squirtle.png"
              alt="Squirtle"
              className="img-fluid"
              style={{ width: "120px", maxWidth: "150px" }}
            />
          </div>
        </div>

        {/* Botão de Ação */}
        <div className="text-center mt-5 pt-4">
          <Button variant="danger">BATALHAR</Button>
        </div>
      </div>
    </div>
  );
}

export default Battle;
