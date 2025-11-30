import React from "react";

// Define as variantes
type ButtonVariant =
  | "primary"
  | "linear"
  | "linear-2"
  | "danger"
  | "red"
  | "border";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  let baseClass = "btn fw-bold transition-all";

  switch (variant) {
    case "linear":
      baseClass = "btn-linear sombra";
      break;
    case "linear-2":
      baseClass = "btn-linear-2 sombra rounded-pill";
      break;
    case "danger":
      baseClass = "btn btn-danger btn-lg px-5 py-3 rounded-1 shadow-lg";
      break;
    case "red":
      baseClass = "btn-red sombra-red border-0 rounded-2";
      break;
    case "border":
      baseClass = "btn-border";
      break;
    case "primary":
    default:
      baseClass = "btn btn-outline-light border-0 rounded-pill py-1";
      break;
  }

  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
