import React, { useMemo, useState } from "react";
import ItemCard from "./ItemCard";
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
  const itemsPerRow = 4; // Aumentei para 4 para itens, já que são menores

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
      <div className="d-flex input-fundo w-100">
        <h1 className="text-white">Itens do Pokémon</h1>
      </div>
      <div className="d-flex">
        <div className="d-flex flex-column w-75">
          <div className="d-flex flex-column w-100 mt-5 input-fundo">
            <div className="div-btn-red d-flex justify-content-end w-100 px-2">
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
              className="w-full rounded-1 border-0 h-input-principal sombra p-3 text-lg"
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

          <div className="mt-8">
            {rows.length === 0 ? (
              <p className="text-white text-center text-xl mt-10">
                Nenhum item encontrado.
              </p>
            ) : (
              rows.slice(0, visibleRows).map((chunk, rowIndex) => (
                <div
                  key={rowIndex}
                  className="w-full d-flex gap-5 pokedex-fundo mt-5 justify-start"
                >
                  {chunk.map((item) => (
                    <ItemCard
                      key={item.id}
                      name={item.name}
                      id={item.id}
                      img={item.img}
                      cost={item.cost}
                      category={item.category}
                      onSelectItem={onSelectItem}
                    />
                  ))}

                  {chunk.length < itemsPerRow &&
                    Array.from({ length: itemsPerRow - chunk.length }).map(
                      (_, k) => (
                        <div
                          key={`empty-${rowIndex}-${k}`}
                          className="w-1/4"
                        ></div>
                      )
                    )}
                </div>
              ))
            )}

            {visibleRows < rows.length && (
              <div className="d-flex justify-content-center mt-8">
                <button
                  className="btn-linear-2 sombra p-3 rounded-lg text-white font-bold"
                  onClick={() => setVisibleRows((v) => v + 1)}
                >
                  Carregar mais itens
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="d-flex w-25 justify-content-center">
          <div
            className="w-full bg-light mt-5 rounded-lg d-flex flex-column sombra align-items-center p-5 sticky top-10"
            style={{ minHeight: "400px" }}
          >
            {itemDetail ? (
              <>
                <img
                  className="w-24 h-24 object-contain"
                  src={itemDetail.sprite}
                  alt={itemDetail.name}
                />
                <h1 className="text-2xl font-bold text-capitalize mt-4">
                  {itemDetail.name}
                </h1>
                <h4 className="text-gray-500">
                  #{itemDetail.id.toString().padStart(3, "0")}
                </h4>

                <div className="w-full mt-6 text-left">
                  <h6 className="font-semibold text-sm text-gray-700">
                    CATEGORIA
                  </h6>
                  <p className="text-lg text-capitalize mb-4">
                    {itemDetail.category.replace("-", " ")}
                  </p>

                  <h6 className="font-semibold text-sm text-gray-700">PREÇO</h6>
                  <p className="text-lg text-green-600 font-semibold mb-4">
                    {itemDetail.cost} P$
                  </p>

                  <h6 className="font-semibold text-sm text-gray-700">
                    EFEITO
                  </h6>
                  <p className="text-base leading-relaxed text-gray-800">
                    {itemDetail.effect}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray-500 mt-20">Selecione um item...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageItens;
