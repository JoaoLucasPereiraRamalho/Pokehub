function PokemonCard(props: any) {
  return (
    <div
      className="align-items-center image-wrapper w-100 mt-10"
      onClick={() => props.onSelectPokemon(props.name)}
    >
      <img className="image-card-pokedex w-50" src={props.imgAnimada}></img>
      <div className="d-flex flex-column bg-light align-items-center rounded-5 w-100 mt-10 sombra">
        <h6 className="mt-5">{props.id}</h6>
        <h2>{props.name}</h2>
        <div className="d-flex gap-4 justify-content-between">
          <h3>{props.type1}</h3>
          {props.type2 != "undefined" ? <h3>{props.type2}</h3> : null}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
