function Button(props: { children?: React.ReactNode }) {
  return (
    <button className="btn btn-outline-light border-0 rounded-pill py-1">
      {props.children}
    </button>
  );
}

export default Button;
