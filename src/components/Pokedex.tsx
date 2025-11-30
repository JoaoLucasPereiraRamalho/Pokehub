import { useMemo, useState } from "react";
import PokemonCard from "./cards/PokemonCard";
import {
  type PokemonDetail,
  type PokemonInfoCard,
  type DescricaoPokemon,
} from "../types";
import Status from "./ui/Status";
import { getTypeColor } from "../utils/constants";
import SearchBar from "./ui/SearchBar";

// Tipo auxiliar para funções de filtro
type SetFilter = (value: string | null) => void;

// =========================================================================
// 1. PROPS (Propriedades Recebidas do Componente Pai)
// =========================================================================
interface PokedexProps {
  // Detalhes do Pokémon selecionado na lista (para o painel lateral)
  pokemonDetail: PokemonDetail | null;
  // Lista de cards de Pokémon filtrada
  pokemons: PokemonInfoCard[];
  // Descrição do Pokémon (flavor text)
  descricaoPokemon: DescricaoPokemon | null;

  // Estado e função de atualização para o filtro de busca por nome
  searchTerm: string;
  onSearchChange: (term: string) => void;
  // Função para selecionar um Pokémon na lista e atualizar o painel lateral
  onSelectPokemon: (name: string) => void;

  // Filtros de Tipo
  selectedType: string | null;
  onTypeChange: SetFilter;
  allTypes: string[];

  // Filtros de Geração
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
  // =========================================================================
  // 2. ESTADOS E LÓGICA LOCAL
  // =========================================================================

  // Controla quantas linhas de cards estão visíveis (para "Carregar Mais")
  const [visibleRows, setVisibleRows] = useState(1);
  const itemsPerRow = 3;

  // Estado local para o input de busca (evita atualizar o filtro global a cada tecla)
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Função para aplicar a busca global quando o botão é clicado (ou Enter)
  const handleSearchClick = () => {
    onSearchChange(localSearchTerm);
  };

  // Função para limpar todos os filtros e o campo de busca
  const handleResetFilters = () => {
    setLocalSearchTerm("");
    onSearchChange("");
    onTypeChange(null);
    onGenerationChange(null);
  };

  // Divide a lista de Pokémon filtrada em linhas para exibição (otimizado com useMemo)
  const rows = useMemo(() => {
    const r: PokemonInfoCard[][] = [];
    for (let i = 0; i < pokemons.length; i += itemsPerRow) {
      r.push(pokemons.slice(i, i + itemsPerRow));
    }
    return r;
  }, [pokemons]);

  // =========================================================================
  // 3. RENDERIZAÇÃO
  // =========================================================================

  return (
    <div className="fundo-abstrato-pokemon fundo-degrade">
      <div className="d-flex input-fundo w-100">
        <h1 className="text-white">Pokedex</h1>
      </div>

      {/* Layout principal: Lista de cards (esquerda) + Painel de detalhes (direita) */}
      <div className="d-flex flex-wrap flex-md-nowrap">
        {/* Coluna da esquerda: Filtros e Cards */}
        <div className="col-12 col-md-8 col-lg-9 d-flex flex-column">
          {/* Seção de Filtros e Busca */}
          <div className="d-flex flex-column w-100 mt-5 input-fundo">
            {/* Input de Busca */}
            <SearchBar
              value={localSearchTerm}
              onChange={setLocalSearchTerm}
              onSearch={handleSearchClick}
              placeholder="Pesquise pelo pokemon"
            />

            {/* Selects de Filtro (Tipo e Geração) */}
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

              {/* Botão de Reset de Filtros */}
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

          {/* Painel de Exibição dos Cards de Pokémon */}
          <div className="pokedex-painel m-5">
            {rows.length === 0 ? (
              <p className="text-white text-center">Nenhum pokemon</p>
            ) : (
              // Mapeia apenas as linhas visíveis (visibileRows)
              rows.slice(0, visibleRows).map((chunk, rowIndex) => (
                <div
                  key={rowIndex}
                  className="w-100 d-flex gap-4 pokedex-fundo"
                  style={{ alignItems: "stretch" }}
                >
                  {/* Renderiza os PokemonCards em cada linha */}
                  {chunk.map((p) => (
                    <div
                      key={p.id ?? p.name}
                      style={{
                        flexBasis: "31%",
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
                        // Condição para mostrar a imagem animada do Pokémon detalhado no primeiro card (efeito visual)
                        imgAnimada2={
                          rowIndex === 0 && p === chunk[0]
                            ? pokemonDetail?.imgAnimada
                            : undefined
                        }
                        onSelectPokemon={onSelectPokemon}
                        // Passa as cores dos tipos
                        type1Color={
                          p?.type1 ? getTypeColor(p.type1) : undefined
                        }
                        type2Color={
                          p?.type2 ? getTypeColor(p.type2) : undefined
                        }
                      />
                    </div>
                  ))}

                  {/* Preenche a última linha com divs vazias para manter o alinhamento */}
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

            {/* Botão "Carregar mais" */}
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

        {/* Coluna da direita: Painel de Detalhes (Sticky/Scrollable) */}
        <div className="col-12 col-md-4 col-lg-3 d-flex justify-content-center mt-5 h-100">
          <div
            className="w-100 bg-light rounded-5 d-flex flex-column shadow align-items-center p-3 text-dark scrollable-panel"
            style={{
              maxHeight: "130vh",
              overflowY: "auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Imagem do Pokémon Detalhado */}
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

            {/* Conteúdo de Texto e Stats */}
            <div className="w-100 d-flex flex-column justify-content-center p-3 text-dark">
              {/* Nome e ID */}
              <h1 className="fs-3 fw-bold text-capitalize">
                {pokemonDetail?.name || "Selecione um Pokémon"}
              </h1>
              <h4 className="text-muted">
                {pokemonDetail?.id ? `#${pokemonDetail.id}` : ""}
              </h4>

              {/* Tipos */}
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

              {/* Pokédex Entry */}
              <div className="mt-4">
                <h6 className="fw-bold text-uppercase">Pokédex Entry</h6>
                <p className="text-muted small">
                  {descricaoPokemon?.flavor_text || "Buscando descrição..."}
                </p>
              </div>

              {/* Habilidades */}
              <div className="mt-4">
                <h6 className="fw-bold text-uppercase">Abilities</h6>
                <p className="small m-0">{pokemonDetail?.abilitie1}</p>
                <p className="small">{pokemonDetail?.abilitie2}</p>
              </div>

              {/* Componente Status (Barras de Estatísticas) */}
              <div className="mt-4 w-100 d-flex flex-column">
                <Status pokemonDetail={pokemonDetail} />
              </div>

              {/* Seção de Evoluções (Placeholder) */}
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
