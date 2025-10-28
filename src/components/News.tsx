function News() {
  return (
    <div
      style={{ backgroundColor: "#091D3C" }}
      className="container-fluid py-5"
    >
      <div className="d-flex justify-content-center mb-5">
        <div
          className="bg-light p-3 text-center w-75"
          style={{ minWidth: "300px" }}
        >
          <h1>Notícias</h1>
        </div>
      </div>

      <div className="row g-4 mx-auto" style={{ maxWidth: "1200px" }}>
        <div className="col-12 col-md-6">
          <div
            className="d-flex flex-column gap-2 h-100"
            style={{ backgroundColor: "#091D3C" }}
          >
            <div className="d-flex gap-2">
              <div className="w-50 bg-primary shadow-lg overflow-hidden">
                <img
                  className="w-100 h-100 object-fit-cover"
                  src="/src/assets/imagem1_feature_section.jpeg"
                  alt="Notícia 1"
                  style={{ minHeight: "100px" }}
                />
              </div>
              <div className="w-50 bg-success shadow-lg overflow-hidden">
                <img
                  className="w-100 h-100 object-fit-cover"
                  src="/src/assets/imagem1_feature_section.jpeg"
                  alt="Notícia 2"
                  style={{ minHeight: "100px" }}
                />
              </div>
            </div>

            <div className="w-100 h-100 bg-warning shadow-lg overflow-hidden">
              <img
                className="w-100 h-100 object-fit-cover"
                src="/src/assets/haunter_sem_fundo.png"
                alt="Haunter em destaque"
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="bg-light p-4 shadow-lg d-flex flex-column align-items-center justify-content-center text-center h-100">
            <h2 className="fs-3 fw-bold">Elas chegaram!</h2>
            <h4 className="text-secondary mb-3">
              Novas megas evoluções chegam ao jogo Zn
            </h4>

            <img
              className="my-4 img-fluid"
              src="/src/assets/imagem1_feature_section.jpeg"
              alt="Imagem da Notícia"
              style={{ maxWidth: "300px" }}
            />

            <h6 className="text-secondary text-justify mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen.
            </h6>
            <button className="btn btn-primary btn-lg mt-3">Ler mais</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
