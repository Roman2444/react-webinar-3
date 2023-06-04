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
      <button callback={onLogout} >войти</button>
    </div>
  )
}

// ArticleCard.propTypes = {
//   article: PropTypes.shape({
//     _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     description: PropTypes.string,
//     madeIn: PropTypes.object,
//     category: PropTypes.object,
//     edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     price: PropTypes.number
//   }).isRequired,
//   onAdd: PropTypes.func,
//   t: PropTypes.func
// };

// ArticleCard.defaultProps = {
//   onAdd: () => {},
//   t: (text) => text
// }

export default memo(AuthPanel);
