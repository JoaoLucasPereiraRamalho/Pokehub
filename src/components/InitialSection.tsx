function InitialSection() {
  return (
    <div style={{ backgroundColor: "#091D3C" }} className="d-flex">
      <div className="w-40 px-10 py-4 text-white m-4">
        <h1 className="title">DESCUBRA.</h1>
        <h1 className="title">COMPARE.</h1>
        <h1 className="title">BATALHE.</h1>
        <h6 className="">
          Pokehub é uma plataforma interativa feita para quem ama o universo
          Pokémon. Descubra novas espécies, compare seus status e participe de
          batalhas dinâmicas em tempo real. Tudo isso em um ambiente moderno,
          intuitivo e feito para explorar o mundo Pokémon de um jeito totalmente
          novo.
        </h6>
        <button className="btn-linear">SAIBA MAIS</button>
      </div>
      <div className="d-flex w-60 flex-row-reverse image-container">
        <img
          className="img-fluid mx-auto d-block"
          src="/src/assets/haunter_sem_fundo.png"
        />
      </div>
    </div>
  );
}
export default InitialSection;
