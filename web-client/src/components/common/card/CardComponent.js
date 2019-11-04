import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { getClassName } from '../../../utils/ClassUtils';
import CardStyle from './CardStyle';

const Card = (props) => {
  const {
    classes,
    className,
    children,
    onKeyPress = () => {},
  } = props;
  const rootClasses = getClassName([
    classes.root,
    className,
  ]);

  return (
    <div className={rootClasses} onKeyPress={onKeyPress}>
      {children}
    </div>
  );
};

Card.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
  onKeyPress: PropTypes.func,
};

export default withStyles(CardStyle)(Card);
