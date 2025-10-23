import PokemonCard from "./PokemonCard";

function Pokedex() {
  return (
    <div className="">
      <div
        style={{ backgroundColor: "#091D3C" }}
        className=" d-flex input-fundo w-100"
      >
        <h1 className="text-white">Pokedex</h1>
      </div>
      <div className="d-flex">
        <div
          style={{ backgroundColor: "#091D3C" }}
          className="d-flex flex-column w-75"
        >
          <div className="d-flex flex-column w-100 mt-5 input-fundo">
            <div className="div-btn-red d-flex justify-content-end w-100 px-2">
              <button className="btn-red sombra-red p-0 border-0 rounded-2">
                <img
                  className="w-100 h-100 object-fit-cover rounded-2"
                  src="/src/assets/poke.png"
                />
              </button>
            </div>
            <input
              className="w-100 rounded-1 border-0 h-input-principal sombra"
              placeholder="Pesquise pelo pokemon"
            ></input>
            <div className="mt-5 gap-4 d-flex w-100">
              <select className="w-20 rounded-1 border-0  h-input-filtro sombra"></select>
              <input className="w-20 rounded-1 border-0  h-input-filtro sombra"></input>
              <input className="w-20 rounded-1 border-0  h-input-filtro sombra"></input>
              <input className="w-20 rounded-1 border-0  h-input-filtro sombra"></input>
              <input className="ms-5 w-5 rounded-1 border-0  h-input-filtro sombra"></input>
            </div>
          </div>

          <div
            style={{ backgroundColor: "#091D3C" }}
            className="w-100 d-flex gap-5 pokedex-fundo"
          >
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
          </div>
          <div
            style={{ backgroundColor: "#091D3C" }}
            className="w-100 d-flex gap-5 pokedex-fundo"
          >
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
          </div>
          <div
            style={{ backgroundColor: "#091D3C" }}
            className="w-100 d-flex gap-5 pokedex-fundo"
          >
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
          </div>
        </div>
        <div
          style={{ backgroundColor: "#091D3C" }}
          className="d-flex w-25 justify-content-center"
        >
          <div className="w-100 bg-light mt-5 rounded-5 d-flex flex-column sombra align-items-center p-3">
            <div className="align-items-center image-wrapper w-100">
              <img
                className="image-card-pokedex w-50"
                src="/src/assets/pikachu.png"
              ></img>
            </div>
            <div className="w-100 d-flex flex-column justify-content-center mt-10 p-3">
              <h1>Blastoise</h1>
              <h4>#009</h4>
              <div>
                <h3>Tipo</h3>
              </div>
              <div className="mt-5">
                <h6>POKEDEX ENTRY</h6>
                <h6>
                  Esse pokemon é muito calmo e sutil, tem fortes poderes de agua
                  e é caapz de afogar seus opnentes
                </h6>
              </div>
              <div className="mt-5">
                <h6>ABILITIES</h6>
              </div>
              <div className="mt-5 w-100 d-flex flex-column">
                <h6>STATS</h6>

                <div className="w-100 d-flex gap-2 justify-content-between">
                  <div className="bg-warning w-15 rounded-5">
                    <button className="btn btn-primary m-1 rounded-circle py-2">
                      HP
                    </button>
                    <p className="px-3 py-2">79</p>
                  </div>
                  <div className="bg-warning w-15 rounded-5">
                    <button className="btn btn-primary m-1 rounded-circle py-2">
                      HP
                    </button>
                    <p className="px-3 py-2">79</p>
                  </div>
                  <div className="bg-warning w-15 rounded-5">
                    <button className="btn btn-primary m-1 rounded-circle py-2">
                      HP
                    </button>
                    <p className="px-3 py-2">79</p>
                  </div>
                  <div className="bg-warning w-15 rounded-5">
                    <button className="btn btn-primary m-1 rounded-circle py-2">
                      HP
                    </button>
                    <p className="px-3 py-2">79</p>
                  </div>
                  <div className="bg-warning w-15 rounded-5">
                    <button className="btn btn-primary m-1 rounded-circle py-2">
                      HP
                    </button>
                    <p className="px-3 py-2">79</p>
                  </div>
                  <div className="bg-warning w-15 rounded-5">
                    <button className="btn btn-primary m-1 rounded-circle py-2">
                      HP
                    </button>
                    <p className="px-3 py-2">79</p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h6>EVOLUTIONS</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokedex;
