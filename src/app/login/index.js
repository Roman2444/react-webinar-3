import {memo, useCallback, useMemo} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";

function Login() {
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  // useInit(() => {
  //   store.actions.article.load(params.id);
  // }, [params.id]);

  // const select = useSelector(state => ({
  //   article: state.article.data,
  //   waiting: state.article.waiting,
  // }));

  const {t} = useTranslate();

 

  return (
    <PageLayout>
      <Head title='Вход'>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm/>

    </PageLayout>
  );
}

export default memo(Login);
