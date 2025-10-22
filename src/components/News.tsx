function News() {
  return (
    <div style={{ backgroundColor: "#091D3C" }} className="">
      <div className="py-5 d-flex justify-content-center">
        <div className="bg-light w-75 d-flex justify-content-center mb-5">
          <h1>Noticias</h1>
        </div>
      </div>

      <div className="d-flex gap-5 w-75 mx-auto py-4">
        <div
          style={{ backgroundColor: "#091D3C" }}
          className="w-50 d-flex flex-column gap-2"
        >
          <div className="d-flex gap-2">
            <div className="w-50 bg-primary">
              <img
                className="w-100 h-100"
                src="/src/assets/imagem1_feature_section.jpeg"
              />
            </div>
            <div className="w-50 bg-success">
              <img
                className="w-100 h-100"
                src="/src/assets/imagem1_feature_section.jpeg"
              />
            </div>
          </div>

          <div className="w-100 bg-warning">
            <img
              className="w-100 h-100"
              src="/src/assets/haunter_sem_fundo.png"
            />
          </div>
        </div>

        <div className="w-50 bg-light p-4 d-flex flex-column align-items-center justify-content-center text-center">
          <h2>Elas chegaram!</h2>
          <h4>Novas megas evoluções chegam ao jogo Zn</h4>
          <img className="m-5" src="/src/assets/imagem1_feature_section.jpeg" />
          <h6 className="text-justify mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen.
          </h6>
          <button className="btn-linear-2">Ler mais</button>
        </div>
      </div>
    </div>
  );
}

export default News;
