import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useStyles from './ImportFormStyle';
import { getClassName } from '../../utils/ClassUtils';
import Input from '../common/input';
import Button from '../common/button';

const ImportForm = (props) => {
  const { className, onImport, label } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const rootClasses = getClassName([
    classes.root,
    className,
  ]);

  const [url, setUrl] = useState('');

  const onButtonClick = useCallback(() => {
    if (url) {
      onImport(url)
    }
  }, [url]);

  return (
    <div className={rootClasses}>
      <Input
        className={classes.input}
        label={label}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button
        className={classes.button}
        type='primary'
        onClick={onButtonClick}
      >
        {t('IMPORT_PROFILE_BUTTON')}
      </Button>
    </div>
  );
};

ImportForm.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onImport: PropTypes.func,
};

export default ImportForm;
