import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import useStyles from './HeaderStyles';
import Card from '../common/card';
import Menu, { MenuItem } from '../common/menu';
import AuthorizationContext from '../../contexts/AuthorizationContext';
import MobileContext from '../../contexts/MobileContext';
import { getClassName } from '../../utils/ClassUtils';

export const getMenuItems = (user) => {
  return [{
    link: '/sign-in',
    label: 'MENU_ITEM_SIGN_IN',
  }, {
    link: '/sign-up',
    label: 'MENU_ITEM_SIGN_UP',
  }];
};

export const getMenu = (user, { t, isMobile, history }) => {
  const menuItems = getMenuItems(user);

  return (
    <Menu>
      {(menuItems || []).map((menu, index) => (
        <MenuItem
          key={index}
          onClick={() => history.push(menu.link)}
          label={t(menu.label)}
        />
      ))}
    </Menu>
  );
};

const Header = (props) => {
  const {
    className,
    history,
  } = props;
  const { t } = useTranslation();
  const { isMobile } = useContext(MobileContext);
  const { user } = useContext(AuthorizationContext);
  const classes = useStyles();
  const rootClasses = getClassName([
    className,
    classes.root,
  ]);

  return (
    <header className={rootClasses}>
      <Card className={classes.card}>
        {getMenu(user, { t, isMobile, history })}
      </Card>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object,
};

export default withRouter(Header);
