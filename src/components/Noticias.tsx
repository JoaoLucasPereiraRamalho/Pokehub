import Noticia from "./Noticia";

function Noticias() {
  return (
    // Adiciona padding responsivo
    <div
      style={{ backgroundColor: "#091D3C" }}
      className="fundo-degrade py-5 px-3 px-md-0"
    >
      {/* Título: Centralizado */}
      <div className="d-flex justify-content-center mb-4">
        <h1 className="text-white">Noticias</h1>
      </div>

      {/* Container Principal: Define a largura para desktop e padding no mobile */}
      <div className="bg-noticias w-75 w-md-75 border-2 mx-auto rounded-3 p-3 p-md-0">
        {/* Bloco de Notícias */}
        {/* Usamos o row do Bootstrap para gerenciar colunas e quebras de linha responsivas. */}
        {/* Os itens serão distribuídos em 1 coluna (col-12) no mobile e em 3 colunas (col-md-4) no desktop. */}
        <div className="row justify-content-center mx-0 py-4 py-md-4 g-4 g-md-5">
          {/* Item 1 */}
          <div className="col-12 col-md-4 d-flex justify-content-center">
            {/* Removemos a classe w-25 de Noticia, e a classe col-md-4/col-12 do pai agora controla a largura. */}
            <Noticia />
          </div>

          {/* Item 2 */}
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <Noticia />
          </div>

          {/* Item 3 */}
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <Noticia />
          </div>
        </div>

        {/* Separador (visível apenas no desktop) */}

        {/* Segunda Linha */}
        <div className="row justify-content-center mx-0 py-4 py-md-4 g-4 g-md-5">
          {/* Item 4 */}
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <Noticia />
          </div>

          {/* Item 5 */}
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <Noticia />
          </div>

          {/* Item 6 */}
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <Noticia />
          </div>
        </div>

        {/* Separador (visível apenas no desktop) */}
        <hr className="mt-4 bg-orange d-none d-md-block mx-5 my-0"></hr>

        {/* Terceira Linha */}
        <div className="row justify-content-center mx-0 py-4 py-md-4 g-4 g-md-5">
          {/* Item 7 */}
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <Noticia />
          </div>

          {/* Item 8 */}
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <Noticia />
          </div>

          {/* Item 9 */}
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <Noticia />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Noticias;
