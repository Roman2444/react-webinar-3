import { memo, useCallback, useEffect, useState, useMemo } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemSinglePropduct from "../../components/item-single-propduct";
 
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function SinglePropductPage() {
  const store = useStore();

  // useEffect(() => {
  //   store.actions.catalog.load(limit, limit*page-limit);
  // }, [page, limit]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalGoods: state.catalog.totalGoods,
  }));
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };

  // const renders = {
  //   item: useCallback((item) => {
  //     return <Item item={item} onAdd={callbacks.addToBasket}/>
  //   }, [callbacks.addToBasket]),
  // };

  return (
    <PageLayout>
      <Head title="Название товара" />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />

      <ItemSinglePropduct>
      </ItemSinglePropduct>
    </PageLayout>
  );
}

export default memo(SinglePropductPage);
