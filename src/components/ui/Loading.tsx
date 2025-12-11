const Loading = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center w-100"
      style={{ minHeight: "50vh" }}
    >
      <img
        src="/src/assets/Pokebola.svg"
        alt="Carregando..."
        className="spinning"
        style={{ width: "80px", height: "80px", opacity: 0.9 }}
      />
      <h5 className="text-white mt-4 fw-bold animate-pulse letter-spacing-2">
        CARREGANDO...
      </h5>
    </div>
  );
};

export default Loading;
