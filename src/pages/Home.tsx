import InitialSection from "../components/home/InitialSection";
import PokemonsHome from "../components/home/PokemonsHome";
import Compare from "../components/home/Compare";
import FeaturedSection from "../components/home/FeaturedSection";
import News from "../components/home/News";
import Itens from "../components/home/Itens";
import BattleBanner from "../components/BattleBanner";

const Home = () => {
  return (
    <>
      <InitialSection />
      <PokemonsHome />
      <Compare />
      <FeaturedSection />
      <News />
      <Itens />
      <BattleBanner />
    </>
  );
};

export default Home;
