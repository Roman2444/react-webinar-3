import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onAddProductToCart}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onAddProductToCart={onAddProductToCart}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddProductToCart: PropTypes.func
};

List.defaultProps = {
  onAddProductToCart: () => {},
}

export default React.memo(List);
