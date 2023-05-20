import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import List from "../list";
import Item from "../item";
import Button from "../button";

const ShoppingCart = ({ setVisible, cart, onDeleteProductFromCart }) => {
  const cn = bem("ShoppingCart");

  return (
    <div className={cn()}>
      <div className={cn("head")}>
        <h2 className={cn("title")}>Корзина</h2>
        <div className={cn("actions")}>
          <Button onClick={setVisible}>Закрыть</Button>
        </div>
      </div>
      <div className={cn("body")}>
        {cart.length ? (
          <List
            items={cart}
            renderItem={(item) => (
              <Item
                item={item}
                buttonName="Удалить"
                onHandleClick={onDeleteProductFromCart}
              />
            )}
          />
        ) : (
          <h3>товары в корзине отсутствуют</h3>
        )}

        <div className={cn("footer")}>
          <div className={cn("footer-title")}> Итого </div>
          <div className={cn("footer-value")}>
            {cart.reduce((sum, item) => sum + item.price * item.count, 0).toLocaleString('ru-RU')}{" "}
            &#8381;
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ShoppingCart);
