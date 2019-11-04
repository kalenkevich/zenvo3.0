import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Input from '../../components/common/input';
import Button from '../../components/common/button';
import Form, { FormSection, FormSectionAction } from '../../components/common/form';
import useStyle from './SignInStyle';

const SignIn = (props) => {
  const {
    formData,
    onFormDataChange,
    onSignInButtonClick,
    onSignUpButtonClick,
  } = props;

  const { t } = useTranslation();
  const classes = useStyle();

  return (
    <Form
      className={classes.root}
      title={t('SIGN_IN_FORM_TITLE')}
    >
      <FormSection>
        <Input
          label={t('SIGN_IN_FORM_PHONE')}
          error={formData.phone.error}
          value={formData.phone.value}
          onChange={(e) => onFormDataChange('phone', e.target.value)}
        />
        <Input
          type='password'
          label={t('SIGN_IN_FORM_PASSWORD')}
          error={formData.password.error}
          value={formData.password.value}
          onChange={(e) => onFormDataChange('password', e.target.value)}
        />
      </FormSection>
      <FormSectionAction>
        <Button
          onClick={onSignInButtonClick}
          type='primary'
          disabled={!formData.isValid}
        >
          {t('SIGN_IN_FORM_CONTINUE')}
        </Button>
        <Button
          onClick={onSignUpButtonClick}
        >
          {t('SIGN_IN_FORM_SIGN_UP')}
        </Button>
      </FormSectionAction>
    </Form>
  );
};

SignIn.propTypes = {
  formData: PropTypes.object,
  onFormDataChange: PropTypes.func,
  onSignInButtonClick: PropTypes.func,
  onSignUpButtonClick: PropTypes.func,
};

export default SignIn;
