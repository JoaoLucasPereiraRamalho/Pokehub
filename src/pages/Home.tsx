import InitialSection from "../components/InitialSection";
import PokemonsHome from "../components/PokemonsHome";
import Compare from "../components/Compare";
import FeaturedSection from "../components/FeaturedSection";
import News from "../components/News";
import Itens from "../components/Itens";
import Battle from "./Battle";

const Home = () => {
  return (
    <>
      <InitialSection />
      <PokemonsHome />
      <Compare />
      <FeaturedSection />
      <News />
      <Itens />
      <Battle />
    </>
  );
};

export default Home;
