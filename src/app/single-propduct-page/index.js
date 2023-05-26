import { memo, useCallback, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemSinglePropduct from "../../components/item-single-propduct";
 
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function SinglePropductPage() {
  const params = useParams();
   
  const store = useStore();

  useEffect(() => {
    store.actions.article.load(params.id);
  }, []);

  const select = useSelector((state) => ({
    article: state.article.good,
    amount: state.basket.amount,
    sum: state.basket.sum,
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

  return (
    <PageLayout>
      <Head title={select.article.title} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />

      <ItemSinglePropduct article={select.article} onAdd={callbacks.addToBasket}/>
    
    </PageLayout>
  );
}

export default memo(SinglePropductPage);
