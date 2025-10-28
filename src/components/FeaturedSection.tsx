function FeaturedSection() {
  return (
    <section className="featured-section sombra">
      <div className="featured-background-splitter"></div>
      <img
        src="/src/assets/charizard-mega-x.png"
        alt="Pokémon de Destaque"
        className="featured-dragon-img"
      />

      {/* Usamos o contêiner do Bootstrap para padding e centralização */}
      <div className="container p-0">
        {/* A linha agora usa flex-column-reverse no mobile (xs) para a imagem aparecer primeiro,
            e flex-md-row no Medium e Large para o layout lado a lado. */}
        <div className="row flex-column-reverse flex-md-row m-0 w-100">
          {/* Coluna do Conteúdo:
              - xs: Ocupa 12 colunas, centralizado.
              - md: Ocupa 8 colunas (como antes).
              - lg: Ocupa 6 colunas (como antes).
          */}
          <div className="col-12 col-md-8 col-lg-6">
            <div className="featured-content">
              <h2 className="featured-title">Novidade</h2>
              <p className="featured-text">
                Explore uma seleção especial de Pokémon com habilidades únicas e
                histórias fascinantes. Encontre seu próximo companheiro de
                aventura aqui! Explore uma seleção especial de Pokémon com
                habilidades únicas e histórias fascinantes. Encontre seu próximo
                companheiro de aventura aqui! Explore uma seleção especial de
                Pokémon com habilidades únicas e histórias fascinantes. Encontre
                seu próximo companheiro de aventura aqui!
              </p>
              {/* O botão ocupará 75% da largura no mobile para ser maior, e 50% no desktop. */}
              <div className="d-flex justify-content-center justify-content-md-start">
                <button className="btn-linear-2 rounded-pill w-75 w-md-50">
                  Saiba mais
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedSection;
