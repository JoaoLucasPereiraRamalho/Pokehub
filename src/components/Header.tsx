import React from "react";

import { useNavigate } from "react-router-dom";

const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    className="btn text-white text-decoration-none px-3 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition duration-200 w-full text-left w-md-auto"
    onClick={onClick}
    style={{ whiteSpace: "nowrap" }}
  >
    {children}
  </button>
);

const ButtonBorder = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    className="btn border-2 border-white text-white px-3 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition duration-200 w-full w-md-auto"
    onClick={onClick}
    style={{ whiteSpace: "nowrap" }}
  >
    {children}
  </button>
);

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
        <div
          className="w-100 w-md-25 p-2"
          onClick={() => handleNavigate("/home")}
          style={{ cursor: "pointer" }}
        >
          <img
            style={{ width: "80px", height: "80px" }}
            className="d-block mx-auto mx-md-0"
            src="/src/assets/logo_pokehub.png"
            alt="Logo PokeHub"
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
              <Button onClick={() => handleNavigate("/home")}>HOME</Button>
              <Button onClick={() => handleNavigate("/pokemons")}>
                POKEMONS
              </Button>
              <Button onClick={() => handleNavigate("/Itens")}>ITENS</Button>
              <Button onClick={() => handleNavigate("/Comparar")}>
                COMPARAR
              </Button>
              <Button onClick={() => handleNavigate("/Noticias")}>
                NOTICIAS
              </Button>
            </div>
            <div className="mt-2 mt-md-0">
              <ButtonBorder onClick={() => handleNavigate("/Battle")}>
                BATALHAR
              </ButtonBorder>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
