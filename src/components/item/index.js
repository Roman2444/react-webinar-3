import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props){
  const callbacks = {
    onHandleClick: () => {
      props.onHandleClick(props.item.code);
    }
  };

  console.log("props22", props);
  return (
    <div className={"Item"} onClick={callbacks.onClick}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{props.item.price} &#8381;</div>
      {props.item.count && (
        <div className="Item-count">{props.item.count} шт</div>
      )}
      <div className="Item-actions">
        <button onClick={callbacks.onHandleClick}>{props.buttonName}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  buttonName: PropTypes.string.isRequired,
  count: PropTypes.number,
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onHandleClick: PropTypes.func,
};

Item.defaultProps = {
  onHandleClick: () => {},
};

export default React.memo(Item);
