import {memo} from 'react';
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import SideLayout from "../../components/side-layout";
import AuthPanel from '../../components/auth-panel';

function Main() {

  const store = useStore();
  const navigate = useNavigate();

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.categories.load();
  }, [], true);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <SideLayout side="end" padding="medium">
        {/* { select.isAuth ? <AuthPanel/> :  <button>войти</button> } */}
        <button onClick={() => navigate("/login")}>войти</button>
        <AuthPanel/>
      </SideLayout>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
