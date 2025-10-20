import CardItem from "./CardItem";

function Itens() {
  return (
    <div>
      {/* formato basico inicial, depois é preciso ajustar */}
      <div className="m-5">
        <h1>Itens mais populares</h1>
        <div className=" d-flex gap-4">
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
        </div>
      </div>
    </div>
  );
}

export default Itens;
