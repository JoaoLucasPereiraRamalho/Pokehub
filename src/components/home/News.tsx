function News() {
  return (
    <div className="container-fluid py-5">
      <div className="d-flex justify-content-center mb-5">
        <div
          className="bg-light p-3 text-center w-60"
          style={{ minWidth: "300px" }}
        >
          <h1>Notícias</h1>
        </div>
      </div>

      <div className="row g-4 mx-auto" style={{ maxWidth: "825px" }}>
        <div className="col-12 col-md-6">
          <div
            className="d-flex flex-column gap-2 h-100"
            style={{ backgroundColor: "#091D3C" }}
          >
            <div className="d-flex gap-2">
              <div className="w-50 bg-primary shadow-lg overflow-hidden">
                <img
                  className="w-100 h-100 object-fit-cover"
                  src="/src/assets/mega-dragnite.jpeg"
                  alt="Notícia 1"
                  style={{ minHeight: "70px" }}
                />
              </div>
              <div className="w-50 bg-success shadow-lg overflow-hidden">
                <img
                  className="w-100 h-100 object-fit-cover"
                  src="/src/assets/Mega-Hawlucha.jpg"
                  alt="Notícia 2"
                  style={{ minHeight: "70px" }}
                />
              </div>
            </div>

            <div className="w-100 h-100 bg-warning shadow-lg overflow-hidden">
              <img
                className="w-100 h-100 object-fit-cover"
                src="/src/assets/drampa.webp"
                alt="Haunter em destaque"
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="bg-light p-4 shadow-lg d-flex flex-column align-items-center justify-content-center text-center h-100">
            <h2 className="fs-3 fw-bold">Elas chegaram!</h2>
            <h4 className="text-secondary mb-3">
              Novas megas evoluções chegam ao jogo Z-A
            </h4>

            <img
              className="my-4 img-fluid"
              src="/src/assets/mega-evolution-symbol.png"
              alt="Imagem da Notícia"
              style={{ maxWidth: "300px", maxHeight: "100px" }}
            />

            <h6 className="text-secondary text-justify mb-4">
              A "mega evolução" é um tipo de transformação temporária em alguns
              Pokémon que aumenta seu poder, muda sua aparência e, às vezes, seu
              tipo. A mecânica de mega evolução está retornando no jogo futuro
              Pokémon Legends: Z-A e é um elemento central na expansão para o
              jogo, que incluirá uma série de novas mega evoluções.
            </h6>
            <button className="btn-linear-2 btn-lg mt-3 sombra">
              Ler mais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
