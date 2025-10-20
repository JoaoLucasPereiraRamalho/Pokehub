function FeaturedSection() {
  return (
    <div className="bg-success">
      <div className="d-flex m-5">
        <div className="w-50">
          <h1>Featured Section</h1>
          <h5>Descubra Pokemons Incríveis!</h5>
          <h6>
            Explore uma seleção especial de Pokémons com habilidades únicas e
            histórias fascinantes. Encontre seu próximo companheiro de aventura
            aqui!
          </h6>
          <div className="d-flex justify-content-center">
            <button className="btn btn-outline-light text-white bg-primary border-0 rounded-pill mt-3 py-3 px-4">
              Saiba Mais
            </button>
          </div>
        </div>
        <div className="d-flex w-50 bg-light">
          <h1>Imagem</h1>
          <img src="" />
        </div>
      </div>
    </div>
  );
}

export default FeaturedSection;
