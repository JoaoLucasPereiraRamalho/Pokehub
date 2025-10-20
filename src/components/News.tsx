function News() {
  return (
    <div className="m-5">
      <div className="w-100 d-flex justify-content-center mb-5">
        <h1>Noticias</h1>
      </div>

      <div className="d-flex gap-5">
        <div className="w-50 bg-light d-flex flex-column gap-2">
          <div className="d-flex gap-2">
            <div className="w-50 bg-primary">
              <img src="" />
            </div>
            <div className="w-50 bg-success">
              <img src="" />
            </div>
          </div>

          <div className="w-100 bg-warning">
            <img src="" />
          </div>
        </div>

        <div className="w-50 bg-primary">
          <h2>Mais Lidas</h2>
          <h4>Titulo Noticia 1</h4>
          <img src="" />
          <h6>Resumo Noticia 1</h6>
          <button className="btn btn-outline-light text-white bg-dark border-0 rounded-pill mt-3 py-2 px-4">
            Ler mais
          </button>
        </div>
      </div>
    </div>
  );
}

export default News;
