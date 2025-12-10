import InitialSection from "../components/home/InitialSection";
import PokemonsHome from "../components/home/PokemonsHome";
import Compare from "../components/home/Compare";
import FeaturedSection from "../components/home/FeaturedSection";
import News from "../components/home/News";
import Itens from "../components/home/Itens";
import BattleBanner from "../components/BattleBanner";
import BackgroundDegrade from "../components/ui/BackgroundDegrade";

const Home = () => {
  return (
    <BackgroundDegrade>
      <InitialSection />
      <PokemonsHome />
      <Compare />
      <FeaturedSection />
      <News />
      <Itens />
      <BattleBanner />
    </BackgroundDegrade>
  );
};

export default Home;
