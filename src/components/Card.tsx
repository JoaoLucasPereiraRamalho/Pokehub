function Card() {
  return (
    <div style={{ width: 250 }} className="bg-success">
      <img src="/src/assets/pikachu.png" />
      <h6>#021</h6>
      <h2>Nome Pokemon</h2>
      <img
        style={{ width: 100, height: 100 }}
        src="/src/assets/type_electric.png"
      />
      <h6>BST:320</h6>
      <button className="btn btn-light rounded-pill mb-2">Detalhes</button>
    </div>
  );
}

export default Card;
