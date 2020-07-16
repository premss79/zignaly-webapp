import React, { useEffect, useState } from "react";
import Table from "../../../../Table";
import { Box } from "@material-ui/core";
import useStoreSessionSelector from "../../../../../hooks/useStoreSessionSelector";
import tradeApi from "../../../../../services/tradeApiClient";
import "./WithdrawHistoryTable.scss";
import { FormattedMessage } from "react-intl";
import { FormatedDateTime } from "../../../../../utils/format";

/**
 * @typedef {import("mui-datatables").MUIDataTableColumn} MUIDataTableColumn
 */

/**
 * @typedef {Object} WithdrawHistoryTablePropTypes
 * @property {string} internalId Exchange account internal id.
 * @property {Date} updatedAt Last updated date to force data refresh.
 */

/**
 * Provides a table for withdraw history.
 *
 * @param {WithdrawHistoryTablePropTypes} props Component properties.
 * @returns {JSX.Element} Component JSX.
 */
const WithdrawHistoryTable = ({ internalId, updatedAt }) => {
  const storeSession = useStoreSessionSelector();
  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const payload = {
        token: storeSession.tradeApi.accessToken,
        internalId,
      };

      tradeApi
        .exchangeLastWithdrawalsGet(payload)
        .then((data) => {
          setWithdraws(data);
        })
        .catch((e) => {
          alert(`ERROR: ${e.message}`);
        });
    };
    loadData();
  }, [internalId, storeSession.tradeApi.accessToken, updatedAt]);

  /**
   * @type {Array<MUIDataTableColumn>} Table columns
   */
  let columns = [
    {
      name: "status",
      label: "col.stat",
    },
    {
      name: "currency",
      label: "col.coin",
    },
    {
      name: "amount",
      label: "col.amount",
    },
    {
      name: "timestamp",
      label: "col.date",
      options: {
        customBodyRender: FormatedDateTime,
        sortDirection: "desc",
      },
    },
    {
      name: "tag",
      label: "col.information",
    },
    {
      name: "txid",
      label: "col.txnid",
    },
  ];

  return (
    <Box className="withdrawHistoryTable" display="flex" flexDirection="column" width={1}>
      <Table
        columns={columns}
        data={withdraws}
        persistKey="withdrawHistory"
        title={<FormattedMessage id="accounts.withdraw.history" />}
      />
    </Box>
  );
};

export default WithdrawHistoryTable;
