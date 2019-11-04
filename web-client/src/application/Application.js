import React, { Fragment, useContext } from 'react';
import MobileContext from '../contexts/MobileContext';
import ApplicationRoutes from './ApplicationRoutes';
import Header from '../components/header/Header';
import getStyles from './ApplicationStyles';
import './ApplicationIcons';

export default () => {
  const { isMobile } = useContext(MobileContext);
  const classes = getStyles({ isMobile });

  return (
    <Fragment>
      <Header/>
      <div className={classes.applicationContent}>
        <ApplicationRoutes/>
      </div>
    </Fragment>
  );
};
