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

  const selectState = useSelector((state) => ({
    exists: state.session.exists,
    userName: state.session.user.profile?.name,
  }));

  useInit(() => {
    dispatch(commentsArticle.load(props.id));
  }, [props.id]);

  const options = {
    comments: useMemo(
      () => [
        ...treeToList(
          listToTree(select.comments, "_id", "article"),
          (item, level, lastChild) => ({
            id: item._id,
            name: item.author.profile.name,
            text: item.text,
            dateCreate: item.dateCreate,
            level,
            lastChild: item.lastChild
          })
        ),
      ],
      [select.comments]
    ),
  };

  console.log(select.comments);
  console.log("options", options.comments);

  
  const callbacks = {
    handlePostComment: useCallback(
      (textValue, type = "article", id = props.id) => {
        if (textValue.trim().length === 0) {
          return;
        }
        dispatch(commentsArticle.postComment(id, type, textValue));
      },
      [dispatch, props.id]
      ),
    };
    
  const [commentAnserVisible, setCommentAnserVisible] = useState(false);
//   const findIdToPlaceComment = (id) => {
//     let findLevel = options.comments.find(el => el.id === id).level
//     // if (findLevel === 0) {
//     //   setCommentAnserVisible(id);
//     //   return;
//     // }
//     const findIndex = options.comments.findIndex(el => el.id === id)
// console.log('findIndex', findIndex);

//     if (options.comments[findIndex + 1].level >  findLevel) {
//       const findComment = options.comments.filter((el, index) => {
        
//          return el.level === ++findLevel
//        })
//        console.log('findComment', findComment);
//        setCommentAnserVisible(!findComment ? id : findComment.id);

//     } else {
//       setCommentAnserVisible(id);
//     }

//   //  return findComment.id

//   }


const findIdToPlaceComment = (id) => {
  let currentLevel = options.comments.find(el => el.id === id).level
  const currentIndex = options.comments.findIndex(el => el.id === id)

  if (currentIndex === options.comments.length - 1) {
    setCommentAnserVisible(id);
  }
  
  if (options.comments[currentIndex + 1].level === currentLevel) {
    setCommentAnserVisible(id);
  }
  


 
}

  return (
    <CommentLayout countComment={select.countComment}>
      <Spinner waiting={select.waiting}>
        {options.comments.map((el) => (
          <CommentItem
            key={el.id}
            {...el}
            findIdToPlaceComment={findIdToPlaceComment}
            setCommentAnserVisible={setCommentAnserVisible}
            isFormVisible={el.id === commentAnserVisible ? true : false}
            sentComment={callbacks.handlePostComment}
            isExists={selectState.exists}
            currentUser={selectState.userName}
          />
        ))}
        <CommentForm
          isFormVisible={!commentAnserVisible}
          sentComment={callbacks.handlePostComment}
          isExists={selectState.exists}
        />
      </Spinner>
    </CommentLayout>
  );
}

export default memo(Comments);
