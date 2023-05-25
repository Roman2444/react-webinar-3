import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";

function Main() {
  //задал limit, на случай 
  //если придется изменить количество отображаемых товаров на странице
  const [limit, setLimit] = useState(100);

  //начальная страница
  const [page, setPage] = useState(1);

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load(limit, limit*page-limit);
  }, [page, limit]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalGoods: state.catalog.totalGoods
  }));
  
  console.log(select);
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      {page}
      <Pagination limit={limit} totalGoods={select.totalGoods} page={page} setPage={setPage}/>
      <List list={select.list} renderItem={renders.item}/>
    </PageLayout>

  );
}

export default memo(Main);
