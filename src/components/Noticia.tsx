interface NoticiaProps {
  imageUrl: string;
  date?: string;
  category?: string;
  title: string;
}

function Noticia({ imageUrl, date, category, title }: NoticiaProps) {
  return (
    <div className="w-75 h-card">
      <img
        src={imageUrl}
        alt={title || "Noticia"}
        className="w-100 h-50"
        onError={(e) =>
          (e.currentTarget.src =
            "https://placehold.co/400x200/cccccc/444444?text=Imagem+Nao+Encontrada")
        }
      />
      <h6 className="text-orange">{date || ""}</h6>
      <h5 className="text-white">
        {category || "Pokemon Estampas Ilustradas"}
      </h5>
      <h3 className="text-black">{title}</h3>
    </div>
  );
}

export default Noticia;
