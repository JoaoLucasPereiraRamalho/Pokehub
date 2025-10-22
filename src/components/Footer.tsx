function Footer() {
  return (
    <div
      style={{ backgroundColor: "#091D3C" }}
      className="text-white py-3 d-flex"
    >
      <div className="w-25 d-flex flex-column-reverse align-items-center">
        <h5>TITULO</h5>
        <h5>NOVIDADES</h5>
        <h5>COMPARAÇÕES</h5>
        <h5>BATALHAS</h5>
        <h5>SOBRE</h5>
      </div>
      <div className="w-50 text-center d-flex flex-column-reverse align-items-center">
        <h5>© 2025 PokeHub. Todos os direitos reservados.</h5>
        <h5>Desenvolvido por João Lucas Pereira Ramalho</h5>
      </div>
      <div className="w-25 d-flex flex-column-reverse align-items-center">
        <h6>jucasramalho@gmail.com</h6>
        <h6>Email de contato:</h6>
        <img
          className="mb-4"
          style={{ width: "100px", height: "100px" }}
          src="/src/assets/pikachu.png"
        />
      </div>
    </div>
  );
}

export default Footer;
