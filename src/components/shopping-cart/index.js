import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import List from "../list";

const ShoppingCart = ({ setVisible, cart, onDeleteProductFromCart }) => {
  const cn = bem("ShoppingCart");

  console.log(cart);

  return (
    <div className={cn()}>
      <div className={cn("head")}>
        <h2 className={cn("title")}>Корзина</h2>
        <div className={cn("actions")}>
          <button onClick={setVisible}>Закрыть</button>
        </div>
      </div>
      <div>
        {cart.length ? (
          cart.map((item) => (
            <div>
              <div className={cn("item")}>
                <div className={cn("item-code")}>{item.code}</div>
                <div className={cn("item-title")}>{item.title}</div>
                <div className={cn("item-price")}>{item.price} &#8381;</div>
                <div className={cn("item-title")}>{item.count}</div>
                <div className={cn("item-actions")}>
                  <button onClick={() => onDeleteProductFromCart(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
              <div>
                итого:
                {cart.reduce((sum, item) => sum + item.price * item.count, 0)}
                &#8381;
              </div>
            </div>
          ))
        ) : (
          <h3>товары в корзине отсутствуют</h3>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
