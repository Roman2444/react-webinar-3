import {memo, useCallback, useEffect, useState, useMemo} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import Loader from '../../components/loader';

function Main() {
  //задал limit, на случай 
  //если придется изменять количество отображаемых товаров на странице
  const [limit, setLimit] = useState(10);
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

  // получаем общее число страниц(можно перенести в utils)
  const totalPages = useMemo(() => Math.ceil(select.totalGoods / limit), [select.totalGoods, limit])

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
      <List list={select.list} renderItem={renders.item}/>
      <Pagination totalPages={totalPages} page={page} setPage={setPage}/>
    </PageLayout>

  );
}

export default memo(Main);
