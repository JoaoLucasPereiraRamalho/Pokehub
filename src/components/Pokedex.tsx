import { useMemo, useState } from "react";
import PokemonCard from "./PokemonCard";
import {
  type PokemonDetail,
  type PokemonInfoCard,
  type DescricaoPokemon,
} from "../services/PokemonService";
import Status from "./Status";

type SetFilter = (value: string | null) => void;

interface PokedexProps {
  pokemonDetail: PokemonDetail | null;
  pokemons: PokemonInfoCard[]; // agora aceita a lista
  descricaoPokemon: DescricaoPokemon | null;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSelectPokemon: (name: string) => void;

  selectedType: string | null;
  onTypeChange: SetFilter;
  allTypes: string[];

  // Props de Filtro de Geração
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
  const [visibleRows, setVisibleRows] = useState(1); // quantas linhas mostrar
  const itemsPerRow = 3; // cresce de itemsPerRow em itemsPerRow

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearchClick = () => {
    onSearchChange(localSearchTerm);
  };

  const handleResetFilters = () => {
    setLocalSearchTerm(""); // Limpa o estado local de digitação
    onSearchChange(""); // Limpa o filtro de busca no App
    onTypeChange(null); // Limpa o filtro de tipo no App
    onGenerationChange(null); // Limpa o filtro de geração no App
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
      <div className=" d-flex input-fundo w-100">
        <h1 className="text-white">Pokedex</h1>
      </div>
      <div className="d-flex">
        <div className="d-flex flex-column w-70">
          <div className="d-flex flex-column w-100 mt-5 input-fundo">
            <div className="div-btn-red d-flex justify-content-end w-100 px-2 py-1">
              <button
                className="btn-red sombra-red p-0 border-0 rounded-2"
                onClick={handleSearchClick}
              >
                <img
                  className="w-100 h-100 object-fit-cover rounded-2"
                  src="/src/assets/poke.png"
                />
              </button>
            </div>
            <input
              className="w-100 rounded-1 border-0 h-input-principal sombra"
              placeholder="Pesquise pelo pokemon"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchClick();
                }
              }}
            ></input>
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

              <select className="w-20 rounded-1 border-0  h-input-filtro sombra">
                <option>Fraqueza</option>
                <option>Fire</option>
                <option>Water</option>
                <option>Grass</option>
                <option>Electric</option>
                <option>Psychic</option>
                <option>Ice</option>
                <option>Dragon</option>
                <option>Dark</option>
                <option>Fairy</option>
              </select>
              <select className="w-20 rounded-1 border-0  h-input-filtro sombra">
                <option>Forte contra</option>
                <option>Fire</option>
                <option>Water</option>
                <option>Grass</option>
                <option>Electric</option>
                <option>Psychic</option>
                <option>Ice</option>
                <option>Dragon</option>
                <option>Dark</option>
                <option>Fairy</option>
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
              <button
                className="ms-5 w-5 rounded-1 border-0 h-input-filtro sombra p-0"
                onClick={handleResetFilters}
                title="Resetar Filtros"
              >
                <img
                  src="src/assets/reset.png"
                  className="w-100 h-100 object-fit-cover rounded-1"
                />
              </button>
            </div>
          </div>

          {/* TESTEEEEEEEEEEEEEEEEEEEEEEEEE */}
          <div className="pokedex-painel m-5">
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
                      id={p?.id}
                      imgAnimada={p?.img}
                      type1={p?.type1}
                      type2={p.type2}
                      imgAnimada2={
                        rowIndex === 0 && i === 0
                          ? pokemonDetail?.imgAnimada
                          : undefined
                      }
                      onSelectPokemon={onSelectPokemon}
                    />
                  ))}
                  {chunk.length < itemsPerRow &&
                    Array.from({ length: itemsPerRow - chunk.length }).map(
                      (_, k) => <PokemonCard key={`empty-${rowIndex}-${k}`} />
                    )}
                </div>
              ))
            )}
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

        <div className="col-12 col-md-4 col-lg-3 d-flex justify-content-center mt-5 mt-md-0">
          <div
            className="w-100 bg-light rounded-5 d-flex flex-column shadow align-items-center p-3 scrollable-panel"
            style={{ position: "relative", zIndex: 1, overflowY: "auto" }}
          >
            <div
              className="align-items-center image-wrapper w-100 position-relative"
              style={{ height: "75px" }}
            >
              <img
                className="image-card-pokedex"
                src={pokemonDetail?.img}
                alt={pokemonDetail?.name || "Pokémon"}
              ></img>
            </div>
            <div className="w-100 d-flex flex-column justify-content-center pt-5 p-3 text-dark">
              <h1 className="fs-3 fw-bold text-capitalize">
                {pokemonDetail?.name}
              </h1>
              <h4 className="text-muted">#{pokemonDetail?.id}</h4>
              <div className="d-flex gap-2 mt-2">
                {pokemonDetail?.type1 && (
                  <span className="badge bg-primary">
                    {pokemonDetail.type1}
                  </span>
                )}
                {pokemonDetail?.type2 && (
                  <span className="badge bg-info">{pokemonDetail.type2}</span>
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

              <div style={{ height: "50px" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokedex;
