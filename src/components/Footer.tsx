function Footer() {
  return (
    <div
      style={{ backgroundColor: "#091D3C" }}
      className="text-white py-4 px-3 px-md-5 d-flex flex-column flex-md-row justify-content-between align-items-center"
    >
      <div className="w-100 w-md-25 d-flex flex-column align-items-center align-items-md-start mb-3 mb-md-0 order-md-1">
        <h5>TITULO</h5>
        <h5>SOBRE</h5>
        <h5>BATALHAS</h5>
        <h5>COMPARAÇÕES</h5>
        <h5>NOVIDADES</h5>
      </div>

      <div className="w-100 w-md-50 text-center d-flex flex-column justify-content-center mb-3 mb-md-0 order-md-2">
        <h5 className="mb-1">Desenvolvido por João Lucas Pereira Ramalho</h5>
        <h5>© 2025 PokeHub. Todos os direitos reservados.</h5>
      </div>

      <div className="w-100 w-md-25 d-flex flex-column align-items-center align-items-md-end mb-3 mb-md-0 order-md-3">
        <img
          className="mb-3"
          style={{ width: "80px", height: "80px" }}
          src="/src/assets/pikachu.png"
        />
        <h6>Email de contato:</h6>
        <h6 className="mb-0">jucasramalho@gmail.com</h6>
      </div>
    </div>
  );
}

export default Footer;
