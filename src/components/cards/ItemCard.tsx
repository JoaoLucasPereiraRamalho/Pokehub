function ItemCard({ name, id, img, cost, category, onSelectItem }: any) {
  return (
    <div
      className="w-75 bg-white rounded-3 sombra p-4 items-center justify-between text-center"
      style={{ minWidth: "120px", maxWidth: "250px", maxHeight: "250px" }}
      onClick={() => onSelectItem(name)}
    >
      <span className="text-gray-500 text-sm">
        #{id.toString().padStart(3, "0")}
      </span>
      <img src={img} alt={name} className="w-100 object-contain h-20" />

      <h5 className="text-capitalize font-bold text-lg mb-2 text-gray-800">
        {name}
      </h5>
    </div>
  );
}

export default ItemCard;
