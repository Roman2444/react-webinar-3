import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import List from "../list";

const ShoppingCart = ({ setVisible }) => {
  const cn = bem("ShoppingCart");

  return (
    <div className={cn()}>
      <div className={cn("head")}>
        <h2 className={cn("title")}>Корзина</h2>
        <div className={cn("actions")}>
          <button onClick={setVisible}>Закрыть</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
