import React, { useContext, useState } from 'react';
import LoadingContext from '../contexts/LoadingContext';
import NotificationContext from '../contexts/NotificationContext';
import Contractors from '../components/contractors/Contractors';
import ContractorsAPI from '../APIs/ContractorsAPI';
import Logger from '../services/Logger';

const ContractorsPage = () => {
  const {startFetchingData, stopFetchingData} = useContext(LoadingContext);
  const {showErrorNotification} = useContext(NotificationContext);
  const [filter, setFilter] = useState({});
  const [data, setData] = useState([]);
  const [paginationOptions, setPaginationOptions] = useState({
    page: 0,
    pages: 0,
    pageSize: 20,
  });

  const fetchData = async ({ page, pageSize }) => {
    try {
      startFetchingData('contractors');

      const {
        data: fetchedData,
        total,
      } = await ContractorsAPI.getAll({ page, pageSize });

      setData(fetchedData);
      setPaginationOptions({
        ...paginationOptions,
        pages: Math.ceil(total / paginationOptions.pageSize),
      });
    } catch (error) {
      Logger.error(error);
      showErrorNotification(error.message);
    } finally {
      stopFetchingData('contractors');
    }
  };

  const searchData = async () => {
    try {
      startFetchingData('contractors');

      const {
        data: fetchedData,
        total,
      } = await ContractorsAPI.search(filter, {
        page: paginationOptions.page,
        pageSize: paginationOptions.pageSize,
      });

      setData(fetchedData);
      setPaginationOptions({
        ...paginationOptions,
        pages: Math.ceil(total / paginationOptions.pageSize),
      });
    } catch (error) {
      showErrorNotification(error.message);
    } finally {
      stopFetchingData('contractors');
    }
  };

  const importProfile = async (url) => {
    try {
      startFetchingData('contractors');

      const contractor = await ContractorsAPI.importProfile(url);

      const newData = [...data, contractor];

      setData(newData);
      setPaginationOptions({
        ...paginationOptions,
        pages: Math.ceil(newData.length / paginationOptions.pageSize),
      });
    } catch (error) {
      showErrorNotification(error.message);
    } finally {
      stopFetchingData('contractors');
    }
  };

  const importProfileBatch = async (url) => {
    try {
      startFetchingData('contractors');

      const contractors = await ContractorsAPI.importProfileBatch(url);

      const newData = [...data, ...contractors];

      setData(newData);
      setPaginationOptions({
        ...paginationOptions,
        pages: Math.ceil(newData.length / paginationOptions.pageSize),
      });
    } catch (error) {
      showErrorNotification(error.message);
    } finally {
      stopFetchingData('contractors');
    }
  };

  return (
    <Contractors
      data={data}
      pages={paginationOptions.pages}
      filter={filter}
      onFilterChange={setFilter}
      onSearch={searchData}
      onImport={importProfile}
      onImportBatch={importProfileBatch}
      onFetchData={(options) => fetchData({
        page: options.page,
        pageSize: options.pageSize,
      })}
    />
  );
};

export default ContractorsPage;
