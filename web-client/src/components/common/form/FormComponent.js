import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import Card from '../card';
import { getClassName } from '../../../utils/ClassUtils';
import FormStyles from './FormStyles';

const Form = (props) => {
  const {
    classes,
    className,
    children,
    title,
    transparent,
  } = props;

  const rootClasses = getClassName([
    classes.root,
    className,
    transparent ? 'transparent' : '',
  ]);

  return (
    <Card className={rootClasses}>
      { title ? <div className={classes.title}>{title}</div> : null }
      <div className={classes.children}>{children}</div>
    </Card>
  );
};

Form.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  transparent: PropTypes.bool,
};

export default withStyles(FormStyles)(Form);
