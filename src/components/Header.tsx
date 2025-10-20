import Button from "./Button";
import ButtonBorder from "./ButtonBorder";

function Header() {
  return (
    <div style={{ backgroundColor: "#091D3C" }} className="mt-1 d-flex">
      <div className="w-25">
        <img
          style={{ width: "150px", height: "150px" }}
          className="mx-auto d-block"
          src="/src/assets/logo_pokehub.png"
        />
      </div>

      <div className="d-flex align-items-center flex-row-reverse w-75 gap-3">
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
