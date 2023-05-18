import React from "react";
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Controls({onOpenModal, cart}) {
  const sum = cart.reduce((sum, item) => sum + item.price * item.count, 0);
  const cartValue = cart.length ? (
    <b>
      {`${cart.length} ${plural(cart.length, {
        one: 'товар',
        few: 'товара',
        many: 'товаров',
      })} / ${sum} `}
      &#8381;
    </b>
  ) : (
    <b>пусто</b>
  );
  return (
    <div className='Controls'>
      <div className="Controls-cart">В корзине:&nbsp;&nbsp;{cartValue}</div>
      <div className="Controls-actions">
        <button onClick={onOpenModal}> Перейти </button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  onOpenModal: PropTypes.func
};

Controls.defaultProps = {
  onOpenModal: () => {}
}

export default React.memo(Controls);
