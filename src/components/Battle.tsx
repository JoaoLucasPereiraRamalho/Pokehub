function Battle() {
  const containerBg = "#2c3e50";
  const cardBg = "rgba(255, 255, 255, 0.2)";
  const POKEMON_IMAGE = "https://via.placeholder.com/100x100?text=Pokemon";

  return (
    <div
      style={{ backgroundColor: containerBg, minHeight: "80vh" }}
      className="text-white p-5"
    >
      <div className="container" style={{ maxWidth: "800px" }}>
        <h1 className="mb-4 fw-bold">Batalhar</h1>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="me-5">
            <img
              src={POKEMON_IMAGE}
              alt="Pokemon 1"
              style={{ width: "120px" }}
            />
          </div>

          <div
            className="p-3"
            style={{ ...{ backgroundColor: cardBg }, width: "250px" }}
          >
            <div className="d-flex justify-content-between mb-1">
              <h5 className="mb-0">Nome Lv.XX</h5>
              <span className="badge bg-danger">TIPO</span>
            </div>
            <div className="progress mb-2" style={{ height: "8px" }}>
              <div
                className="progress-bar bg-success"
                style={{ width: "100%" }}
              ></div>
            </div>
            <h6 className="mb-0 small">Treinador XXXXX</h6>
          </div>
        </div>

        <div
          className="position-relative w-100 my-4"
          style={{ height: "10px" }}
        >
          <hr className="w-100 border-white border-1 mb-0" />
          <div
            className="rounded-circle bg-white position-absolute top-50 start-50 translate-middle border border-1 border-danger"
            style={{ width: "15px", height: "15px", zIndex: 10 }}
          ></div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div
            className="p-3"
            style={{ ...{ backgroundColor: cardBg }, width: "250px" }}
          >
            <div className="d-flex justify-content-between mb-1">
              <h5 className="mb-0">Nome Lv.XX</h5>
              <span className="badge bg-danger">TIPO</span>
            </div>
            <div className="progress mb-2" style={{ height: "8px" }}>
              <div
                className="progress-bar bg-success"
                style={{ width: "100%" }}
              ></div>
            </div>
            <h6 className="mb-0 small">Treinador YYYYY</h6>
          </div>

          <div className="ms-5">
            <img
              src={POKEMON_IMAGE}
              alt="Pokemon 2"
              style={{ width: "120px" }}
            />
          </div>
        </div>

        <div className="text-center mt-5">
          <button className="btn btn-danger btn-lg px-5 py-3 fw-bold rounded-1 shadow-lg">
            BATALHAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default Battle;
