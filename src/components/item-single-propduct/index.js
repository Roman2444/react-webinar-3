import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function ItemSingleProduct(props){

  const cn = bem('ItemSingleProduct');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('description')}>
        {props.item.title} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit totam explicabo optio placeat incidunt nemo asperiores voluptate nihil voluptatum. Tempore, praesentium maiores? Corporis obcaecati, similique dicta architecto sit magni. Pariatur.
      </div>
      <div className={cn('description')}>Страна происзводитель: {numberFormat(props.item.price)} ₽</div>
      <div className={cn('description')}>Категрия: {numberFormat(props.item.price)} ₽</div>
      <div className={cn('description')}>Год выпуска: {numberFormat(props.item.price)} ₽</div>

      <div className={cn('price')}>Цена: {numberFormat(props.item.price)} ₽</div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

ItemSingleProduct.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

ItemSingleProduct.defaultProps = {
  onAdd: () => {},
  item: {
    _id: 555,
    title: 'Название товара',
    price: 555
  }
}

export default memo(ItemSingleProduct);
