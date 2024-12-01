import React from "react";
import "./title.css";
import { TitleProps } from "../../constants/interfaces";

const Title: React.FC<TitleProps> = ({ text, title }) => {
  return (
    <div className="title-box">
      {text ? <p className="text">{text}</p> : null}
      {title ? <h1 className="title">{title}</h1> : null}
    </div>
  );
};

export default Title;
