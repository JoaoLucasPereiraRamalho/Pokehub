import Card from "./Card";

function Compare() {
  return (
    <div className="m-5 bg-secondary d-flex">
      <div className="w-50 m-5">
        <h1>COMPARAR E DESCOBRIR!</h1>
        <h6 className="mb-5">
          Comparar os status dos pokemons de maneira simples e rapida
        </h6>
        <button className="btn btn-outline-light text-white bg-primary border-0 rounded-pill mt-5 py-3 w-50">
          COMPARE JÁ
        </button>
      </div>
      <div className="w-50 d-flex p-5 gap-3">
        <Card />
        <h1 className="">VS</h1>
        <Card />
      </div>
    </div>
  );
}
export default Compare;
