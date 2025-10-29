import Noticia from "./Noticia";

function Noticias() {
  return (
    // Adiciona padding responsivo
    <div
      style={{ backgroundColor: "#091D3C" }}
      className="fundo-degrade py-5 px-3 px-md-0 fundo-degrade-noticias"
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
            <Noticia
              title="Novos Pokémon Lendários Descobertos na Região de Kanto"
              date="25 de Outubro de 2025"
              category="Pokémon GO"
              imageUrl="https://lh3.googleusercontent.com/_hpVC_FfXKyiyQyAScEHT19zmprSPm6N_MueVEAod5KJNfDvl3LvZntgsY2Q6dscc2y-CSr8Tq5EOVgoFrli6EhyOWt_kTRKqh2S=s0-e365"
            />
          </div>

          {/* Item 2 */}
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <Noticia
              title="Atualização V.2.1 de Pokémon Scarlet e Violet Chega com Melhorias de Performance"
              date="15 de Setembro de 2025"
              category="Jogos Eletrônicos"
              imageUrl="https://lh3.googleusercontent.com/KOV4yX_B6xcwZyt9SQhcmYWZ_H84MbQK7ng09C5NtWd2XxIUsas7jJXLRbHRd9uoBKjhIQxZoP3hLT2NFJsR-ANRVpkToVd1zQ"
            />
          </div>

          {/* Item 3 */}
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <Noticia
              title="Campeonato Mundial de Estampas Ilustradas 2025: Resultados e Baralhos Vencedores"
              date="03 de Agosto de 2025"
              category="Pokémon Estampas Ilustradas"
              imageUrl="https://i.ytimg.com/vi/GxQyaeZu_d8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC8aQ9NgW5Ah0ty1iwfMdRAErOf0Q"
            />
          </div>
        </div>

        {/* Separador (visível apenas no desktop) */}
        <hr className="mt-4 bg-orange d-none d-md-block mx-5 my-0"></hr>
        {/* Segunda Linha */}
        <div className="row justify-content-center mx-0 py-4 py-md-4 g-4 g-md-5">
          {/* Item 4 */}
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <Noticia
              title="Lançamento da Coleção 'Tesouros do Galar' Traz Cartas Ultra Raras Inéditas"
              date="10 de Julho de 2025"
              category="Pokémon Estampas Ilustradas"
              imageUrl="https://static-cdn.jtvnw.net/jtv_user_pictures/cc5b65bc-2d55-4ff5-99b9-9a4071b9f96e-profile_banner-480.png"
            />
          </div>

          {/* Item 5 */}
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <Noticia
              title="Anunciada Nova Série Animada de Pokémon para a Próxima Temporada"
              date="01 de Junho de 2025"
              category="Anime & Séries"
              imageUrl="https://lh3.googleusercontent.com/u0VmmFxdNgE75u4ES6mxNQKiS5v-flZ0D9e3oSeVQd8wLupTKGS3XCRkym7t2hLwnxEHJj_mFHK2Opze0EBmS6bWdnJ8Q5KRdH8"
            />
          </div>

          {/* Item 6 */}
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <Noticia
              title="Atualização V.2.1 de Pokémon Scarlet e Violet Chega com Melhorias de Performance"
              date="15 de Setembro de 2025"
              category="Jogos Eletrônicos"
              imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwrxPZNnQ4oOWtExUcQ39fwNIv0Z20Cwgk0g&s"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Noticias;
