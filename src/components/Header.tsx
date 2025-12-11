import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";

function Header() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsNavOpen(false);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar navbar-expand-md px-5">
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
            src="/logo_pokehub.png"
            alt="Logo PokeHub"
          />
        </div>

        {/* TOGGLER (BOTÃO MOBILE) */}
        <button
          className="navbar-toggler me-3"
          type="button"
          onClick={toggleNav}
          aria-controls="navbarNav"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
          style={{ border: "1px solid white" }}
        >
          <span
            className="navbar-toggler-icon"
            style={{ filter: "brightness(0) invert(1)" }}
          ></span>
        </button>

        {/* LINKS DE NAVEGAÇÃO */}
        <div
          className={`collapse navbar-collapse w-100 w-md-75 justify-content-end ${
            isNavOpen ? "show" : ""
          }`}
          id="navbarNav"
        >
          <div className="navbar-nav d-flex flex-column flex-md-row align-items-md-center w-100 justify-content-end gap-2 p-3 p-md-0">
            <div className="d-flex flex-column flex-md-row gap-2 w-100 w-md-auto me-md-4 text-center">
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

            <div className="mt-2 mt-md-0 text-center">
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
