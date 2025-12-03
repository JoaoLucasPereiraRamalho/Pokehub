import React, { useState, useEffect } from "react";

interface AsyncImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const AsyncImage: React.FC<AsyncImageProps> = ({
  src,
  alt,
  className,
  style,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Resetar o loading se a URL da imagem mudar (ex: trocou de pokemon)
  useEffect(() => {
    setIsLoading(true);
  }, [src]);

  return (
    <div
      className={`d-flex justify-content-center align-items-center position-relative ${className}`}
      style={style}
    >
      {/* 1. Spinner (Aparece enquanto isLoading for true) */}
      {isLoading && (
        <img
          src="/src/assets/Pokebola.png"
          alt="Carregando..."
          className="spinning position-absolute"
          style={{
            width: "50%", // Tamanho relativo ao container
            maxWidth: "50px", // Tamanho máximo
            opacity: 0.6,
            zIndex: 0,
          }}
        />
      )}

      {/* 2. Imagem Real (Fica invisível até carregar) */}
      <img
        src={src}
        alt={alt}
        {...props}
        // Quando o navegador terminar de baixar a imagem:
        onLoad={() => setIsLoading(false)}
        // Se der erro, para de girar (poderia mostrar uma imagem de erro aqui)
        onError={(e) => {
          setIsLoading(false);
          e.currentTarget.src =
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
        }}
        className={`w-100 h-100 object-contain transition-all ${className}`}
        style={{
          ...style,
          opacity: isLoading ? 0 : 1, // Esconde a imagem enquanto carrega
          zIndex: 1,
          transition: "opacity 0.3s ease-in-out", // Efeito suave de aparecer
        }}
      />
    </div>
  );
};

export default AsyncImage;
