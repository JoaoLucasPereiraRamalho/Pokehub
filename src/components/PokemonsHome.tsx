import Card from "./Card";

function PokemonsHome() {
  return (
    <div
      style={{ backgroundColor: "#091D3C" }}
      className="container-fluid py-5"
    >
      <h1 className="py-5 text-white">Pokemons</h1>
      <div className="d-flex justify-content-center gap-3">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-success py-3 mt-5 w-25">
          <h3>Carregar mais</h3>
        </button>
      </div>
    </div>
  );
}

export default PokemonsHome;
