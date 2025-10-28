function Battle() {
  const containerBg = "#091D3C";

  return (
    <div style={{ backgroundColor: containerBg }} className="text-white p-5">
      <div className="container" style={{ maxWidth: "1000px" }}>
        <h1 className="mb-4 fw-bold">Batalhar</h1>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="me-5">
            <img src="/src/assets/pikachu.png" style={{ width: "120px" }} />
          </div>

          <div className="p-3 bg-transparent" style={{ width: "250px" }}>
            <div className="d-flex justify-content-between mb-1">
              <h5 className="mb-0">PikachuLv.14</h5>
              <span className="badge bg-danger">ELETRIC</span>
            </div>
            <div className="progress mb-2" style={{ height: "8px" }}>
              <div
                className="progress-bar bg-success"
                style={{ width: "100%" }}
              ></div>
            </div>
            <hr></hr>
            <h6 className="mb-0 small">Treinador Marcos</h6>
          </div>
        </div>

        <div
          className="position-relative w-100 my-4"
          style={{ height: "10px" }}
        >
          <hr className="w-100 border-white border-1 mb-0" />
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="p-3 bg-transparent" style={{ width: "250px" }}>
            <div className="d-flex justify-content-between mb-1">
              <h5 className="mb-0">Squirtle Lv.13</h5>
              <span className="badge bg-danger">WATER</span>
            </div>
            <div className="progress mb-2" style={{ height: "8px" }}>
              <div
                className="progress-bar bg-success"
                style={{ width: "100%" }}
              ></div>
            </div>
            <hr></hr>
            <h6 className="mb-0 small">Treinador Ash</h6>
          </div>

          <div className="ms-5">
            <img src="/src/assets/pikachu.png" style={{ width: "120px" }} />
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
