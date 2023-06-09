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
import articleActions from "../../store-redux/article/actions";
import commentsArticle from "../../store-redux/article-comments/actions";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";

function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();
  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsArticle.load(params.id));
  }, [params.id]);
  const select = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.articleComments.data,
      countComment: state.articleComments.count
    }),
    shallowequal
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект
  const { t } = useTranslate();
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
  };
 

  const options = {
    comments: useMemo(() => [
      ...treeToList(
        listToTree(select.comments, "_id", "article"),
        (item, level) => ({
          id: item._id,
          name: item.author.profile.name,
          text: item.text, 
          dateCreate: item.dateCreate, 
          level
        })
      )
    ], [select.comments]),
  }

  console.log(select.comments)

  console.log('options',options.comments);
  const [value, setValue] = useState([])

  const handlePostComment = (id) => {
    dispatch(commentsArticle.postComment(params.id, 'article', 'снова комментарий к товару'));
    console.log(value)
  }

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
      <h2>Комментарии({select.countComment})</h2>
      {options.comments.map((el) => (
        <div style={{ border: "1px solid gray", padding: 10 }} key={el.id}>
          <h3>
            {el.name} - {el.dateCreate}
          </h3>
          <p>{el.text}</p>
          <input value={value} onChange={(e) => setValue(e.target.value) }/>
          <button onClick={()=> handlePostComment(el.id)} >Ответить</button>
        </div>
      ))}
    </PageLayout>
  );
}

export default memo(Article);
