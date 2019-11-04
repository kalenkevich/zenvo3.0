import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { USER_ICON } from './IconType';
import { getClassName } from '../../../utils/ClassUtils';

export const getIconByType = (type, className, classes) => {
  switch (type) {
    case USER_ICON:
      return <img
        className={`${className} ${classes.root}`}
        src='https://via.placeholder.com/50/BEBEBE/000000?Text=No'
      />;
    default:
      return null;
  }
};

export const styles = {
  root: {
    objectFit: 'contain',
  },
};

const Icon = ({
  src,
  type,
  className = '',
  classes,
}) => {
  const [imageLoadFail, setImageLoadFail] = useState(false);
  const rootClasses = getClassName([
    classes.root,
    className,
  ]);

  if (!src || imageLoadFail) {
    return getIconByType(type, className, classes);
  }

  return <img
    src={src}
    className={rootClasses}
    onError={() => setImageLoadFail(true)}
  />;
};

Icon.propTypes = {
  src: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  classes: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default withStyles(styles)(Icon);
