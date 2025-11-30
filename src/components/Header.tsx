import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";

function Header() {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <nav
      style={{ backgroundColor: "#091D3C" }}
      className="navbar navbar-expand-md"
    >
      <div className="container-fluid">
        {/* LOGO */}
        <div
          className="w-100 w-md-25 p-2"
          onClick={() => handleNavigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img
            style={{ width: "80px", height: "80px" }}
            className="d-block mx-auto mx-md-0"
            src="/src/assets/logo_pokehub.png"
            alt="Logo PokeHub"
          />
        </div>

        {/* TOGGLER (Mobile) */}
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

        {/* LINKS DE NAVEGAÇÃO */}
        <div
          className="collapse navbar-collapse w-100 w-md-75 justify-content-end"
          id="navbarNav"
        >
          <div className="navbar-nav d-flex flex-column flex-md-row align-items-md-center w-100 justify-content-end gap-2 p-3 p-md-0">
            <div className="d-flex flex-column flex-md-row gap-2 w-100 w-md-auto me-md-4">
              {/* Botões Normais (Primary) */}
              <Button variant="primary" onClick={() => handleNavigate("/")}>
                HOME
              </Button>
              <Button
                variant="primary"
                onClick={() => handleNavigate("/pokemons")}
              >
                POKEMONS
              </Button>
              <Button
                variant="primary"
                onClick={() => handleNavigate("/Itens")}
              >
                ITENS
              </Button>
              <Button
                variant="primary"
                onClick={() => handleNavigate("/Comparar")}
              >
                COMPARAR
              </Button>
              <Button
                variant="primary"
                onClick={() => handleNavigate("/Noticias")}
              >
                NOTICIAS
              </Button>
            </div>

            {/* Botão de Destaque (Border) */}
            <div className="mt-2 mt-md-0">
              <Button
                variant="border"
                onClick={() => handleNavigate("/Battle")}
              >
                BATALHAR
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
