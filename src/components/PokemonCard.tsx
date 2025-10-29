function PokemonCard(props: any) {
  const type1Name = props.type1 ? props.type1.toUpperCase() : "";
  const type2Name =
    props.type2 && props.type2 !== "undefined"
      ? props.type2.toUpperCase()
      : null;

  return (
    <div
      className="align-items-center w-100 p-1"
      onClick={() => props.onSelectPokemon(props.name)}
      style={{ marginTop: "2.5rem" }}
    >
      <div className="d-flex image-wrapper justify-content-center w-100">
        <img
          className="image-card-pokedex w-50"
          src={props.imgAnimada}
          alt={props.name}
        />
      </div>

      <div
        className="d-flex flex-column bg-light align-items-center rounded-5 w-100 sombra p-3 overflow-hidden"
        style={{ marginTop: "-2rem", paddingTop: "2.5rem" }}
      >
        <h6 className="mt-2 text-muted">#{props.id}</h6>
        <h2 className="fs-5 text-capitalize text-center">{props.name}</h2>
        <div className="d-flex gap-2 justify-content-center my-2">
          <div
            style={{ backgroundColor: props.type1Color, whiteSpace: "nowrap" }}
            className="rounded-1 text-white py-1 px-2"
          >
            <h6 className="m-0 fs-10">{type1Name}</h6>
          </div>
          {props.type2Color && type2Name && (
            <div
              style={{
                backgroundColor: props.type2Color,
                whiteSpace: "nowrap",
              }}
              className="rounded-1 text-white py-1 px-2"
            >
              <h6 className="m-0 fs-10">{type2Name}</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
