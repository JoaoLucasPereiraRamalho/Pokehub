import { useMemo, useState } from "react";
import ItemCard from "./cards/ItemCard"; // Card para itens

import SearchBar from "./ui/SearchBar";
import type { ItemCardInfo, ItemDetail } from "../types";

// =========================================================================
// 1. PROPS
// =========================================================================

interface PageItensProps {
  items: ItemCardInfo[]; // Lista filtrada de itens
  searchTerm: string; // Termo de busca global
  onSearchChange: (term: string) => void; // Função para atualizar a busca global
  itemDetail: ItemDetail | null; // Detalhes do item selecionado
  onSelectItem: (name: string) => void; // Função para selecionar um item para detalhe
}

function PageItens({
  items,
  searchTerm,
  onSearchChange,
  itemDetail,
  onSelectItem,
}: PageItensProps) {
  // =========================================================================
  // 2. ESTADOS E LÓGICA LOCAL
  // =========================================================================

  // Controla quantas linhas de cards estão visíveis
  const [visibleRows, setVisibleRows] = useState(1);
  const itemsPerRow = 4; // Define 4 itens por linha

  // Estado local para o input de busca
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Função para aplicar a busca global
  const handleSearchClick = () => {
    onSearchChange(localSearchTerm);
  };

  // Divide a lista de itens em linhas para exibição (otimizado com useMemo)
  const rows = useMemo(() => {
    const r: ItemCardInfo[][] = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
      r.push(items.slice(i, i + itemsPerRow));
    }
    return r;
  }, [items]);

  // =========================================================================
  // 3. RENDERIZAÇÃO
  // =========================================================================

  return (
    <div className="fundo-abstrato-pokemon fundo-degrade">
      <div className=" d-flex input-fundo w-100">
        <h1 className="text-white">Itens do Pokémon</h1>
      </div>

      {/* Layout principal: Lista de itens (esquerda) + Painel de detalhes (direita) */}
      <div className="d-flex flex-wrap flex-md-nowrap">
        {/* Coluna da esquerda: Busca e Cards de Itens */}
        <div className="col-12 col-md-8 col-lg-9 d-flex flex-column">
          {/* Seção de Busca */}
          <SearchBar
            value={localSearchTerm}
            onChange={setLocalSearchTerm}
            onSearch={handleSearchClick}
            placeholder="Pesquise pelo nome do item"
            className="mt-5 input-fundo"
          />

          {/* Painel de Exibição dos ItemCards */}
          <div className="pokedex-painel m-5">
            {rows.length === 0 ? (
              <p className="text-white text-center">Nenhum item encontrado.</p>
            ) : (
              // Mapeia apenas as linhas visíveis
              rows.slice(0, visibleRows).map((chunk, rowIndex) => (
                <div
                  key={rowIndex}
                  className="w-100 d-flex gap-4 p-2 mt-4 justify-content-between pokedex-fundo"
                >
                  {/* Renderiza os ItemCards em cada linha */}
                  {chunk.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        flexBasis: "23%", // Espaço para 4 itens por linha
                        flexGrow: 1,
                        minWidth: "100px",
                      }}
                      className="gap-2"
                    >
                      <ItemCard
                        name={item.name}
                        id={item.id}
                        img={item.img}
                        cost={item.cost}
                        category={item.category}
                        onSelectItem={() => onSelectItem(item.name)} // Ao clicar, define o item para ser detalhado
                      />
                    </div>
                  ))}
                  {/* Preenche a última linha com divs vazias para manter o alinhamento */}
                  {chunk.length < itemsPerRow &&
                    Array.from({ length: itemsPerRow - chunk.length }).map(
                      (_, k) => (
                        <div
                          key={`empty-${rowIndex}-${k}`}
                          style={{ flexBasis: "23%", flexGrow: 1 }}
                        ></div>
                      )
                    )}
                </div>
              ))
            )}

            {/* Botão "Carregar mais" */}
            {visibleRows < rows.length && (
              <div className="d-flex justify-content-center mt-3">
                <button
                  className=" btn-linear-2 py-3 mt-5 w-25"
                  onClick={() => setVisibleRows((v) => v + 1)}
                >
                  Carregar mais
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Coluna da direita: Painel de Detalhes do Item */}
        <div className="col-12 col-md-4 col-lg-3 d-flex justify-content-center mt-5 mt-md-0">
          <div
            className="w-100 bg-light rounded-5 d-flex flex-column shadow align-items-center p-3 text-dark scrollable-panel"
            style={{
              maxHeight: "80vh",
              overflowY: "auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Imagem do Item Detalhado */}
            <div
              className="align-items-center image-wrapper w-100 text-center"
              style={{ minHeight: "100px", paddingTop: "20px" }}
            >
              {itemDetail ? (
                <img
                  className="w-50 object-contain"
                  src={itemDetail.sprite}
                  alt={itemDetail.name}
                  style={{ maxHeight: "100px" }}
                />
              ) : (
                <div
                  style={{ height: "100px" }}
                  className="d-flex align-items-center justify-content-center text-muted"
                >
                  Item
                </div>
              )}
            </div>

            {/* Conteúdo de Detalhes do Item */}
            <div className="w-100 d-flex flex-column justify-content-center p-3 text-dark">
              {itemDetail ? (
                <>
                  {/* Nome e ID */}
                  <h1 className="fs-3 fw-bold text-capitalize mt-2">
                    {itemDetail.name}
                  </h1>
                  <h4 className="text-muted">
                    #{itemDetail.id.toString().padStart(3, "0")}
                  </h4>

                  {/* Categoria */}
                  <div className="mt-4">
                    <h6 className="fw-bold text-uppercase">Categoria</h6>
                    <p className="text-muted small text-capitalize">
                      {itemDetail.category.replace("-", " ")}
                    </p>
                  </div>

                  {/* Preço */}
                  <div className="mt-4">
                    <h6 className="fw-bold text-uppercase">Preço</h6>
                    <p className="small text-success fw-bold">
                      {itemDetail.cost} P$
                    </p>
                  </div>

                  {/* Efeito */}
                  <div className="mt-4">
                    <h6 className="fw-bold text-uppercase">Efeito</h6>
                    <p className="small text-muted">{itemDetail.effect}</p>
                  </div>

                  <div style={{ height: "50px" }}></div>
                </>
              ) : (
                <p className="text-muted text-center mt-5">
                  Selecione um item para ver os detalhes.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageItens;
