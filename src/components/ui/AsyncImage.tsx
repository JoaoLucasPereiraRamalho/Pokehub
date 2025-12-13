import React, { useState, useEffect } from "react";

type AsyncImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const AsyncImage: React.FC<AsyncImageProps> = ({
  src,
  alt,
  className,
  style,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Resetar o loading se a URL da imagem mudar
  useEffect(() => {
    setIsLoading(true);
  }, [src]);

  return (
    <div
      className={`d-flex justify-content-center align-items-center position-relative ${className}`}
      style={style}
    >
      {/* Spinner */}
      {isLoading && (
        <img
          src="/Pokebola.png"
          alt="Carregando..."
          className="spinning position-absolute"
          style={{
            width: "50%",
            maxWidth: "50px",
            opacity: 0.6,
            zIndex: 0,
          }}
        />
      )}

      {/* Imagem Real  */}
      <img
        src={src}
        alt={alt}
        {...props}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          setIsLoading(false);
          e.currentTarget.src =
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
        }}
        className={`w-100 h-100 object-contain transition-all ${className}`}
        style={{
          ...style,
          opacity: isLoading ? 0 : 1,
          zIndex: 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
    </div>
  );
};

export default AsyncImage;
