import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddProductToCart: useCallback((code) => {
      store.addProductToCart(code);
    }, [store]),

    // onSelectItem: useCallback((code) => {
    //   store.selectItem(code);
    // }, [store]),

    // onAddItem: useCallback(() => {
    //   store.addItem();
    // }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cart={cart} onAdd={callbacks.onAddItem}/>
      <List list={list}
            onAddProductToCart={callbacks.onAddProductToCart}/>
    </PageLayout>
  );
}

export default App;
