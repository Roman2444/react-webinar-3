import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onHandleClick, buttonName}){
  return (
    <div className='List'>
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Item
            item={item}
            count={item.count}
            onHandleClick={onHandleClick}
            buttonName={buttonName}
          />
        </div>
      ))}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  buttonName: PropTypes.string.isRequired,
  onHandleClick: PropTypes.func,
};

Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    code: PropTypes.number.isRequired,
    count: PropTypes.number,
  }).isRequired,
  count: PropTypes.number,
  onHandleClick: PropTypes.func.isRequired,
  buttonName: PropTypes.string.isRequired,
};

List.defaultProps = {
  onHandleClick: () => {},
};

export default React.memo(List);
