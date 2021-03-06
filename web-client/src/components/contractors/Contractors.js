import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Table from 'react-table';
import 'react-table/react-table.css';
import useStyles from './ContractorsStyle';
import LoadingContext from '../../contexts/LoadingContext';
import ImportForm from './ImportForm';

const ContractorsPage = (props) => {
  const {
    data,
    pages,
    onFetchData,
    onImport,
    onImportBatch,
  } = props;

  const { t } = useTranslation();
  const { isLoading } = useContext(LoadingContext);
  const classes = useStyles();

  const columns = useMemo(() => [{
    Header: t('CONTRACTORS_TABLE_ID'),
    accessor: 'id',
  }, {
    Header: t('CONTRACTORS_TABLE_COLUMN_NAME'),
    accessor: 'name',
    Cell: row => {
      if (row.original.sourceId) {
        return <a href={row.original.sourceId} target={'_blank'}>{row.value}</a>;
      }

      return row.value;
    }
  }, {
    Header: t('CONTRACTORS_TABLE_COLUMN_LOCATION'),
    id: 'locationName',
    accessor: (data) => data.location.name,
  }, {
    Header: t('CONTRACTORS_TABLE_COLUMN_CATEGORY'),
    id: 'categoryName',
    accessor: (data) => data.category.name,
  }, {
    Header: t('CONTRACTORS_TABLE_COLUMN_SKILLS'),
    id: 'skills',
    accessor: (data) => data.skills.map(({ name }) => name).join(', '),
  }, {
    Header: t('CONTRACTORS_TABLE_COLUMN_SKILLS_COUNT'),
    id: 'skillsCount',
    accessor: (data) => data.skills.length,
  }], []);
  const loading = isLoading('contractors');

  return (
    <div className={classes.root}>
      <h2>{t('CONTRACTORS_PAGE_TITLE')}</h2>
      <ImportForm
        label={t('IMPORT_PROFILE_LABEL')}
        onImport={onImport}
      />
      <ImportForm
        label={t('IMPORT_BATCH_PROFILE_LABEL')}
        onImport={onImportBatch}
      />
      <Table
        manual
        data={data}
        pages={pages}
        columns={columns}
        loading={loading}
        defaultPageSize={20}
        onFetchData={onFetchData}
        className="-striped -highlight"
      />
    </div>
  );
};

ContractorsPage.propTypes = {
  data: PropTypes.array,
  pages: PropTypes.number,
  pageSize: PropTypes.number,
  onFetchData: PropTypes.func,
  onImport: PropTypes.func,
  onImportBatch: PropTypes.func,
};

export default ContractorsPage;
