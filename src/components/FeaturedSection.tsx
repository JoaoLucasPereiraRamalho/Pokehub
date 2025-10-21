function FeaturedSection() {
  return (
    <div className="bg-light">
      <div className="d-flex text-primary">
        <div className="m-5 w-50">
          <div className="h-75">
            <h1 className="display-2">Novidade</h1>
            <h5>Descubra Pokemons Incríveis!</h5>
            <h6>
              Explore uma seleção especial de Pokémons com habilidades únicas e
              histórias fascinantes. Encontre seu próximo companheiro de
              aventura aqui!
            </h6>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn-linear-2">Saiba Mais</button>
          </div>
        </div>
        <div className="d-flex w-50 bg-light">
          <img
            className="w-100 mx-auto d-block"
            src="/src/assets/imagem1_feature_section.jpeg"
          />
        </div>
      </div>
    </div>
  );
}

export default FeaturedSection;
