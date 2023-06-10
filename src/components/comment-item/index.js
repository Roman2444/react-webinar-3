import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import dataFormat from "../../utils/date-format";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./style.css";

function CommentItem({
  id,
  name,
  dateCreate,
  text,
  level,
  setCommentAnserVisible,
  sentComment,
  isFormVisible,
  isExists,
}) {
  const [textValue, setTextValue] = useState("");

  const onHandleSentComment = (id) => {
    setCommentAnserVisible(id);
  };

  const onHandleCancel = () => {
    setCommentAnserVisible(false);
  };

  const cn = bem("CommentItem");
  return (
    <div
      className={cn()}
      style={{ marginLeft: `${(level < 15 ? level : 15) * 30}px` }}
    >
      <div className={cn("info")}>
        <span className={cn("title")}>{name}</span>
        <span className={cn("date")}>{dataFormat(dateCreate)}</span>
      </div>
      <p className={cn("text")}>{text}</p>
      <button className={cn("btn")} onClick={() => onHandleSentComment(id)}>
        Ответить
      </button>
      {isExists ? (
        <div
          style={{ display: isFormVisible ? "flex" : "none" }}
          className={cn("form")}
        >
          <span className={cn("form-title")}>{"Новый ответ"}</span>
          <textarea
            className={cn("form-comment")}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder={`Мой ответ для  ${name}`}
          ></textarea>
          <div>
            <button
              className={cn("form-btn")}
              onClick={() => sentComment(textValue, "comment", id)}
            >
              Отправить
            </button>
            <button onClick={onHandleCancel}>Отмена</button>
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
          , чтобы иметь возможность ответить.
          <span className={cn("cancelAuth")} onClick={onHandleCancel}>Отмена</span>
        </div>
      )}
    </div>
  );
}

// Field.propTypes = {
//   label: PropTypes.node,
//   error: PropTypes.node,
//   children: PropTypes.node,
// }

// Field.defaultProps = {}

export default memo(CommentItem);
