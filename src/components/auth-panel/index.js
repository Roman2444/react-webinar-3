import {memo} from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function AuthPanel({onLogout, user}) {
  const cn = bem('AuthPanel');


  return(
    <div className={cn('container')}>
      <Link className={cn('link')} to="/profile">{user}</Link>
      <button callback={onLogout} >выйти</button>
    </div>
  )
}

AuthPanel.propTypes = {
  //onLogout: propTypes.func,
 // user: propTypes.string
}

AuthPanel.defaultProps = {
  user: "тестовый пользователь"
}
export default memo(AuthPanel);
