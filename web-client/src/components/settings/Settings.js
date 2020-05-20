import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../common/button';
import useStyles from '../contractors/ContractorsStyle';

const Settings = (props) => {
  const { } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2>{t('SETTINGS_PAGE_TITLE')}</h2>
    </div>
  );
};

export default Settings;
