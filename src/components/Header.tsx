import Button from "./Button";
import ButtonBorder from "./ButtonBorder";

function Header() {
  return (
    <nav
      style={{ backgroundColor: "#091D3C" }}
      className="navbar navbar-expand-md"
    >
      <div className="container-fluid">
        <div className="w-100 w-md-25 p-2">
          <img
            style={{ width: "80px", height: "80px" }}
            className="d-block mx-auto mx-md-0"
            src="/src/assets/logo_pokehub.png"
          />
        </div>

        <button
          className="navbar-toggler me-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            style={{ filter: "brightness(0) invert(1)" }}
          ></span>
        </button>

        <div
          className="collapse navbar-collapse w-100 w-md-75 justify-content-end"
          id="navbarNav"
        >
          <div className="navbar-nav d-flex flex-column flex-md-row align-items-md-center w-100 justify-content-end gap-2 p-3 p-md-0">
            <div className="d-flex flex-column flex-md-row gap-2 w-100 w-md-auto me-md-4">
              <Button>HOME</Button>
              <Button>POKEMONS</Button>
              <Button>ITENS</Button>
              <Button>COMPARAR</Button>
              <Button>NOTICIAS</Button>
            </div>
            <div className="mt-2 mt-md-0">
              <ButtonBorder>BATALHAR</ButtonBorder>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
