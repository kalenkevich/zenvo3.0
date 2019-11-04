import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import AvatarStyles from './AvatarStyle';
import Icon from '../icon';
import { getClassName } from '../../../utils/ClassUtils';

const Avatar = (props) => {
  const {
    className,
    classes,
    url,
    rate,
    size = 'md',
  } = props;

  const rootClasses = getClassName([
    classes.root,
    className,
  ]);
  const imgClassNames = getClassName([
    classes.image,
    size,
  ]);
  const rateClassNames = getClassName([
    classes.rate,
    size,
  ]);
  const rateBackgroundClassNames = getClassName([
    classes.rateBackground,
    size,
  ]);

  return (
    <div className={rootClasses}>
      <Icon className={imgClassNames} src={url} type={'USER_ICON'}/>
      { rate ? (
        <>
          <div className={rateBackgroundClassNames}/>
          <div className={rateClassNames}>{rate}</div>
        </>
      ) : null}
    </div>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  url: PropTypes.string,
  rate: PropTypes.number,
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
};

export default withStyles(AvatarStyles)(Avatar);
