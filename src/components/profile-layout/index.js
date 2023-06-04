import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PropfileLayout(props) {
console.log('PropfileLayout',props)
  const cn = bem('PropfileLayout');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Профиль</h2>
      <p className={cn('info')}>Имя: <b>{props.user?.profile?.name}</b></p>
      <p className={cn('info')}>Телефон: <b>{props.user?.profile?.phone}</b></p>
      <p className={cn('info')}>email: <b>{props.user?.email}</b></p>
    </div>
  );
}
// {props.user.name}
// LoginForm.propTypes = {
//   handleFetchLogin: PropTypes.func,
//   onChangeLogin: PropTypes.func,
//   onChangePassword: PropTypes.func,
//   //errorMessage: propTypes.string
// };

// LoginForm.defaultProps = {
//   handleFetchLogin: () => {},
//   onChangeLogin: () => {},
//   onChangePassword: () => {},
//   //errorMessage: 'текст ошибки'
// }

export default memo(PropfileLayout);
