import { useState, useEffect, useMemo } from "react";
import PageItens from "../components/PageItens";
import {
  getItems,
  getItemInfoCards,
  getItemDetailByName,
} from "../services/PokemonService";
import { filterItemsByName } from "../utils/filters";
import { type ItemCardInfo, type ItemDetail, type ItemData } from "../types";

const ItemsPage = () => {
  const [allItems, setAllItems] = useState<ItemCardInfo[]>([]);
  const [itemSearchTerm, setItemSearchTerm] = useState<string>("");
  const [selectedItemName, setSelectedItemName] = useState<string>("");
  const [itemDetail, setItemDetail] = useState<ItemDetail | null>(null);

  // --- Filtros ---
  const filteredItems = useMemo(() => {
    return filterItemsByName(allItems, itemSearchTerm);
  }, [allItems, itemSearchTerm]);

  // --- Effects ---

  // Carregar itens iniciais
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const listData: ItemData[] = await getItems(50);
        const cardsData: ItemCardInfo[] = await getItemInfoCards(listData);
        setAllItems(cardsData);
      } catch (error) {
        console.error("Erro ao carregar itens:", error);
      }
    };
    fetchItems();
  }, []);

  // Carregar detalhes do item selecionado
  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!selectedItemName) return;
      try {
        const detail = await getItemDetailByName(selectedItemName);
        setItemDetail(detail);
      } catch (error) {
        console.error("Erro ao carregar detalhes do item:", error);
        setItemDetail(null);
      }
    };
    fetchItemDetails();
  }, [selectedItemName]);

  return (
    <PageItens
      items={filteredItems}
      searchTerm={itemSearchTerm}
      onSearchChange={setItemSearchTerm}
      itemDetail={itemDetail}
      onSelectItem={setSelectedItemName}
    />
  );
};

export default ItemsPage;
