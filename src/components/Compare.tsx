import Card from "./Card";

function Compare() {
  return (
    <div
      style={{ backgroundColor: "#091D3C" }}
      className="d-flex justify-content-center"
    >
      <div className="m-5 bg-transparent d-flex rounded-5 w-85">
        <div className="w-50 m-5">
          <div className="w-100 h-75">
            <h1 className="text-white display-3 fw-bold">
              COMPARAR E DESCOBRIR!
            </h1>
            <h6 className="mb-5 text-info">
              Comparar os status dos pokemons de maneira simples e rapida
            </h6>
          </div>
          <div className="d-flex flex-column-reverse h-25">
            <button className="btn-linear-2 py-3 w-50">COMPARE JÁ</button>
          </div>
        </div>
        <div className="w-50 d-flex p-5 gap-3">
          <Card />
          <h1 className="">VS</h1>
          <Card />
        </div>
      </div>
    </div>
  );
}
export default Compare;
