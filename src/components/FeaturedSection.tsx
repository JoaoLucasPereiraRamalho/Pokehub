function FeaturedSection() {
  return (
    <section className="featured-section sombra">
      <div className="featured-background-splitter"></div>
      <img
        src="/src/assets/charizard-mega-x.png"
        alt="Pokémon de Destaque"
        className="featured-dragon-img"
      />

      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-8">
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
              <div className="d-flex justify-content-center">
                <button className="btn-linear-2 rounded-pill w-50">
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
