function PokemonCard() {
  return (
    <div className="align-items-center image-wrapper w-100">
      <img
        className="image-card-pokedex w-50"
        src="/src/assets/pikachu.png"
      ></img>
      <div className="d-flex flex-column bg-light align-items-center rounded-5 w-100 mt-10 sombra">
        <h6 className="mt-5">#009</h6>
        <h4>Squirtle</h4>
        <div>
          <h3>Tipo</h3>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
