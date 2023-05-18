import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import ShoppingCart from "./components/shopping-cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {

    onAddProductToCart: useCallback(
      (code) => {
        store.addProductToCart(code);
      },
      [store]
    ),

    // onSelectItem: useCallback((code) => {
    //   store.selectItem(code);
    // }, [store]),

    // onAddItem: useCallback(() => {
    //   store.addItem();
    // }, [store])
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls cart={cart} onOpenModal={() => setModalVisible(true)} />
        <List list={list} onAddProductToCart={callbacks.onAddProductToCart} />
      </PageLayout>
      <Modal visible={modalVisible} setVisible={() => setModalVisible(false)}>
        <ShoppingCart setVisible={() => setModalVisible(false)} />
        <List list={list} onAddProductToCart={callbacks.onAddProductToCart} />
      </Modal>
    </>
  );
}

export default App;
