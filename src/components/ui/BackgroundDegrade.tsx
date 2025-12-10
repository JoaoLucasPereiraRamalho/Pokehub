import React, { ReactNode } from "react";

interface BackgroundWrapperProps {
  children: ReactNode;
}

const BackgroundDegrade: React.FC<BackgroundWrapperProps> = ({ children }) => {
  return <div className="background-wrapper">{children}</div>;
};

export default BackgroundDegrade;
