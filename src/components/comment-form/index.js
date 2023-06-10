import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import dataFormat from "../../utils/date-format";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";

function CommentForm({ isFormVisible, sentComment, isExists }) {
  const [textComment, setTextComment] = useState("");

  const onHandleSentComment = () => {
    sentComment(textComment);
    setTextComment("");
  };

  const cn = bem("CommentForm");
  return (
    <>
      {isExists ? (
        <div
          style={{ display: isFormVisible ? "flex" : "none" }}
          className={cn()}
        >
          <span className={cn("title")}>{"Новый комментарий"}</span>
          <textarea
            className={cn("comment")}
            value={textComment}
            onChange={(e) => setTextComment(e.target.value)}
          ></textarea>
          <div>
            <button className={cn("btn")} onClick={onHandleSentComment}>
              Отправить
            </button>
          </div>
        </div>
      ) : (
        <div
          className={cn("checkAuth")}
          style={{ display: isFormVisible ? "flex" : "none" }}
        >
          <Link to="/profile" className={cn("propfileLink")}>
            Войдите
          </Link>
          , чтобы иметь возможность комментировать.
        </div>
      )}
    </>
  );
}

// Field.propTypes = {
//   label: PropTypes.node,
//   error: PropTypes.node,
//   children: PropTypes.node,
// }

// Field.defaultProps = {}

export default memo(CommentForm);
