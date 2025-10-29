function CardItem(props: { children?: React.ReactNode }) {
  return (
    <div className="rounded-2 w-25 bg-light item-card">
      <img className="h-50 w-100 rounded-top" src="/src/assets/master.jpg" />
      <h3 className="m-5">{props.children}</h3>
    </div>
  );
}

export default CardItem;
