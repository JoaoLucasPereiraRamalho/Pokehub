import Card from "./Card";

function PokemonsHome() {
  return (
    <div className="container-fluid">
      <h1 className="m-5">Pokemons</h1>
      <div className="d-flex justify-content-center gap-3">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-success py-4 mt-5 w-25"></button>
      </div>
    </div>
  );
}

export default PokemonsHome;
