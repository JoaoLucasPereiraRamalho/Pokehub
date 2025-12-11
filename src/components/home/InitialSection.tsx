import Button from "../ui/Button";

function InitialSection() {
  return (
    <div className="w-100 py-5 fundo-degrade-inicio d-flex justify-content-center">
      <div
        className="d-flex flex-column flex-md-row align-items-center"
        style={{ maxWidth: "1500px" }}
      >
        {/* Lado Esquerdo: Texto */}
        <div className="d-flex justify-content-center">
          <div className="w-60 w-md-50 text-white pe-md-4">
            <h1 className="title">DESCUBRA.</h1>
            <h1 className="title">COMPARE.</h1>
            <h1 className="title">BATALHE.</h1>
            <h6 className="mt-4 lh-base opacity-75">
              Pokehub é uma plataforma interativa feita para quem ama o universo
              Pokémon. Descubra novas espécies, compare seus status e participe
              de batalhas dinâmicas em tempo real. Tudo isso em um ambiente
              moderno, intuitivo e feito para explorar o mundo Pokémon de um
              jeito totalmente novo.
            </h6>
            <Button variant="linear">SAIBA MAIS</Button>
          </div>
        </div>

        {/* Lado Direito: Imagem */}
        <div className="w-100 w-md-50 d-flex justify-content-center justify-content-md-end mt-5 mt-md-0">
          <img
            className="img-fluid hover-scale transition-all"
            src="/haunter_sem_fundo.png"
            alt="Haunter"
            style={{ maxWidth: "800px", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
export default InitialSection;
