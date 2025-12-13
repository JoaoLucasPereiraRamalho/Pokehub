import { useRef, useState, useEffect, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "../cards/ItemCard";
import { POPULAR_ITEMS, getItemImageUrl } from "../../utils/constants";

function Itens() {
  const navigate = useNavigate();
  const sliderRef = useRef<HTMLDivElement>(null);

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Estado para detectar se foi um clique ou um arrasto
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    setIsDragging(false);
    sliderRef.current.classList.add("dragging");
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    if (!sliderRef.current) return;
    setIsDown(false);
    sliderRef.current.classList.remove("dragging");
  };

  const handleItemClick = () => {
    if (!isDragging) {
      navigate("/Itens");
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDown && sliderRef.current) {
        handleMouseUp();
      }
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDown]);

  return (
    <div style={{ backgroundColor: "#091D3C" }}>
      <div className="bg-transparent-2 div-nao-quadrada">
        <div className="">
          <h1 className="text-white ms-5 mb-4">Itens mais populares</h1>

          <div
            ref={sliderRef}
            className="d-flex gap-4 carousel-wrapper px-4 pb-4"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Renderização Dinâmica usando os dados constantes */}
            {POPULAR_ITEMS.map((item) => (
              <div key={item.id} style={{ minWidth: "200px" }}>
                <ItemCard
                  id={item.id}
                  name={item.name}
                  cost={item.cost}
                  category={item.category}
                  img={getItemImageUrl(item.name)}
                  onSelectItem={handleItemClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Itens;
