import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Input from '../../components/common/input';
import Button from '../../components/common/button';
import Form, { FormSection, FormSectionAction } from '../../components/common/form';
import useStyle from './SignUpStyle';

const FinishStep = (props) => {
  const {
    formData,
    onFormDataChange,
    onFinishButtonClick,
    onBackButtonClick,
  } = props;

  const { t } = useTranslation();
  const classes = useStyle();

  return (
    <Form
      className={classes.root}
      title={t('SIGN_UP_FINISH_STEP_FORM_TITLE')}
    >
      <FormSection>
        <Input
          label={t('SIGN_UP_FINISH_STEP_FORM_FIRST_NAME')}
          error={formData.firstName.error}
          value={formData.firstName.value}
          onChange={(e) => onFormDataChange('firstName', e.target.value)}
        />
        <Input
          label={t('SIGN_UP_FINISH_STEP_FORM_LAST_NAME')}
          error={formData.lastName.error}
          value={formData.lastName.value}
          onChange={(e) => onFormDataChange('lastName', e.target.value)}
        />
        <Input
          type='password'
          label={t('SIGN_UP_FINISH_STEP_FORM_PASSWORD')}
          error={formData.password.error}
          value={formData.password.value}
          onChange={(e) => onFormDataChange('password', e.target.value)}
        />
        <Input
          type='password'
          label={t('SIGN_UP_FINISH_STEP_FORM_REPEAT_PASSWORD')}
          error={formData.repeatPassword.error}
          value={formData.repeatPassword.value}
          onChange={(e) => onFormDataChange('repeatPassword', e.target.value)}
        />
        <Input
          type='password'
          label={t('SIGN_UP_FINISH_STEP_FORM_PINCODE')}
          error={formData.pincode.error}
          value={formData.pincode.value}
          onChange={(e) => onFormDataChange('pincode', e.target.value)}
        />
        <Input
          type='password'
          label={t('SIGN_UP_FINISH_STEP_FORM_REPEAT_PINCODE')}
          error={formData.repeatPincode.error}
          value={formData.repeatPincode.value}
          onChange={(e) => onFormDataChange('repeatPincode', e.target.value)}
        />
      </FormSection>
      <FormSectionAction>
        <Button
          onClick={onFinishButtonClick}
          type='primary'
          disabled={!formData.isValid}
        >
          {t('SIGN_UP_FINISH_FORM_FINISH')}
        </Button>
        <Button
          onClick={onBackButtonClick}
        >
          {t('SIGN_UP_FINISH_FORM_BACK')}
        </Button>
      </FormSectionAction>
    </Form>
  );
};

FinishStep.propTypes = {
  formData: PropTypes.object,
  onFormDataChange: PropTypes.func,
  onFinishButtonClick: PropTypes.func,
  onBackButtonClick: PropTypes.func,
};

export default FinishStep;
