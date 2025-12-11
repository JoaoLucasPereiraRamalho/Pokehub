function FeaturedSection() {
  return (
    <section className="featured-section bg-white sombra">
      <div className="featured-background-splitter"></div>

      <img
        src="/src/assets/charizard-mega-x.png"
        alt="Pokémon de Destaque"
        className="featured-dragon-img d-none d-md-block"
      />

      <div className="container p-0">
        <div className="row align-items-center m-0 w-100">
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
                <button className="btn-linear-2 w-75 w-md-50">
                  Saiba mais
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 d-flex justify-content-center align-items-end">
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedSection;
