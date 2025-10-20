function InitialSection() {
  return (
    <div style={{ backgroundColor: "#091D3C" }} className="d-flex">
      <div className="w-50 p-5 text-white">
        <h1>DESCUBRA.</h1>
        <h1>COMPARE.</h1>
        <h1>BATALHE.</h1>
        <h5>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard
        </h5>
        <button className="rounded-pill w-100 py-5 mt-5 bg-success border-0 text-white shadow-sm">
          Saiba mais
        </button>
      </div>
      <div className="d-flex w-50 flex-row-reverse image-container">
        <img
          className="img-fluid mx-auto d-block"
          src="/src/assets/haunter_sem_fundo.png"
        />
      </div>
    </div>
  );
}
export default InitialSection;
