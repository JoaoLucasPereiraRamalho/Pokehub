import React, { useMemo, useState } from "react";
import PokemonCard from "./PokemonCard";
import {
  type PokemonDetail,
  type Pokemon,
  type DescricaoPokemon,
} from "../services/PokemonService";

interface PokedexProps {
  pokemonDetail: PokemonDetail | null;
  pokemons: Pokemon[]; // agora aceita a lista
  descricaoPokemon: DescricaoPokemon | null;
}

function Pokedex({ pokemonDetail, pokemons, descricaoPokemon }: PokedexProps) {
  const [visibleRows, setVisibleRows] = useState(1); // quantas linhas mostrar
  const itemsPerRow = 3; // "posição do vetor" cresce de itemsPerRow em itemsPerRow

  const rows = useMemo(() => {
    const r: Pokemon[][] = [];
    for (let i = 0; i < pokemons.length; i += itemsPerRow) {
      r.push(pokemons.slice(i, i + itemsPerRow));
    }
    return r;
  }, [pokemons]);

  return (
    <div className="fundo-abstrato-pokemon fundo-degrade">
      <div className=" d-flex input-fundo w-100">
        <h1 className="text-white">Pokedex</h1>
      </div>
      <div className="d-flex">
        <div className="d-flex flex-column w-75">
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

          {/* TESTEEEEEEEEEEEEEEEEEEEEEEEEE */}
          <div>
            {/* renderiza dinamicamente as linhas (cada linha contém itemsPerRow cards) */}
            {rows.length === 0 ? (
              <p className="text-white">Nenhum pokemon</p>
            ) : (
              rows.slice(0, visibleRows).map((chunk, rowIndex) => (
                <div
                  key={rowIndex}
                  className="w-100 d-flex gap-5 pokedex-fundo"
                >
                  {chunk.map((p, i) => (
                    <PokemonCard
                      key={p?.name ?? `${rowIndex}-${i}`}
                      name={p?.name}
                      // exemplo: só usa imgAnimada para o primeiro card
                      imgAnimada={
                        rowIndex === 0 && i === 0
                          ? pokemonDetail?.imgAnimada
                          : undefined
                      }
                    />
                  ))}
                  {/* se o chunk tiver menos que itemsPerRow, renderiza placeholders vazios */}
                  {chunk.length < itemsPerRow &&
                    Array.from({ length: itemsPerRow - chunk.length }).map(
                      (_, k) => <PokemonCard key={`empty-${rowIndex}-${k}`} />
                    )}
                </div>
              ))
            )}

            {/* botão para carregar mais linhas */}
            {visibleRows < rows.length && (
              <div className="d-flex justify-content-center mt-3">
                <button
                  className=" btn-linear-2 sombra mt-10"
                  onClick={() => setVisibleRows((v) => v + 1)}
                >
                  Carregar mais
                </button>
              </div>
            )}
          </div>

          {/* TESTEEEEEEEEEEEEEEEEEEEEEEEEE */}
        </div>
        <div className="d-flex w-25 justify-content-center">
          <div className="w-100 bg-light mt-5 rounded-5 d-flex flex-column sombra align-items-center p-3">
            <div className="align-items-center image-wrapper w-100">
              <img
                className="image-card-pokedex w-50"
                src={pokemonDetail?.img}
              ></img>
            </div>
            <div className="w-100 d-flex flex-column justify-content-center mt-10 p-3">
              <h1>{pokemonDetail?.name}</h1>
              <h4>{pokemonDetail?.id}</h4>
              <div>
                <h3>{pokemonDetail?.type1}</h3>
                <h3>{pokemonDetail?.type2}</h3>
              </div>
              <div className="mt-5">
                <h6>POKEDEX ENTRY</h6>
                <h6>
                  {descricaoPokemon ? descricaoPokemon.flavor_text : "loading"}
                </h6>
              </div>
              <div className="mt-5">
                <h6>ABILITIES</h6>
                <h6>{pokemonDetail?.abilitie1}</h6>
                <h6>{pokemonDetail?.abilitie2}</h6>
              </div>
              <div className="mt-5 w-100 d-flex flex-column">
                <h6>STATS</h6>

                <div className="w-100 d-flex gap-2 justify-content-between">
                  <div className="bg-warning w-15 rounded-5">
                    <button className="btn btn-primary m-1 rounded-circle py-2">
                      HP
                    </button>
                    <p className="px-3 py-2">{pokemonDetail?.hp}</p>
                  </div>
                  <div className="bg-warning w-15 rounded-5">
                    <button className="btn btn-primary m-1 rounded-circle py-2">
                      ATK
                    </button>
                    <p className="px-3 py-2">{pokemonDetail?.attack}</p>
                  </div>
                  <div className="bg-warning w-15 rounded-5">
                    <button className="btn btn-primary m-1 rounded-circle py-2">
                      DEF
                    </button>
                    <p className="px-3 py-2">{pokemonDetail?.defense}</p>
                  </div>
                  <div className="bg-warning w-15 rounded-5">
                    <button className="btn btn-primary m-1 rounded-circle py-2">
                      SpA
                    </button>
                    <p className="px-3 py-2">{pokemonDetail?.specialAttack}</p>
                  </div>
                  <div className="bg-warning w-15 rounded-5">
                    <button className="btn btn-primary m-1 rounded-circle py-2">
                      SpD
                    </button>
                    <p className="px-3 py-2">{pokemonDetail?.specialDefense}</p>
                  </div>
                  <div className="bg-warning w-15 rounded-5">
                    <button className="btn btn-primary m-1 rounded-circle py-2">
                      SPD
                    </button>
                    <p className="px-3 py-2">{pokemonDetail?.speed}</p>
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
