import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  className?: string; // <--- NOVA PROP
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = "Pesquisar...",
  className = "", // Valor padrão vazio
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  return (
    <div className={`d-flex flex-column w-100 ${className}`}>
      {/* Botão Vermelho (PokeSearch) */}
      <div className="div-btn-red d-flex justify-content-end w-100 px-2 py-1">
        <button
          className="btn-red sombra-red p-0 border-0 rounded-2 transition-all"
          onClick={onSearch}
          title="Buscar"
          style={{ cursor: "pointer" }}
        >
          <img
            className="w-100 h-100 object-fit-cover rounded-2"
            src="/poke.png"
            alt="buscar"
          />
        </button>
      </div>

      {/* Input de Texto */}
      <input
        className="w-100 rounded-1 border-0 h-input-principal sombra px-3 fs-5"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
