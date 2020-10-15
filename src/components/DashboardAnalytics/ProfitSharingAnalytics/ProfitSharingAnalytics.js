import React, { useEffect, useState } from "react";
import tradeApi from "../../../services/tradeApiClient";
import useStoreSessionSelector from "../../../hooks/useStoreSessionSelector";
import useStoreSettingsSelector from "../../../hooks/useStoreSettingsSelector";
import { showErrorAlert } from "../../../store/actions/ui";
import { useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import TradingPerformance from "../../Provider/Analytics/TradingPerformance";
import TotalEquityBar from "../../TotalEquityBar";
import EquityPart from "../../TotalEquityBar/EquityPart";
import { formatFloat, FormatedDateTime } from "../../../utils/format";
import ProfitSharingTable from "./ProfitSharingTable";
import ProfitSharingEquityChart from "./ProfitSharingEquityChart";
import "./ProfitSharingAnalytics.scss";

/**
 * @typedef {import("../../../services/tradeApiClient.types").ProfitSharingBalanceHistory} ProfitSharingBalanceHistory
 * @typedef {import("../../../services/tradeApiClient.types").ProviderEntity} ProviderEntity
 */

/**
 * @typedef {Object} DefaultProps
 * @property {ProviderEntity} provider
 */

/**
 * Render analytics panels for profit sharing providers.
 *
 * @param {DefaultProps} props Component props.
 * @returns {JSX.Element} JSX
 */
const ProfitSharingAnalytics = ({ provider }) => {
  const storeSession = useStoreSessionSelector();
  const [performance, setPerformance] = useState(null);
  const [performanceLoading, setPerformanceLoading] = useState(false);
  const [balanceHistory, setBalanceHistory] = useState(
    /** @type {ProfitSharingBalanceHistory} */ (null),
  );
  const [balanceHistoryLoading, setBalanceHistoryLoading] = useState(false);
  const storeSettings = useStoreSettingsSelector();
  const color = "green";
  const balance = {
    totalUSDT: 100,
    totalBTC: 0.01,
    pnlBTC: 0,
    pnlUSDT: 0,
    totalFreeBTC: 0,
    totalFreeUSDT: 0,
    totalLockedBTC: 0,
    totalLockedUSDT: 0,
  };

  const dispatch = useDispatch();

  const getProviderPerformance = () => {
    const payload = {
      token: storeSession.tradeApi.accessToken,
      providerId: provider.id,
    };
    setPerformanceLoading(true);

    tradeApi
      .providerPerformanceGet(payload)
      .then((response) => {
        setPerformance(response);
      })
      .catch((e) => {
        dispatch(showErrorAlert(e));
      })
      .finally(() => {
        setPerformanceLoading(false);
      });
  };
  useEffect(getProviderPerformance, []);

  const getProfitSharingBalanceHistory = () => {
    const payload = {
      token: storeSession.tradeApi.accessToken,
      //   providerId: provider.id,
      providerId: "5f87273d3661db421e77fe73",
      exchangeInternalId: storeSettings.selectedExchange.internalId,
    };
    setBalanceHistoryLoading(true);

    tradeApi
      .getProfitSharingBalanceHistory(payload)
      .then((response) => {
        setBalanceHistory(response);
      })
      .catch((e) => {
        dispatch(showErrorAlert(e));
      })
      .finally(() => {
        setBalanceHistoryLoading(false);
      });
  };
  useEffect(getProfitSharingBalanceHistory, []);

  return (
    <Box
      className="profitSharingAnalytics"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {performanceLoading ? (
        <CircularProgress color="primary" size={50} />
      ) : (
        performance && <TradingPerformance performance={performance} />
      )}
      <TotalEquityBar>
        {balanceHistory && (
          <>
            <EquityPart
              name="profitsharing.initAllocated"
              //   info={<div>= USDT {formatFloat(balance.totalFreeUSDT)}</div>}
              value={
                <>
                  {balanceHistory.quote} {formatFloat(balanceHistory.currentBalance)}
                </>
              }
            />
            {/* <span className="operator">+</span> */}
            <EquityPart
              name="profitsharing.currentAllocated"
              //   info={<>= USDT {formatFloat(10.1)}</>}
              value={
                <>
                  {balanceHistory.quote} {formatFloat(balanceHistory.currentBalance)}
                </>
              }
            />
            {/* <span className="operator">+</span> */}
            <EquityPart
              name="profitsharing.retain"
              value={
                <>
                  <Typography className={`number1 ${color}`}>
                    {balanceHistory.quote} {formatFloat(0.004)}
                  </Typography>
                  {/* <Typography className={`number1 pnlPercent ${color}`}>10%</Typography> */}
                </>
              }
            />
            {/* <span className="operator">=</span> */}
            <EquityPart
              name="profitsharing.watermark"
              //   info={
              //     <>
              //       <Typography variant="h4">
              //         <FormattedMessage id="balance.total" />
              //       </Typography>
              //       <Typography className="smallText number3">= USDT {formatFloat(10)}</Typography>
              //     </>
              //   }
              value={
                <>
                  {balanceHistory.quote} {formatFloat(balanceHistory.watermark)}
                </>
              }
            />
          </>
        )}
      </TotalEquityBar>

      <Box display="flex" width={1}>
        <ProfitSharingEquityChart />
        <Box display="flex" justifyContent="center" alignItems="center" className="tableBox">
          {balanceHistoryLoading ? (
            <CircularProgress color="primary" size={50} />
          ) : (
            balanceHistory && <ProfitSharingTable data={balanceHistory.entries} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfitSharingAnalytics;
