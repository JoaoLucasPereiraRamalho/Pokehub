import Noticia from "./Noticia";

function Noticias() {
  return (
    <div style={{ backgroundColor: "#091D3C" }} className="fundo-degrade">
      <div className="py-5 d-flex justify-content-center">
        <div className="w-75 d-flex justify-content-center mb-5">
          <h1 className="text-white">Noticias</h1>
        </div>
      </div>

      <div className="bg-noticias w-75 border-2 mx-auto rounded-3">
        <div className="d-flex gap-5 w-100 mx-auto py-4 justify-content-center">
          <Noticia />
          <Noticia />
          <Noticia />
        </div>
        <div className="d-flex gap-5 w-100 mx-auto py-4 justify-content-center">
          <Noticia />
          <Noticia />
          <Noticia />
        </div>
        <hr className="bg-orange"></hr>
        <div className="d-flex gap-5 w-100 mx-auto py-4 justify-content-center">
          <Noticia />
          <Noticia />
          <Noticia />
        </div>
      </div>
    </div>
  );
}

export default Noticias;
