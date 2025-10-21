function Card() {
  return (
    <div
      style={{ width: 250, overflow: "hidden" }}
      className="bg-success rounded-1"
    >
      <div className=" position-relative">
        <h6 className="position-absolute end-0">#021</h6>
        <img
          className="w-100 img-fluid mx-auto d-block"
          src="/src/assets/pikachu.png"
        />
      </div>
      <div className="bg-light p-0" style={{ padding: 0 }}>
        <div className="d-flex justify-content-between m-2">
          <h2 className="w-50">Haunter</h2>
          {/* Nome do Pokemon sera dinamico*/}
          <img
            className="m-2"
            style={{ width: 25, height: 25 }}
            src="/src/assets/ghost.png"
          />
        </div>
        <div className="d-flex">
          <div className="btn btn-dark rounded-2 mb-2 w-50 d-flex justify-content-left m-2">
            <div>
              <h6 className="w-50">
                Ver <br></br>Detalhes
              </h6>
            </div>
            <div>
              <button className="m-2 rounded-circle w-75 border-primary bg-info">
                <img className="w-50" src="/src/assets/ghost.png" />
              </button>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center gap-1 w-50">
            <button className="w-75 border-1 bg-success text-white rounded-pill">
              BST:320
            </button>
            <button className="w-75 border-1 bg-dark text-white rounded-pill">
              A
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
