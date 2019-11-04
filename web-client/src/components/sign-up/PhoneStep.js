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
    onSignInButtonClick,
  } = props;

  const { t } = useTranslation();
  const classes = useStyle();

  return (
    <Form
      className={classes.root}
      title={t('SIGN_UP_PHONE_STEP_FORM_TITLE')}
    >
      <FormSection>
        <Input
          label={t('SIGN_UP_PHONE_STEP_FORM_SPONSOR_ID')}
          error={formData.sponsorId.error}
          value={formData.sponsorId.value}
          onChange={(e) => onFormDataChange('sponsorId', e.target.value)}
        />
        <Input
          label={t('SIGN_UP_PHONE_STEP_FORM_PHONE')}
          error={formData.phone.error}
          value={formData.phone.value}
          onChange={(e) => onFormDataChange('phone', e.target.value)}
        />
      </FormSection>
      <FormSectionAction>
        <Button
          onClick={onContinueClick}
          type='primary'
          disabled={!formData.isValid}
        >
          {t('SIGN_UP_PHONE_STEP_FORM_CONTINUE')}
        </Button>
        <Button
          onClick={onSignInButtonClick}
        >
          {t('SIGN_UP_PHONE_STEP_FORM_SIGN_IN')}
        </Button>
      </FormSectionAction>
    </Form>
  );
};

PhoneStep.propTypes = {
  formData: PropTypes.object,
  onFormDataChange: PropTypes.func,
  onContinueClick: PropTypes.func,
  onSignInButtonClick: PropTypes.func,
};

export default PhoneStep;
