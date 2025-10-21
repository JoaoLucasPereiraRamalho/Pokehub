import Button from "./Button";
import ButtonBorder from "./ButtonBorder";

function Header() {
  return (
    <div style={{ backgroundColor: "#091D3C" }} className="d-flex">
      <div className="w-25">
        <img
          style={{ width: "130px", height: "130px" }}
          className="mx-auto d-block"
          src="/src/assets/logo_pokehub.png"
        />
      </div>

      <div className="d-flex align-items-center flex-row-reverse w-75 gap-3 px-4">
        <ButtonBorder>BATALHAR</ButtonBorder>
        <Button>NOTICIAS</Button>
        <Button>COMPARAR</Button>
        <Button>ITENS</Button>
        <Button>POKEMONS</Button>
        <Button>HOME</Button>
      </div>
    </div>
  );
}

export default Header;
