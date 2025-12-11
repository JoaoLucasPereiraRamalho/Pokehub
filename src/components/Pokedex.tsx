import { useMemo, useState } from "react";
// Importa o Card Oficial
import PokemonCard from "./cards/PokemonCard";
// Importa Tipos Centralizados
import {
  type PokemonDetail,
  type PokemonInfoCard,
  type DescricaoPokemon,
} from "../types";
// Importa Componentes de UI Reutilizáveis
import Status from "./ui/Status";
import SearchBar from "./ui/SearchBar";
import Button from "./ui/Button"; // <--- Novo Botão
import { getTypeColor } from "../utils/constants";

// Tipo auxiliar para funções de filtro
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
  // --- Estados Locais ---
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

  // --- Paginação Local (Divisão em Linhas) ---
  const rows = useMemo(() => {
    const r: PokemonInfoCard[][] = [];
    for (let i = 0; i < pokemons.length; i += itemsPerRow) {
      r.push(pokemons.slice(i, i + itemsPerRow));
    }
    return r;
  }, [pokemons]);

  return (
    <div className="fundo-abstrato-pokemon fundo-degrade min-vh-100">
      {/* Título */}
      <div className="d-flex input-fundo w-100 mb-4">
        <h1 className="text-white fw-bold">Pokedex</h1>
      </div>

      {/* Layout Principal: Lista (Esq) + Detalhes (Dir) */}
      <div className="d-flex flex-wrap flex-md-nowrap">
        {/* --- COLUNA ESQUERDA: Filtros e Grid --- */}
        <div className="col-12 col-md-8 col-lg-9 d-flex flex-column pe-md-4">
          {/* Container de Filtros */}
          <div className="d-flex flex-column w-100 mt-2 mt-md-5 input-fundo">
            <SearchBar
              value={localSearchTerm}
              onChange={setLocalSearchTerm}
              onSearch={handleSearchClick}
              placeholder="Pesquise pelo pokemon"
            />

            <div className="mt-4 mt-md-5 gap-3 d-flex w-100 align-items-center">
              <select
                className="form-select w-auto rounded-1 border-0 h-input-filtro sombra text-capitalize"
                value={selectedType || ""}
                onChange={(e) => onTypeChange(e.target.value || null)}
                style={{ minWidth: "120px" }}
              >
                <option value="">Tipo</option>
                {allTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                className="form-select w-auto rounded-1 border-0 h-input-filtro sombra"
                value={selectedGeneration || ""}
                onChange={(e) => onGenerationChange(e.target.value || null)}
                style={{ minWidth: "120px" }}
              >
                <option value="">Geração</option>
                {allGenerations.map((gen) => (
                  <option key={gen} value={gen}>
                    {gen}
                  </option>
                ))}
              </select>

              {/* Botão Reset (Alinhado à direita) */}
              <div className="ms-auto">
                <button
                  className="btn border-0 p-0 transition-all hover-scale"
                  onClick={handleResetFilters}
                  title="Resetar filtros"
                  style={{ width: "40px", height: "40px" }}
                >
                  <img
                    src="src/assets/reset.png"
                    className="w-100 h-100 object-fit-cover rounded-1 sombra"
                    alt="resetar"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Grid de Cards */}
          <div className="pokedex-painel m-3 m-md-5 p-3">
            {rows.length === 0 ? (
              <div className="text-center py-5">
                <h3 className="text-white opacity-50">
                  Nenhum pokémon encontrado.
                </h3>
              </div>
            ) : (
              <div className="d-flex flex-column gap-4">
                {rows.slice(0, visibleRows).map((chunk, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="row g-3 justify-content-center justify-content-md-start px-2 px-md-4"
                  >
                    {chunk.map((p) => (
                      <div
                        key={p.id ?? p.name}
                        // Responsividade do Grid:
                        // col-12 (mobile muito pequeno) -> col-sm-6 -> col-lg-4 (3 por linha)
                        className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center"
                      >
                        <PokemonCard
                          name={p?.name}
                          id={p?.id}
                          imgAnimada={p?.img}
                          type1={p?.type1}
                          type2={p?.type2}
                          // Lógica visual: Se for o primeiro card E o detalhe corresponder, anima
                          imgAnimada2={
                            rowIndex === 0 && p === chunk[0]
                              ? pokemonDetail?.imgAnimada
                              : undefined
                          }
                          onSelectPokemon={onSelectPokemon}
                          // Cores opcionais (o card calcula se não passar)
                          type1Color={
                            p?.type1 ? getTypeColor(p.type1) : undefined
                          }
                          type2Color={
                            p?.type2 ? getTypeColor(p.type2) : undefined
                          }
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Botão Carregar Mais */}
            {visibleRows < rows.length && (
              <div className="d-flex justify-content-center my-5">
                <Button
                  variant="linear-2"
                  className="w-50 w-md-50 py-3"
                  onClick={() => setVisibleRows((v) => v + 1)}
                >
                  Carregar mais
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* --- COLUNA DIREITA: Painel de Detalhes --- */}
        <div className="col-12 col-md-4 col-lg-3 d-flex justify-content-center mt-4 mt-md-5 mb-5 h-100 px-3">
          <div
            className="w-100 bg-light rounded-5 d-flex flex-column shadow align-items-center p-4 text-dark position-sticky"
            style={{
              top: "20px", // Faz o painel grudar no topo ao scrollar (Sticky)
              maxHeight: "90vh",
              overflowY: "auto",
              zIndex: 10,
            }}
          >
            {/* Imagem */}
            <div
              className="align-items-center w-100 text-center mb-3"
              style={{ minHeight: "120px" }}
            >
              {pokemonDetail?.img ? (
                <img
                  className="w-75 object-contain transition-all hover-scale"
                  src={pokemonDetail.img}
                  alt={pokemonDetail?.name}
                  style={{ maxHeight: "150px" }}
                />
              ) : (
                <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                  Carregando...
                </div>
              )}
            </div>

            {/* Info */}
            <div className="w-100 text-center">
              <h1 className="fs-2 fw-bold text-capitalize mb-0">
                {pokemonDetail?.name || "..."}
              </h1>
              <span className="text-muted fs-5">
                {pokemonDetail?.id
                  ? `#${pokemonDetail.id.toString().padStart(3, "0")}`
                  : ""}
              </span>

              {/* Badges de Tipo */}
              <div className="d-flex justify-content-center gap-2 mt-3">
                {pokemonDetail?.type1 && (
                  <span
                    className="badge text-uppercase px-3 py-2 shadow-sm"
                    style={{
                      backgroundColor: getTypeColor(pokemonDetail.type1),
                    }}
                  >
                    {pokemonDetail.type1}
                  </span>
                )}
                {pokemonDetail?.type2 && (
                  <span
                    className="badge text-uppercase px-3 py-2 shadow-sm"
                    style={{
                      backgroundColor: getTypeColor(pokemonDetail.type2),
                    }}
                  >
                    {pokemonDetail.type2}
                  </span>
                )}
              </div>

              <hr className="my-4 opacity-25" />

              {/* Descrição */}
              <div className="text-start">
                <h6
                  className="fw-bold text-uppercase text-secondary mb-2"
                  style={{ fontSize: "0.8rem" }}
                >
                  Pokédex Entry
                </h6>
                <p className="text-muted small lh-sm">
                  {descricaoPokemon?.flavor_text || "..."}
                </p>
              </div>

              {/* Habilidades */}
              <div className="text-start mt-3">
                <h6
                  className="fw-bold text-uppercase text-secondary mb-2"
                  style={{ fontSize: "0.8rem" }}
                >
                  Abilities
                </h6>
                <div className="d-flex gap-2 flex-wrap">
                  <span className="badge bg-light text-dark border border-secondary text-capitalize">
                    {pokemonDetail?.abilitie1}
                  </span>
                  {pokemonDetail?.abilitie2 && (
                    <span className="badge bg-light text-dark border border-secondary text-capitalize">
                      {pokemonDetail?.abilitie2}
                    </span>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 w-100">
                <Status pokemonDetail={pokemonDetail} />
              </div>

              {/* Espaço final */}
              <div style={{ height: "20px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokedex;
