import { Link } from "react-router-dom"; // Importante para navegação interna

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: "#091D3C" }}
      className="text-white pt-5 pb-3 border-top border-secondary border-opacity-25"
    >
      <div className="container">
        <div className="row text-center text-md-start">
          {/* --- COLUNA 1: NAVEGAÇÃO --- */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <h5
              className="text-uppercase fw-bold text-warning mb-3"
              style={{ letterSpacing: "1px" }}
            >
              Explorar
            </h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <Link
                  to="/"
                  className="text-white-50 text-decoration-none hover-link"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/pokemons"
                  className="text-white-50 text-decoration-none hover-link"
                >
                  Pokédex Completa
                </Link>
              </li>
              <li>
                <Link
                  to="/Comparar"
                  className="text-white-50 text-decoration-none hover-link"
                >
                  Comparar Status
                </Link>
              </li>
              <li>
                <Link
                  to="/Battle"
                  className="text-white-50 text-decoration-none hover-link"
                >
                  Arena de Batalha
                </Link>
              </li>
              <li>
                <Link
                  to="/Noticias"
                  className="text-white-50 text-decoration-none hover-link"
                >
                  Últimas Notícias
                </Link>
              </li>
            </ul>
          </div>

          {/* --- COLUNA 2: SOBRE O DESENVOLVEDOR --- */}
          <div className="col-12 col-md-4 mb-4 mb-md-0 d-flex flex-column align-items-center justify-content-start">
            <div className="d-flex gap-3 mb-4">
              <a
                href="https://www.facebook.com/joaolucas.ramalho.5"
                className="social-icon"
                aria-label="Facebook"
                target="_blank"
              >
                <img
                  src="/src/assets/facebook.png"
                  alt="Instagram"
                  style={{ width: "24px" }}
                />
              </a>
              <a
                href="https://www.instagram.com/joaolucapr/"
                className="social-icon"
                aria-label="Instagram"
                target="_blank"
              >
                <img
                  src="/src/assets/instagram.png"
                  alt="Instagram"
                  style={{ width: "24px" }}
                />
              </a>
              <a
                href="https://wa.me/37998733682?text=teste,"
                className="social-icon"
                aria-label="WhatsApp"
                target="_blank"
              >
                <img
                  src="/src/assets/whatsapp.png"
                  alt="Instagram"
                  style={{ width: "24px" }}
                />
              </a>
              <a
                href="https://www.linkedin.com/in/joao-lucas-pereira-ramalho-0145722a8/"
                className="social-icon"
                aria-label="LinkedIn"
                target="_blank"
              >
                <img
                  src="/src/assets/linkedin.png"
                  alt="Instagram"
                  style={{ width: "24px" }}
                />
              </a>
            </div>

            <div className="mt-3">
              <span className="fw-bold d-block text-center">
                Desenvolvido por
              </span>
              <span className="text-info d-block text-center">
                João Lucas Pereira Ramalho
              </span>
            </div>
          </div>

          {/* --- COLUNA 3: CONTATO E LOGO --- */}
          <div className="col-12 col-md-4 d-flex flex-column align-items-center align-items-md-end">
            <img
              src="/src/assets/lunala_2.png"
              alt="Lunala Logo"
              className="mb-3 hover-scale transition-all"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "contain",
                filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))",
              }}
            />

            <div className="text-center text-md-end">
              <h6 className="fw-bold text-uppercase mb-1">Contato</h6>
              <a
                href="mailto:jucasramalho@gmail.com"
                className="text-white-50 text-decoration-none hover-link"
              >
                jucasramalho@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* --- RODAPÉ DO RODAPÉ (COPYRIGHT) --- */}
        <hr className="my-4 border-secondary opacity-25" />

        <div className="text-center">
          <small className="text-white-50">
            &copy; {currentYear} PokeHub. Todos os direitos reservados. Pokémon
            e nomes de personagens são marcas comerciais da Nintendo.
          </small>
        </div>
      </div>

      {/* CSS Local para efeito de Hover nos links */}
      <style>
        {`
          .hover-link:hover {
            color: #fff !important;
            padding-left: 5px;
            transition: all 0.3s ease;
          }
          .hover-link {
            transition: all 0.3s ease;
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;
