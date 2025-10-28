import { useRef, useState, useEffect, MouseEvent } from "react";
import CardItem from "./CardItem";

function Itens() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    sliderRef.current.classList.add("dragging");
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    if (!sliderRef.current) return;
    setIsDown(false);
    sliderRef.current.classList.remove("dragging");
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
          <h1 className="text-white ms-5">Itens mais populares</h1>

          <div
            ref={sliderRef}
            className={"d-flex gap-4 carousel-wrapper"}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <CardItem>Item 1</CardItem>
            <CardItem>Item 2</CardItem>
            <CardItem>Item 3</CardItem>
            <CardItem>Item 4</CardItem>
            <CardItem>Item 5</CardItem>
            <CardItem>Item 6</CardItem>
            <CardItem>Item 7</CardItem>
            <CardItem>Item 8</CardItem>
            <CardItem>Item 9</CardItem>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Itens;
