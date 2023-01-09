import React from "react";
import * as FontAwesome from "react-icons/fa";

const Icon = ({ iconName, className }) => {
  const icon = React.createElement(FontAwesome[iconName]);
  return <div className={className}>{icon}</div>;
};

export default Icon;
