import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
export default function Button(props) {
  const { type, isExternal, href, style, target, children } = props;
  const className = [props.className];
  const onClick = () => {
    if (props.onClick) props.onClick();
  };
  if (type === 'link') {
    if (isExternal) {
      return (
        <a
          href={href}
          className={className.join(' ')}
          style={style}
          target={target === '_blank' ? '_blank' : undefined}
          rel='noopener noreferrer'>
          {children}
        </a>
      );
    } else {
      return (
        <Link
          to={href}
          className={className.join(' ')}
          style={style}
          onClick={onClick}>
          {children}
        </Link>
      );
    }
  }
  return (
    <button
      className={className.join(' ')}
      style={props.style}
      onClick={onClick}>
      {props.children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'link']),
  onClick: PropTypes.func,
  target: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
  isExternal: PropTypes.bool,
};
