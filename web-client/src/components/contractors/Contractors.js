import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Table from 'react-table';
import 'react-table/react-table.css';
import useStyles from './ContractorsStyle';
import LoadingContext from '../../contexts/LoadingContext';

const ContractorsPage = (props) => {
  const {
    data,
    pages,
    onFetchData,
  } = props;

  const { t } = useTranslation();
  const { isLoading } = useContext(LoadingContext);
  const classes = useStyles();

  const columns = useMemo(() => [{
    Header: t('USER_STRUCTURE_TABLE_BINARY_COLUMN_NAME'),
    accessor: 'name',
    Cell: row => (<Link to={`/profile/${row.original.node.user.id}/structure/binary`}>{row.value}</Link>)
  }, {
    Header: t('USER_STRUCTURE_TABLE_BINARY_COLUMN_ID'),
    id: 'id',
    accessor: 'id',
  }, {
    Header: t('USER_STRUCTURE_TABLE_BINARY_COLUMN_DEPTH'),
    id: 'depth',
    accessor: 'depth',
  }, {
    Header: t('USER_STRUCTURE_TABLE_BINARY_COLUMN_QUALIFICATION'),
    id: 'qualification',
    accessor: 'qualification',
  }, {
    Header: t('USER_STRUCTURE_TABLE_BINARY_COLUMN_REGISTRATION_DATE'),
    id: 'createdAt',
    accessor: 'createdAt',
  }, {
    Header: t('USER_STRUCTURE_TABLE_BINARY_COLUMN_ACTIVATION_DATE'),
    id: 'activatedAt',
    accessor: 'activatedAt',
  }, {
    Header: t('USER_STRUCTURE_TABLE_BINARY_COLUMN_CHILDREN'),
    id: 'children',
    accessor: 'children',
  }, {
    Header: t('USER_STRUCTURE_TABLE_BINARY_COLUMN_RULE'),
    id: 'rule',
    accessor: 'rule',
  }], []);
  const loading = isLoading('userBinaryStructure');

  return (
    <div className={classes.root}>
      <h2>{t('USER_STRUCTURE_PAGE_TITLE_BINARY')}</h2>
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
};

export default ContractorsPage;
