import { memo, useCallback, useMemo, useEffect, useState } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

import commentsArticle from "../../store-redux/article-comments/actions";
import useInit from "../../hooks/use-init";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import shallowequal from "shallowequal";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import CommentItem from "../../components/comment-item";

import Spinner from "../../components/spinner";
import CommentForm from "../../components/comment-form";
import CommentLayout from "../../components/comment-layout";

function Comments(props) {
  const store = useStore();
  const dispatch = useDispatch();

  const select = useSelectorRedux(
    (state) => ({
      waiting: state.articleComments.waiting,
      comments: state.articleComments.data,
      countComment: state.articleComments.count,
    }),
    shallowequal
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const selectState = useSelector(state => ({
    exists: state.session.exists
  }));

  useInit(() => {
    dispatch(commentsArticle.load(props.id));
  }, [props.id, select.countComment]);

  const options = {
    comments: useMemo(
      () => [
        ...treeToList(
          listToTree(select.comments, "_id", "article"),
          (item, level) => ({
            id: item._id,
            name: item.author.profile.name,
            text: item.text,
            dateCreate: item.dateCreate,
            level,
          })
        ),
      ],
      [select.comments]
    ),
  };

  console.log(select.comments);
  console.log("options", options.comments);

  const [commentAnserVisible, setCommentAnserVisible] = useState(false);

  const handlePostComment = (textValue, type = "article", id = props.id) => {
    dispatch(commentsArticle.postComment(id, type, textValue));
  };

  return (
    <CommentLayout countComment={select.countComment}>
      <Spinner waiting={select.waiting}>
        {options.comments.map((el) => (
          <CommentItem
            key={el.id}
            {...el}
            setCommentAnserVisible={setCommentAnserVisible}
            isFormVisible={el.id === commentAnserVisible ? true : false}
            sentComment={handlePostComment}
            isExists={selectState.exists}
          />
        ))}
        <CommentForm
          isFormVisible={commentAnserVisible ? false : true}
          sentComment={handlePostComment}
          isExists={selectState.exists}
        />
      </Spinner>
    </CommentLayout>
  );
}

export default memo(Comments);
