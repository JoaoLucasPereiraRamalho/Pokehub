function PokemonCard(props: any) {
  return (
    <div
      className="align-items-center image-wrapper w-100 mt-10 p-1"
      onClick={() => props.onSelectPokemon(props.name)}
    >
      <img className="image-card-pokedex w-50" src={props.imgAnimada}></img>
      <div className="d-flex flex-column bg-light align-items-center rounded-5 w-100 mt-10 sombra">
        <h6 className="mt-5">{props.id}</h6>
        <h2>{props.name}</h2>
        <div className="d-flex gap-4 justify-content-between">
          <div
            style={{ backgroundColor: props.type1Color }}
            className="rounded-1 text-white mb-1 py-1 px-2"
          >
            <h6 className="">{props.type1.toUpperCase()}</h6>
          </div>
          <div
            style={{ backgroundColor: props.type2Color }}
            className="rounded-1 text-white mb-1 py-1 px-2"
          >
            {props.type2 != "undefined" ? (
              <h6>{props.type2.toUpperCase()}</h6>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
