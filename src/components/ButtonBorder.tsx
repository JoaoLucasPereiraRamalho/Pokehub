function ButtonBorder(props: { children?: React.ReactNode }) {
  return (
    <button className="btn btn-outline-light rounded-pill py-1">
      {props.children}
    </button>
  );
}

export default ButtonBorder;
