import React, { useContext } from 'react';
import LoadingContext from '../contexts/LoadingContext';
import NotificationContext from '../contexts/NotificationContext';
import Settings from '../components/settings/Settings';

const SettingsPage = () => {
  const { startSavingData, stopSavingData } = useContext(LoadingContext);
  const { showErrorNotification } = useContext(NotificationContext);

  return (
    <Settings
    />
  );
};

export default SettingsPage;
