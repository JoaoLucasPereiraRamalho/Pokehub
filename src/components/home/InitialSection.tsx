import Button from "../ui/Button";

function InitialSection() {
  return (
    <div
      style={{ backgroundColor: "#091D3C" }}
      className="d-flex flex-column flex-md-row py-4 py-md-5 px-3 px-md-5 fundo-degrade-inicio"
    >
      <div className="w-100 w-md-50 w-lg-40 text-white p-3 p-md-5">
        <h1 className="title">DESCUBRA.</h1>
        <h1 className="title">COMPARE.</h1>
        <h1 className="title">BATALHE.</h1>
        <h6 className="mt-4 mb-4">
          Pokehub é uma plataforma interativa feita para quem ama o universo
          Pokémon. Descubra novas espécies, compare seus status e participe de
          batalhas dinâmicas em tempo real. Tudo isso em um ambiente moderno,
          intuitivo e feito para explorar o mundo Pokémon de um jeito totalmente
          novo.
        </h6>
        <Button variant="linear">SAIBA MAIS</Button>
      </div>
      <div className="d-flex w-100 w-md-50 w-lg-60 justify-content-center align-items-center image-container mt-4 mt-md-0">
        <img className="img-fluid" src="/src/assets/haunter_sem_fundo.png" />
      </div>
    </div>
  );
}
export default InitialSection;
