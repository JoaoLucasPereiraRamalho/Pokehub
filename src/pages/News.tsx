import Noticia from "../components/Noticia";
import Button from "../components/ui/Button";
// Importando seu botão padrão

function Noticias() {
  return (
    <div className="fundo-degrade py-5 px-3 px-md-0 fundo-degrade-noticias">
      {/* Container para limitar a largura e centralizar na tela */}
      <div className="container">
        {/* Cabeçalho */}
        <div className="text-center mb-5">
          <h1 className="text-white fw-bold display-5">Últimas Notícias</h1>
          <p className="text-white-50">
            Fique por dentro das novidades do mundo Pokémon
          </p>
        </div>

        {/* Caixa de Fundo das Notícias */}
        <div className="bg-noticias w-100 border-2 mx-auto rounded-4 p-4 p-lg-5 shadow-lg">
          {/* Grid Unificado (g-4 dá um espaçamento consistente) */}
          <div className="row g-4 justify-content-center">
            {/* Notícia 1 */}
            <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
              <Noticia
                title="Novos Pokémon Lendários Descobertos na Região de Kanto"
                date="25 de Outubro de 2025"
                category="Pokémon GO"
                imageUrl="https://lh3.googleusercontent.com/_hpVC_FfXKyiyQyAScEHT19zmprSPm6N_MueVEAod5KJNfDvl3LvZntgsY2Q6dscc2y-CSr8Tq5EOVgoFrli6EhyOWt_kTRKqh2S=s0-e365"
              />
            </div>

            {/* Notícia 2 */}
            <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
              <Noticia
                title="Atualização V.2.1 de Pokémon Scarlet e Violet"
                date="15 de Setembro de 2025"
                category="Jogos Eletrônicos"
                imageUrl="https://lh3.googleusercontent.com/KOV4yX_B6xcwZyt9SQhcmYWZ_H84MbQK7ng09C5NtWd2XxIUsas7jJXLRbHRd9uoBKjhIQxZoP3hLT2NFJsR-ANRVpkToVd1zQ"
              />
            </div>

            {/* Notícia 3 */}
            <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
              <Noticia
                title="Campeonato Mundial de Estampas Ilustradas 2025"
                date="03 de Agosto de 2025"
                category="TCG"
                imageUrl="https://i.ytimg.com/vi/GxQyaeZu_d8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC8aQ9NgW5Ah0ty1iwfMdRAErOf0Q"
              />
            </div>

            {/* Notícia 4 */}
            <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
              <Noticia
                title="Lançamento da Coleção 'Tesouros do Galar'"
                date="10 de Julho de 2025"
                category="TCG"
                imageUrl="https://static-cdn.jtvnw.net/jtv_user_pictures/cc5b65bc-2d55-4ff5-99b9-9a4071b9f96e-profile_banner-480.png"
              />
            </div>

            {/* Notícia 5 */}
            <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
              <Noticia
                title="Nova Série Animada de Pokémon Anunciada"
                date="01 de Junho de 2025"
                category="Anime"
                imageUrl="https://lh3.googleusercontent.com/u0VmmFxdNgE75u4ES6mxNQKiS5v-flZ0D9e3oSeVQd8wLupTKGS3XCRkym7t2hLwnxEHJj_mFHK2Opze0EBmS6bWdnJ8Q5KRdH8"
              />
            </div>

            {/* Notícia 6 */}
            <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
              <Noticia
                title="Evento de Reides: Enfrente Pokémon Shiny"
                date="15 de Setembro de 2025"
                category="Eventos"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwrxPZNnQ4oOWtExUcQ39fwNIv0Z20Cwgk0g&s"
              />
            </div>
          </div>

          {/* Botão Centralizado no final */}
          <div className="d-flex justify-content-center mt-5">
            <Button variant="linear-2" className="px-5 py-3">
              VER MAIS NOTÍCIAS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Noticias;
