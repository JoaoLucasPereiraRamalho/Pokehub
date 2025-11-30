import React from "react";

interface ItemCardProps {
  id: number;
  name: string;
  img: string;
  cost: number;
  category: string;
  onSelectItem: (name: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  name,
  id,
  img,
  cost,
  onSelectItem,
}) => {
  return (
    <div
      className="w-100 bg-white rounded-3 sombra p-4 d-flex flex-column align-items-center justify-content-between text-center h-100"
      style={{ minWidth: "120px", cursor: "pointer" }}
      onClick={() => onSelectItem(name)}
    >
      <span className="text-muted small align-self-start">
        #{id.toString().padStart(3, "0")}
      </span>

      <img
        src={img}
        alt={name}
        className="w-50 object-fit-contain my-2"
        style={{ maxHeight: "80px" }}
      />

      <h5 className="text-capitalize fw-bold fs-6 mb-2 text-dark">
        {name.replace("-", " ")}
      </h5>

      {cost > 0 ? (
        <span className="badge bg-success rounded-pill">$ {cost}</span>
      ) : (
        <span className="badge bg-primary rounded-pill">Especial</span>
      )}
    </div>
  );
};

export default ItemCard;
