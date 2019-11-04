import React, { useCallback, useContext, useState } from 'react';
import LoadingContext from '../contexts/LoadingContext';
import NotificationContext from '../contexts/NotificationContext';
import Contractors from '../components/contractors/Contractors';
import ContractorsAPI from '../APIs/ContractorsAPI';

const ContractorsPage = () => {
  const {startFetchingData, stopFetchingData} = useContext(LoadingContext);
  const {showErrorNotification} = useContext(NotificationContext);
  const [contractors, setContractors] = useState([]);
  const [filter, setFilter] = useState({});
  const paginationOptions = useState({});

  const onSearch = useCallback(async () => {
    try {
      startFetchingData('contractors');

      const { data, total } = await ContractorsAPI.search(filter);

      setContractors(foundContractors);
    } catch (error) {
      showErrorNotification(error.message);
    } finally {
      stopFetchingData('contractors');
    }
  }, [filter]);

  return (
    <Contractors
      contractors={contractors}
      filter={filter}
      onFilterChange={setFilter}
      onSearch={onSearch}
    />
  );
};

export default ContractorsPage;
