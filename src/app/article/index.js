import {memo, useCallback, useMemo, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from "shallowequal";
import articleActions from '../../store-redux/article/actions';
import commentsArticle from '../../store-redux/article-comments/actions'

function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();
  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsArticle.load(params.id))
  }, [params.id]);
  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    comments: state.articleComments
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект
  const {t} = useTranslate();
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }
  console.log(select.comments);
  // const [comments, setComments] = useState([])

  // const getComments = async(_id) => {
  //   const req = await fetch(`/api/v1/comments?search[parent]=${_id}&fields=items(*,author(profile(name))),count&sort=order&limit=*&skip=0`)
  //   const res = await req.json();
  //   setComments(res.result.items)
  //   console.log(comments)
  // }

  // useEffect(() => {
  //   getComments(params.id)
  // }, [])

  // console.log(comments)

  return (
    <PageLayout>
      <TopHead/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
      {select.comments.data.map(el => 
        <div style={{border: '1px solid gray', padding: 10}} key={el._id}>
          <h3>{el.author.profile.name} - {el.dateCreate}</h3>
          <p>{el.text}</p>
          <a href="">Ответить</a>
          </div>
        )}
    </PageLayout>
  );
}

export default memo(Article);
