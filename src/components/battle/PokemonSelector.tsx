import React, { useState } from "react";

import { getSuggestions } from "../../utils/filters";
import type { PokemonName } from "../../types";

interface PokemonSelectorProps {
  label: string;
  allNames: PokemonName[];
  selectedName: string;
  onSelect: (name: string) => void;
}

const PokemonSelector: React.FC<PokemonSelectorProps> = ({
  label,
  allNames,
  selectedName,
  onSelect,
}) => {
  const [inputValue, setInputValue] = useState(selectedName);
  const [suggestions, setSuggestions] = useState<PokemonName[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setSuggestions(getSuggestions(allNames, val));
    setShowSuggestions(true);
  };

  const handleSelect = (name: string) => {
    setInputValue(name);
    onSelect(name);
    setShowSuggestions(false);
  };

  return (
    <div className="w-100 position-relative">
      <label className="form-label text-white fw-bold">{label}</label>
      <input
        type="text"
        className="form-control shadow-sm text-capitalize"
        placeholder="Digite o nome..."
        value={inputValue}
        onChange={handleChange}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay para permitir o clique
      />

      {/* Lista de Sugestões Flutuante */}
      {showSuggestions && suggestions.length > 0 && (
        <ul
          className="list-group position-absolute w-100 mt-1 shadow-lg"
          style={{ zIndex: 1000 }}
        >
          {suggestions.map((s) => (
            <li
              key={s.name}
              className="list-group-item list-group-item-action text-capitalize"
              style={{ cursor: "pointer" }}
              onMouseDown={() => handleSelect(s.name)}
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PokemonSelector;
