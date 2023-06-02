import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import Input from "../../components/input";
import './style.css';

function LoginForm({handleFetchLogin, onChangeLogin, onChangePassword, errorMessage}) {

  const cn = bem('LoginForm');

  // const callbacks = {
  //   onAdd: (e) => props.onAdd(props.item._id),
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFetchLogin();
  } 

  return (
    <form onSubmit={handleSubmit} className={cn()}>
      <h2 className={cn('title')}>Вход</h2>
        <div className={cn('container')}>
          <div className={cn('item')}>
            <label className={cn('label')}>Логин</label>
            <Input type="text" onChange={onChangeLogin} value=""/>
          </div>

          <div className={cn('item')}>
            <label className={cn('label')}>Пароль</label>
            <Input type="password" onChange={onChangePassword} value=""/>
          </div>
        </div>
        {
          errorMessage ? <span className={cn('error')}>{errorMessage}</span> : null
        }
        <input className={cn('btn')} type="submit" value="Войти"/>
    </form>
  );
}

LoginForm.propTypes = {
  handleFetchLogin: PropTypes.func,
  onChangeLogin: PropTypes.func,
  onChangePassword: PropTypes.func,
  //errorMessage: propTypes.string
};

LoginForm.defaultProps = {
  handleFetchLogin: () => {},
  onChangeLogin: () => {},
  onChangePassword: () => {},
  //errorMessage: 'текст ошибки'
}

export default memo(LoginForm);
