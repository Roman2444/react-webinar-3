import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props){
  const callbacks = {
    onHandleClick: () => {
      props.onHandleClick(props.item.code);
    }
  };

  return (
    <div className={'Item'}
         onClick={callbacks.onClick}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title} 
      </div>
      <div className='Item-price'>
        {props.item.price} &#8381;
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onHandleClick}>
          {props.buttonName}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onAddProductToCart: PropTypes.func,
};

Item.defaultProps = {
  onAddProductToCart: () => {},
}

export default React.memo(Item);
