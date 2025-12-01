import React from "react";
import { getTypeColor } from "../../utils/constants";
import AsyncImage from "../ui/AsyncImage";

interface PokemonCardProps {
  id: number;
  name: string;
  imgAnimada: string;
  type1: string;
  type2?: string;
  type1Color?: string;
  type2Color?: string;

  onSelectPokemon: (name: string) => void;

  imgAnimada2?: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  id,
  name,
  imgAnimada,
  type1,
  type2,
  type1Color,
  type2Color,
  onSelectPokemon,
}) => {
  const color1 = type1Color || getTypeColor(type1);
  const color2 = type2Color || (type2 ? getTypeColor(type2) : undefined);

  const type1Name = type1 ? type1.toUpperCase() : "";
  const type2Name = type2 ? type2.toUpperCase() : null;

  return (
    <div
      className="align-items-center w-100 p-1 pokemon-card-hover"
      onClick={() => onSelectPokemon(name)}
      style={{ marginTop: "2.5rem", cursor: "pointer" }}
    >
      <div className="d-flex image-wrapper justify-content-center w-100">
        <AsyncImage
          className="image-card-pokedex w-50"
          src={imgAnimada}
          alt={name}
        />
      </div>

      <div
        className="d-flex flex-column bg-light align-items-center rounded-5 w-100 sombra p-3 overflow-hidden"
        style={{ marginTop: "-2rem", paddingTop: "2.5rem" }}
      >
        <h6 className="mt-2 text-muted">#{id.toString().padStart(3, "0")}</h6>
        <h2 className="fs-5 text-capitalize text-center text-truncate w-100">
          {name}
        </h2>

        <div className="d-flex gap-2 justify-content-center my-2">
          <div
            style={{ backgroundColor: color1, whiteSpace: "nowrap" }}
            className="rounded-1 text-white py-1 px-2"
          >
            <h6 className="m-0 fs-10">{type1Name}</h6>
          </div>

          {type2Name && color2 && (
            <div
              style={{
                backgroundColor: color2,
                whiteSpace: "nowrap",
              }}
              className="rounded-1 text-white py-1 px-2"
            >
              <h6 className="m-0 fs-10">{type2Name}</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
