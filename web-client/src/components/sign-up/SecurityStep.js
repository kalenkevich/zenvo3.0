import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Input from '../../components/common/input';
import Button from '../../components/common/button';
import Form, { FormSection, FormSectionAction } from '../../components/common/form';
import useStyle from './SignUpStyle';

const PhoneStep = (props) => {
  const {
    formData,
    onFormDataChange,
    onContinueClick,
    onBackButtonClick,
  } = props;

  const { t } = useTranslation();
  const classes = useStyle();

  return (
    <Form
      className={classes.root}
      title={t('SIGN_UP_SECURITY_STEP_FORM_TITLE')}
    >
      <FormSection>
        <Input
          label={t('SIGN_UP_SECURITY_STEP_FORM_CODE')}
          error={formData.code.error}
          value={formData.code.value}
          onChange={(e) => onFormDataChange('code', e.target.value)}
        />
      </FormSection>
      <FormSectionAction>
        <Button
          onClick={onContinueClick}
          type='primary'
          disabled={!formData.isValid}
        >
          {t('SIGN_UP_PHONE_SECURITY_FORM_CONTINUE')}
        </Button>
        <Button
          onClick={onBackButtonClick}
        >
          {t('SIGN_UP_PHONE_SECURITY_FORM_BACK')}
        </Button>
      </FormSectionAction>
    </Form>
  );
};

PhoneStep.propTypes = {
  formData: PropTypes.object,
  onFormDataChange: PropTypes.func,
  onContinueClick: PropTypes.func,
  onBackButtonClick: PropTypes.func,
};

export default PhoneStep;
