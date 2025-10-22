function CardItem(props: { children?: React.ReactNode }) {
  return (
    <div className="rounded-2 w-25 bg-light item-card">
      <img
        className="h-75 w-100 rounded-top"
        src="/src/assets/imagem1_feature_section.jpeg"
      />
      <h3>{props.children}</h3>
    </div>
  );
}

export default CardItem;
