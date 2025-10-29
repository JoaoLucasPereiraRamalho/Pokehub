import React from "react";

// Definindo as props esperadas para o componente Noticia
interface NoticiaProps {
  imageUrl: string; // O caminho (path) da imagem é obrigatório
  date?: string; // Data opcional
  category?: string; // Categoria opcional
  title: string; // Título da notícia
}

function Noticia({ imageUrl, date, category, title }: NoticiaProps) {
  return (
    <div className="w-75 h-card">
      <img
        // Usando a prop imageUrl aqui
        src={imageUrl}
        alt={title || "Noticia"}
        className="w-100 h-50"
        onError={(e) =>
          (e.currentTarget.src =
            "https://placehold.co/400x200/cccccc/444444?text=Imagem+Nao+Encontrada")
        }
      />
      {/* Usando valores de props ou placeholders para maior flexibilidade */}
      <h6 className="text-orange">{date || ""}</h6>
      <h5 className="text-white">
        {category || "Pokemon Estampas Ilustradas"}
      </h5>
      <h3 className="text-black">{title}</h3>
    </div>
  );
}

export default Noticia;
