import { Routes, Route } from "react-router-dom";

// Importando as NOVAS páginas que criamos
import Home from "../pages/Home";
import PokedexPage from "../pages/PokedexPage";
import ItemsPage from "../pages/ItemsPage";
import Compare from "../pages/Compare";

// Importando componentes que funcionam como páginas
import News from "../pages/News";
import Battle from "../pages/Battle";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Rota da Home */}
      <Route path="/" element={<Home />} />

      {/* Rota da Pokedex */}
      <Route path="/pokemons" element={<PokedexPage />} />

      {/* Rota de Itens */}
      <Route path="/Itens" element={<ItemsPage />} />

      {/* Rota de Comparação */}
      <Route path="/Comparar" element={<Compare />} />

      {/* Rota de Noticias */}
      <Route path="/Noticias" element={<News />} />

      {/* Rota de batalha */}
      <Route path="/Battle" element={<Battle />} />
    </Routes>
  );
};

export default AppRoutes;
