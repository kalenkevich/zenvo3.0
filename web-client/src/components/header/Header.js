import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import useStyles from './HeaderStyles';
import Card from '../common/card';
import Menu, { MenuItem } from '../common/menu';
import MobileContext from '../../contexts/MobileContext';
import { getClassName } from '../../utils/ClassUtils';

export const getMenuItems = () => {
  return [{
    link: '/contractors',
    label: 'MENU_ITEM_CONTRACTORS',
  }, {
    link: '/settings',
    label: 'MENU_ITEM_SETTINGS',
  }];
};

export const getMenu = ({ t, history }) => {
  const menuItems = getMenuItems();

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
  const classes = useStyles();
  const rootClasses = getClassName([
    className,
    classes.root,
  ]);

  return (
    <header className={rootClasses}>
      <Card className={classes.card}>
        {getMenu({ t, isMobile, history })}
      </Card>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object,
};

export default withRouter(Header);
