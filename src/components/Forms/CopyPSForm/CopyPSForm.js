import React, { useState, useEffect } from "react";
import "./CopyPSForm.scss";
import {
  Box,
  Typography,
  CircularProgress,
  FormHelperText,
  Checkbox,
  OutlinedInput,
} from "@material-ui/core";
import CustomButton from "../../CustomButton/CustomButton";
import { useForm, Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import useSelectedExchange from "hooks/useSelectedExchange";
import tradeApi from "../../../services/tradeApiClient";
import { getProvider } from "../../../store/actions/views";
import { showErrorAlert } from "../../../store/actions/ui";
import { useIntl } from "react-intl";
import useAvailableBalance from "../../../hooks/useAvailableBalance";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { formatNumber } from "utils/formatters";
import NumberInput from "../NumberInput";
import { isNil } from "lodash";
import { Help } from "@material-ui/icons";

/**
 * @typedef {Object} DefaultProps
 * @property {import('../../../services/tradeApiClient.types').DefaultProviderGetObject} provider
 * @property {Function} onClose
 * @property {Function} onSuccess
 */

/**
 * Form to copy a PS service.
 *
 * @param {DefaultProps} props Default props.
 * @returns {JSX.Element} Component JSX.
 */
const CopyPSForm = ({ provider, onClose, onSuccess }) => {
  const selectedExchange = useSelectedExchange();
  const [loading, setLoading] = useState(false);
  const [profitsMode, setProfitsMode] = useState(provider.profitsMode || "reinvest");
  const {
    errors,
    handleSubmit,
    control,
    formState: { isValid },
    register,
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
    shouldUnregister: false,
  });
  const dispatch = useDispatch();
  const intl = useIntl();
  const { balance, loading: balanceLoading } = useAvailableBalance(selectedExchange, true);
  const quoteBalance = (balance && balance[provider.copyTradingQuote]) || 0;
  const [step, setStep] = useState(1);
  const allocatedBalance = watch(
    "allocatedBalance",
    !provider.disable ? provider.allocatedBalance : "",
  );

  // Update validation when we receive quote balance
  useEffect(() => {
    if (allocatedBalance && quoteBalance) {
      trigger();
    }
  }, [quoteBalance]);

  /**
   * Check allocated amount is correct
   * @param {string} val Value.
   * @returns {boolean|string} Result or error message.
   */
  const validateAmount = (val) => {
    const newAllocated = parseFloat(val);

    if (!newAllocated) {
      return false;
    }

    if (!provider.disable && newAllocated < provider.allocatedBalance) {
      return intl.formatMessage({ id: "form.error.allocatedBalance.reduce" });
    }

    // Check maxAllocated
    if (
      !isNil(provider.maxAllocatedBalance) &&
      newAllocated + provider.allocatedBalance > provider.maxAllocatedBalance
    ) {
      return intl.formatMessage(
        { id: "copyt.copy.error.max" },
        { max: provider.maxAllocatedBalance, quote: provider.copyTradingQuote },
      );
    }

    if (!balanceLoading) {
      // Balance checks
      if (provider.disable && quoteBalance < newAllocated) {
        return intl.formatMessage(
          { id: "copyt.copy.error3" },
          { quote: provider.copyTradingQuote },
        );
      } else if (quoteBalance < newAllocated - provider.allocatedBalance) {
        return intl.formatMessage(
          { id: "copyt.copy.error5" },
          { quote: provider.copyTradingQuote },
        );
      }
    }
    return true;
  };

  /**
   *
   * @typedef {Object} FormData
   * @property {String} allocatedBalance
   * @property {String} transfer
   */

  /**
   * Submit form callback.
   * @param {FormData} data Form data.
   * @returns {void}
   */
  const onSubmit = (data) => {
    if (step === 1 && provider.disable) {
      setStep(2);
    } else {
      setLoading(true);
      const payload = {
        allocatedBalance: data.allocatedBalance,
        balanceFilter: true,
        connected: provider.connected ? provider.connected : false,
        providerId: provider.id,
        exchangeInternalId: selectedExchange.internalId,
        profitsMode: profitsMode,
      };
      tradeApi
        .traderConnect(payload)
        .then(() => {
          const payloadProvider = {
            providerId: provider.id,
            exchangeInternalId: selectedExchange.internalId,
          };
          dispatch(getProvider(payloadProvider, false));
          onClose();
          onSuccess();
        })
        .catch((e) => {
          dispatch(showErrorAlert(e));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  let terms = ["ack2", "ack3"];
  if (provider.exchangeType === "futures") {
    // Add terms for futures PS
    terms.unshift("ack1");
  }
  const helpUrls = {
    ack1: "https://help.zignaly.com/hc/en-us/articles/360017357399#h_01FTBM69RSNKRQHD7F22PFWAHJ",
    ack2: "https://help.zignaly.com/hc/en-us/articles/360017357399#h_01FD8B8FG4PBGHM4FASXFGWEBX",
    ack3: "https://help.zignaly.com/hc/en-us/articles/360017357399#h_01FN1G0MEVR75AK8M0P92NJPV1",
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        alignItems="center"
        className="copyPSForm"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
      >
        {step === 1 ? (
          <>
            <Typography variant="h3">
              <FormattedMessage id="profitsharing.start" />
            </Typography>

            <Box
              alignItems="start"
              className="allocatedBox"
              display="flex"
              flexDirection="column"
              justifyContent="start"
            >
              <Typography>
                <FormattedMessage id="profitsharing.howmuch" />
              </Typography>
              <NumberInput
                control={control}
                defaultValue={allocatedBalance}
                error={!!errors.allocatedBalance}
                name="allocatedBalance"
                placeholder={intl.formatMessage({
                  id: "trader.amount.placeholder.1",
                })}
                quote={provider.copyTradingQuote}
                rules={{
                  required: true,
                  validate: (/** @type {string} */ val) => validateAmount(val),
                }}
              />
              {errors.allocatedBalance && (
                <span className={"text red"}>{errors.allocatedBalance.message}</span>
              )}
              <FormHelperText component="div">
                <Box alignItems="center" display="flex" flexDirection="row">
                  <FormattedMessage id="deposit.available" />
                  {balanceLoading ? (
                    <CircularProgress color="primary" size={15} />
                  ) : (
                    <>
                      {provider.copyTradingQuote}&nbsp;
                      <span className="balance">{formatNumber(quoteBalance)}</span>
                    </>
                  )}
                </Box>
              </FormHelperText>
            </Box>

            <Typography className="modeTitle">
              <FormattedMessage id="profitsharing.profitsmode" />
            </Typography>

            <ToggleButtonGroup
              className="modeButtons"
              exclusive
              onChange={(e, val) => val && setProfitsMode(val)}
              value={profitsMode}
            >
              <ToggleButton value="reinvest">
                <FormattedMessage id="trader.reinvest" />
              </ToggleButton>
              <ToggleButton value="withdraw">
                <FormattedMessage id="trader.withdraw" />
              </ToggleButton>
            </ToggleButtonGroup>
          </>
        ) : (
          <>
            <Typography variant="h3">
              <FormattedMessage id="profitsharing.confirm" />
            </Typography>

            <Typography className="summaryTitle">
              <FormattedMessage id="profitsharing.investing" />
              :&nbsp;
              <b>
                {allocatedBalance} {provider.copyTradingQuote}
              </b>
            </Typography>
            <Typography>
              <FormattedMessage id="profitsharing.profitswillbe" />
              :&nbsp;
              <b>
                <FormattedMessage
                  id={
                    profitsMode === "reinvest"
                      ? "profitsharing.reinvested"
                      : "profitsharing.withdrawn"
                  }
                />
              </b>
            </Typography>
            <Box className="acks" display="flex" flexDirection="column">
              {terms.map((ack) => (
                <Box className="ack" key={ack}>
                  <label className="customLabel">
                    <Controller
                      control={control}
                      defaultValue={false}
                      name={ack}
                      render={({ onChange, value }) => (
                        <Checkbox
                          checked={value}
                          className="checkboxInput"
                          onChange={(e) => onChange(e.target.checked)}
                        />
                      )}
                      rules={{
                        required: true,
                      }}
                    />
                    <FormattedMessage
                      id={`profitsharing.${ack}`}
                      values={{ quote: provider.copyTradingQuote }}
                    />
                    <a
                      style={{
                        color: "currentcolor",
                        verticalAlign: "middle",
                        display: "inline",
                        marginLeft: "2px",
                      }}
                      title="More Info"
                      href={helpUrls[ack]}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Help style={{ fontSize: "22px" }} />
                    </a>
                  </label>
                </Box>
              ))}
            </Box>
            <Box alignItems="center" display="flex" flexDirection="column">
              <Typography>
                <FormattedMessage id="profitsharing.confirmtransfer" />
              </Typography>
              <OutlinedInput
                className="customInput transferInput"
                error={!!errors.transfer}
                inputRef={register({
                  validate: (val) => val.toLowerCase() === "transfer",
                })}
                name="transfer"
                placeholder={intl.formatMessage({
                  id: "trader.ack.placeholder",
                })}
              />
            </Box>
          </>
        )}
        <CustomButton
          className="full submitButton"
          disabled={balanceLoading || !isValid}
          loading={loading}
          type="submit"
        >
          {step === 1 && provider.disable ? (
            <FormattedMessage id="action.next" />
          ) : (
            <>
              <FormattedMessage id="trader.ack.placeholder" /> {allocatedBalance}{" "}
              {provider.copyTradingQuote}
            </>
          )}
        </CustomButton>
      </Box>
    </form>
  );
};

export default CopyPSForm;
