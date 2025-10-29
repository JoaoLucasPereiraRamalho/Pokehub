import React, { useMemo, useState } from "react";
import PokemonCard from "./PokemonCard";
import {
  type PokemonDetail,
  type PokemonInfoCard,
  type DescricaoPokemon,
} from "../services/PokemonService";
import Status from "./Status";
import { getTypeColor } from "../services/MapCores";

type SetFilter = (value: string | null) => void;

interface PokedexProps {
  pokemonDetail: PokemonDetail | null;
  pokemons: PokemonInfoCard[];
  descricaoPokemon: DescricaoPokemon | null;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSelectPokemon: (name: string) => void;

  selectedType: string | null;
  onTypeChange: SetFilter;
  allTypes: string[];

  selectedGeneration: string | null;
  onGenerationChange: SetFilter;
  allGenerations: string[];
}

function Pokedex({
  pokemonDetail,
  pokemons,
  descricaoPokemon,
  searchTerm,
  onSearchChange,
  onSelectPokemon,
  selectedType,
  onTypeChange,
  allTypes,
  selectedGeneration,
  onGenerationChange,
  allGenerations,
}: PokedexProps) {
  const [visibleRows, setVisibleRows] = useState(1);
  const itemsPerRow = 3;

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearchClick = () => {
    onSearchChange(localSearchTerm);
  };

  const handleResetFilters = () => {
    setLocalSearchTerm("");
    onSearchChange("");
    onTypeChange(null);
    onGenerationChange(null);
  };

  const rows = useMemo(() => {
    const r: PokemonInfoCard[][] = [];
    for (let i = 0; i < pokemons.length; i += itemsPerRow) {
      r.push(pokemons.slice(i, i + itemsPerRow));
    }
    return r;
  }, [pokemons]);

  return (
    <div className="fundo-abstrato-pokemon fundo-degrade">
      <div className="d-flex input-fundo w-100">
        <h1 className="text-white">Pokedex</h1>
      </div>

      {/* layout idêntico ao PageItens para garantir empilhamento em telas pequenas */}
      <div className="d-flex flex-wrap flex-md-nowrap">
        <div className="col-12 col-md-8 col-lg-9 d-flex flex-column">
          <div className="d-flex flex-column w-100 mt-5 input-fundo">
            <div className="div-btn-red d-flex justify-content-end w-100 px-2 py-1">
              <button
                className="btn-red sombra-red p-0 border-0 rounded-2"
                onClick={handleSearchClick}
                title="Buscar"
              >
                <img
                  className="w-100 h-100 object-fit-cover rounded-2"
                  src="/src/assets/poke.png"
                  alt="buscar"
                />
              </button>
            </div>

            <input
              className="w-100 rounded-1 border-0 h-input-principal sombra"
              placeholder="Pesquise pelo pokemon"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchClick();
              }}
            />

            <div className="mt-5 gap-4 d-flex w-100">
              <select
                className="w-20 rounded-1 border-0 h-input-filtro sombra"
                value={selectedType || ""}
                onChange={(e) => onTypeChange(e.target.value || null)}
              >
                <option value="">Tipo</option>
                {allTypes.map((type) => (
                  <option key={type} value={type} className="text-capitalize">
                    {type}
                  </option>
                ))}
              </select>

              <select
                className="w-20 rounded-1 border-0 h-input-filtro sombra"
                value={selectedGeneration || ""}
                onChange={(e) => onGenerationChange(e.target.value || null)}
              >
                <option value="">Geração</option>
                {allGenerations.map((gen) => (
                  <option key={gen} value={gen}>
                    {gen}
                  </option>
                ))}
              </select>

              <div className="d-flex justify-content-end w-100">
                <button
                  className="ms-5 w-10 rounded-1 border-0 h-input-filtro sombra p-0"
                  onClick={handleResetFilters}
                  title="Resetar filtros"
                >
                  <img
                    src="src/assets/reset.png"
                    className="w-100 h-100 object-fit-cover rounded-1"
                    alt="resetar"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="pokedex-painel m-5">
            {rows.length === 0 ? (
              <p className="text-white text-center">Nenhum pokemon</p>
            ) : (
              rows.slice(0, visibleRows).map((chunk, rowIndex) => (
                <div
                  key={rowIndex}
                  className="w-100 d-flex gap-4  pokedex-fundo"
                  style={{ alignItems: "stretch" }}
                >
                  {chunk.map((p) => (
                    <div
                      key={p.id ?? p.name}
                      style={{
                        flexBasis: "31%", // aproximadamente 3 por linha com gaps
                        flexGrow: 1,
                        minWidth: "120px",
                      }}
                      className="gap-2"
                    >
                      <PokemonCard
                        name={p?.name}
                        id={p?.id}
                        imgAnimada={p?.img}
                        type1={p?.type1}
                        type2={p?.type2}
                        imgAnimada2={
                          rowIndex === 0 && p === chunk[0]
                            ? pokemonDetail?.imgAnimada
                            : undefined
                        }
                        onSelectPokemon={onSelectPokemon}
                        type1Color={
                          p?.type1 ? getTypeColor(p.type1) : undefined
                        }
                        type2Color={
                          p?.type2 ? getTypeColor(p.type2) : undefined
                        }
                      />
                    </div>
                  ))}

                  {chunk.length < itemsPerRow &&
                    Array.from({ length: itemsPerRow - chunk.length }).map(
                      (_, k) => (
                        <div
                          key={`empty-${rowIndex}-${k}`}
                          style={{
                            flexBasis: "31%",
                            flexGrow: 1,
                            minWidth: "120px",
                          }}
                        />
                      )
                    )}
                </div>
              ))
            )}

            {visibleRows < rows.length && (
              <div className="d-flex justify-content-center mt-3">
                <button
                  className="btn-linear-2 py-3 mt-5 w-50 sombra mb-4"
                  onClick={() => setVisibleRows((v) => v + 1)}
                >
                  Carregar mais
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="col-12 col-md-4 col-lg-3 d-flex justify-content-center mt-5 h-100">
          <div
            className="w-100 bg-light rounded-5 d-flex flex-column shadow align-items-center p-3 text-dark scrollable-panel"
            style={{
              maxHeight: "130vh", // mantém comportamento desejado
              overflowY: "auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              className="align-items-center image-wrapper w-100 text-center"
              style={{ minHeight: "100px", paddingTop: "20px" }}
            >
              {pokemonDetail?.img ? (
                <img
                  className="w-50 object-contain"
                  src={pokemonDetail.img}
                  alt={pokemonDetail?.name || "pokemon"}
                  style={{ maxHeight: "100px" }}
                />
              ) : (
                <div
                  style={{ height: "100px" }}
                  className="d-flex align-items-center justify-content-center text-muted"
                >
                  Pokémon
                </div>
              )}
            </div>

            <div className="w-100 d-flex flex-column justify-content-center p-3 text-dark">
              <h1 className="fs-3 fw-bold text-capitalize">
                {pokemonDetail?.name || "Selecione um Pokémon"}
              </h1>
              <h4 className="text-muted">
                {pokemonDetail?.id ? `#${pokemonDetail.id}` : ""}
              </h4>

              <div className="d-flex gap-2 mt-2">
                {pokemonDetail?.type1 && (
                  <span
                    className="badge text-uppercase"
                    style={{
                      backgroundColor: getTypeColor(pokemonDetail.type1),
                      color: "#FFF",
                      padding: "4px 8px",
                    }}
                  >
                    {pokemonDetail.type1}
                  </span>
                )}
                {pokemonDetail?.type2 && (
                  <span
                    className="badge text-uppercase"
                    style={{
                      backgroundColor: getTypeColor(pokemonDetail.type2),
                      color: "#FFF",
                      padding: "4px 8px",
                    }}
                  >
                    {pokemonDetail.type2}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <h6 className="fw-bold text-uppercase">Pokédex Entry</h6>
                <p className="text-muted small">
                  {descricaoPokemon?.flavor_text || "Buscando descrição..."}
                </p>
              </div>

              <div className="mt-4">
                <h6 className="fw-bold text-uppercase">Abilities</h6>
                <p className="small m-0">{pokemonDetail?.abilitie1}</p>
                <p className="small">{pokemonDetail?.abilitie2}</p>
              </div>

              <div className="mt-4 w-100 d-flex flex-column">
                <Status pokemonDetail={pokemonDetail} />
              </div>

              <div className="mt-5">
                <h6 className="fw-bold text-uppercase">Evolutions</h6>
                <p className="small text-muted">
                  Informação de evolução não implementada.
                </p>
              </div>

              <div style={{ height: "50px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokedex;
