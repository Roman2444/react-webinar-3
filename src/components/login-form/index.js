import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import Input from "../../components/input";
import './style.css';

function LoginForm({handleFetchLogin, onChangeLogin, onChangePassword, errorMessage, t}) {

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
      <h2 className={cn('title')}>{t('auth.title')}</h2>
        <div className={cn('container')}>
          <div className={cn('item')}>
            <label className={cn('label')}>{t('auth.label.login')}</label>
            <Input type="text" onChange={onChangeLogin} value=""/>
          </div>

          <div className={cn('item')}>
            <label className={cn('label')}>{t('auth.label.password')}</label>
            <Input type="password" onChange={onChangePassword} value=""/>
          </div>
        </div>
        {
          errorMessage ? <span className={cn('error')}>{errorMessage}</span> : null
        }
        <input className={cn('btn')} type="submit" value={t('auth.submit')}/>
    </form>
  );
}

LoginForm.propTypes = {
  handleFetchLogin: PropTypes.func,
  onChangeLogin: PropTypes.func,
  onChangePassword: PropTypes.func,
  errorMessage: PropTypes.string
};

export default memo(LoginForm);
