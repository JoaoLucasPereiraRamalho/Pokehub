function FeaturedSection() {
  return (
    <section className="featured-section sombra">
      <div className="featured-background-splitter"></div>

      {/* Imagem absoluta usada somente em md+ (mantém sua classe existente) */}
      <img
        src="/src/assets/charizard-mega-x.png"
        alt="Pokémon de Destaque"
        className="featured-dragon-img d-none d-md-block"
      />

      <div className="container p-0">
        <div className="row align-items-center m-0 w-100">
          {/* Coluna de conteúdo: no mobile ocupa 12, em md+ ocupa 6 (ou ajuste conforme necessário) */}
          <div className="col-12 col-md-6">
            <div className="featured-content col-6 col-md-12">
              <h2 className="featured-title">Novidade</h2>
              <p className="featured-text">
                Explore uma seleção especial de Pokémon com habilidades únicas e
                histórias fascinantes. Encontre seu próximo companheiro de
                aventura aqui! Explore uma seleção especial de Pokémon com
                habilidades únicas e histórias fascinantes. Encontre seu próximo
                companheiro de aventura aqui!
              </p>

              <div className="d-flex justify-content-center justify-content-md-start">
                <button className="btn-linear-2 rounded-pill w-75 w-md-50">
                  Saiba mais
                </button>
              </div>
            </div>
          </div>

          {/* Coluna "placeholder" para manter espaço para a imagem em md+.
              Em telas pequenas, exibimos a imagem dentro do fluxo (abaixo/ao lado do conteúdo). */}
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-end">
            {/* Imagem para telas pequenas — evita o comportamento absoluto que sobrepõe */}
            <img
              src="/src/assets/charizard-mega-x.png"
              alt="Pokémon de Destaque"
              className="img-fluid d-block d-md-none"
              style={{
                maxWidth: "70%",
                height: "auto",
                transform: "scaleX(-1)",
              }}
            />
            {/* A coluna md (em telas maiores) não precisa conter nada visível porque a imagem absoluta
                (.featured-dragon-img) vai posicionar-se sobre esta área. */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedSection;
