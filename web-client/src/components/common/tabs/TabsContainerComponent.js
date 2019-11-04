import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { getClassName } from '../../../utils/ClassUtils';
import TabsContainerStyle from './TabsContainerStyle';
import Card from '../card';

const TabsContainerComponent = (props) => {
  const {
    classes,
    children,
    className,
  } = props;

  const classNames = getClassName([
    classes.root,
    className,
  ]);

  return (
    <Card className={classNames}>
      {children}
    </Card>
  );
};

TabsContainerComponent.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  children: PropTypes.node,
};

export default withStyles(TabsContainerStyle)(TabsContainerComponent);
