import { useMemo, useState } from "react";
import ItemCard from "./ItemCard"; // Card para itens

import { type ItemCardInfo, type ItemDetail } from "../services/PokemonService";

interface PageItensProps {
  items: ItemCardInfo[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  itemDetail: ItemDetail | null;
  onSelectItem: (name: string) => void;
}

function PageItens({
  items,
  searchTerm,
  onSearchChange,
  itemDetail,
  onSelectItem,
}: PageItensProps) {
  const [visibleRows, setVisibleRows] = useState(1);
  const itemsPerRow = 4; // Itens usam 4 por linha

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearchClick = () => {
    onSearchChange(localSearchTerm);
  };

  const rows = useMemo(() => {
    const r: ItemCardInfo[][] = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
      r.push(items.slice(i, i + itemsPerRow));
    }
    return r;
  }, [items]);

  return (
    <div className="fundo-abstrato-pokemon fundo-degrade">
      <div className=" d-flex input-fundo w-100">
        <h1 className="text-white">Itens do Pokémon</h1>
      </div>

      <div className="d-flex flex-wrap flex-md-nowrap">
        <div className="col-12 col-md-8 col-lg-9 d-flex flex-column">
          <div className="d-flex flex-column w-100 mt-5 input-fundo">
            <div className="div-btn-red d-flex justify-content-end w-100 px-2 py-1">
              <button
                className="btn-red sombra-red p-0 border-0 rounded-2"
                onClick={handleSearchClick}
              >
                <img
                  className="w-100 h-100 object-fit-cover rounded-2"
                  src="/src/assets/poke.png"
                  alt="Search"
                />
              </button>
            </div>
            <input
              className="w-100 rounded-1 border-0 h-input-principal sombra"
              placeholder="Pesquise pelo nome do item"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchClick();
                }
              }}
            />
          </div>

          <div className="pokedex-painel m-5">
            {rows.length === 0 ? (
              <p className="text-white text-center">Nenhum item encontrado.</p>
            ) : (
              rows.slice(0, visibleRows).map((chunk, rowIndex) => (
                <div
                  key={rowIndex}
                  className="w-100 d-flex gap-4 p-2 mt-4 justify-content-between pokedex-fundo"
                >
                  {chunk.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        flexBasis: "23%",
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
                        onSelectItem={() => onSelectItem(item.name)}
                      />
                    </div>
                  ))}
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

            <div className="w-100 d-flex flex-column justify-content-center p-3 text-dark">
              {itemDetail ? (
                <>
                  <h1 className="fs-3 fw-bold text-capitalize mt-2">
                    {itemDetail.name}
                  </h1>
                  <h4 className="text-muted">
                    #{itemDetail.id.toString().padStart(3, "0")}
                  </h4>

                  <div className="mt-4">
                    <h6 className="fw-bold text-uppercase">Categoria</h6>
                    <p className="text-muted small text-capitalize">
                      {itemDetail.category.replace("-", " ")}
                    </p>
                  </div>

                  <div className="mt-4">
                    <h6 className="fw-bold text-uppercase">Preço</h6>
                    <p className="small text-success fw-bold">
                      {itemDetail.cost} P$
                    </p>
                  </div>

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
