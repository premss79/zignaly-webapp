import React, { useCallback, useContext, useEffect, useState } from "react";
import WalletIcon from "images/wallet/wallet.svg";
import ZigCoinIcon from "images/wallet/zignaly-coin.svg";
import InfoIcon from "images/wallet/info.svg";
import RewardsIcon from "images/wallet/rewards.inline.svg";
import { FormattedMessage } from "react-intl";
import { isMobile, Panel, SubTitle, Title } from "styles/styles";
import styled, { css } from "styled-components";
import {
  Button as MuiButton,
  Box,
  ClickAwayListener,
  Tooltip,
  Typography,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import tradeApi from "services/tradeApiClient";
import CustomButton from "components/CustomButton";
import Modal from "components/Modal";
import WalletDepositView from "./WalletDepositView";
import PrivateAreaContext from "context/PrivateAreaContext";
import { ChevronRight } from "@material-ui/icons";
import WalletTransactions from "./WalletTransactions";
import BalanceChain from "./BalanceChain";
import NumberFormat from "react-number-format";
import { useStoreUserData } from "hooks/useStoreUserSelector";
import { ascendexUrl, gateioUrl, mexcUrl } from "utils/affiliateURLs";
import { colors } from "services/theme";
import { useDispatch } from "react-redux";
import { getUserData } from "store/actions/user";
import WalletWithdrawView from "./WalletWithdrawView";
import WalletCoins from "./WalletCoins";
import { Rate } from "./styles";
import CoinIcon from "./CoinIcon";
import VaultOfferModal from "./Vault/VaultOfferModal";
import ProjectDetailsModal from "./Zigpad/ProjectDetailsModal";

const CategIconStyled = styled.img`
  margin: 31px 14px 0 0;

  ${isMobile(`
    display: none;
  `)}
`;

const RewardIconStyled = styled(CategIconStyled).attrs(() => ({
  as: RewardsIcon,
}))`
  margin: 39px 14px 0 0;
  width: 48px;
  height: 48px;
`;

const StyledPanel = styled(Panel)`
  display: flex;
  justify-content: space-around;
  padding: 40px 0;

  ${isMobile(`
    flex-direction: column;
    padding: 40px 28px;
  `)}
`;

const ZigBig = styled.span`
  color: ${(props) => props.theme.newTheme.purple};
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 16px;
  margin-left: 6px;
`;

const SecondaryText = styled(Typography)`
  color: ${(props) => props.theme.newTheme.secondaryText};
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 1px;
  white-space: nowrap;
`;

const NeutralText = styled(Typography)`
  color: ${({ theme }) => theme.newTheme.neutralText};
  font-size: 12px;
  margin-left: 10px;
  font-weight: 500;
  white-space: nowrap;
`;

const Button = styled(CustomButton)`
  margin-right: 8px;
  min-width: 121px;
`;

const TextMain = styled(Typography)`
  /* color: #9ca3af; */
  font-size: 32px;
  font-weight: 500;
  letter-spacing: 0.66px;
`;

const TextSaving = styled(Typography)`
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  margin: 6px 0 10px;
`;

const Divider = styled.span`
  background: ${({ theme }) => (theme.palette.type === "dark" ? "#222249" : "#ACB6FF")};
  width: 1px;
  height: 128px;
  align-self: center;
  margin: 0 20px;

  ${isMobile(`
    display: none;
  `)};
`;

const VaultDivider = styled.span`
  background: ${({ theme }) => (theme.palette.type === "dark" ? "#222249" : "#CCCAEF")};
  height: 1px;
  width: calc(100% - 31px);
  align-self: flex-end;
  margin: 8px 0 9px;

  ${isMobile(`
    display: none;
  `)}
`;

const VaultButton = styled(MuiButton)`
  color: ${({ theme }) => theme.newTheme.linkText};
  font-size: 12px;
  font-weight: 600;
  text-transform: none;
  align-self: flex-end;
  margin-top: 4px;
`;

const ChevronRightStyled = styled(ChevronRight)`
  color: #65647e;
  cursor: pointer;
`;

interface PanelItemProps {
  row?: boolean;
}
const PanelItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${(props: PanelItemProps) => (props.row ? "row" : "column")};
  /* flex-basis: 24%; */
  max-width: 400px;
  margin: 0 20px;
  flex: 1;

  ${(props) =>
    props.row &&
    css`
      justify-content: center;
    `}

  ${isMobile(css`
    margin: 0;
    justify-content: stretch;
    &:not(:first-child) {
      margin-top: 48px;
    }
  `)}
`;

const PanelItemMiddle = styled(PanelItem)`
  align-items: center;
  ${isMobile(css`
    align-items: flex-start;
  `)}
`;

const ButtonBuy = styled(MuiButton)`
  display: flex;
  padding: 4px 12px 4px 16px;
  /* box-shadow: 0px 4px 8px -4px rgba(90, 81, 245, 0.25); */
  border-radius: 4px;
  border: 1px solid;
  font-size: 13px;
  border-image: linear-gradient(
    312.12deg,
    rgba(134, 113, 247, 0.33) 14.16%,
    rgba(126, 201, 249, 0.33) 83.59%
  );
  border-image-slice: 1;
  text-transform: none;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
`;

const TooltipContainer = styled.div`
  font-weight: 600;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 16px;

  a {
    text-decoration: none;
    color: ${colors.purpleLight};
  }
`;

const TypographyTooltip = styled.span`
  /* color: #0c0d21; */
  margin-bottom: 3px;
`;

const RateText = styled.span`
  margin-top: 2px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.newTheme.secondaryText};
  font-weight: 600;
  font-size: 16px;
`;

const FeeSavingText = styled(Typography)`
  font-size: 14px;
  color: ${({ theme }) => theme.newTheme.green};
  font-weight: 500;
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin-left: 4px;
`;

const ValueBig = styled.span`
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  margin-left: 3px;
  position: relative;
`;

const SwitchLabel = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.33px;
  display: flex;
  align-items: center;
  margin-left: 11px;

  ${(props) =>
    props.enabled &&
    css`
      color: ${props.theme.newTheme.green};
    `}
`;

const StyledSwitch = styled(Switch)`
  margin-left: 8px;
  ${isMobile(css`
    margin-left: 0;
  `)}

  .MuiSwitch-switchBase.Mui-checked {
    color: ${({ theme }) => theme.newTheme.green};
  }

  .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
    background-color: ${({ theme }) => theme.newTheme.green};
  }
`;

const HeightFiller = styled.div`
  height: 37px;
  padding-top: 6px;
`;

const StyledInfoIcon = styled.img`
  position: absolute;
  top: 2px;
  right: -12px;
`;

const VaultListItem = styled(Box)`
  justify-content: space-between;
  cursor: pointer;
`;

const SubTitleSmall = styled(SubTitle)`
  margin-bottom: 10px;
`;

const LaunchpadBox = styled(Box)`
  ${isMobile(css`
    margin-bottom: 0;
  `)}
`;

const WalletView = ({ isOpen }: { isOpen: boolean }) => {
  const { walletBalance, setWalletBalance } = useContext(PrivateAreaContext);
  const [path, setPath] = useState("");
  const pathParams = path.split("/");
  const page = pathParams[0];
  const coinParam = pathParams[1];
  const [coins, setCoins] = useState<WalletCoins>(null);
  const [vaultOffers, setVaultOffers] = useState<VaultOffer[]>(null);
  const [launchpadProjects, setLaunchpadProjects] = useState<LaunchpadProject[]>(null);
  const balanceZIG = walletBalance?.ZIG?.total.balance || 0;
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const userData = useStoreUserData();
  const [payFeeWithZig, setPayFeeWithZig] = useState(userData.payFeeWithZig);
  const [tradingFeeDiscount, setTradingFeeDiscount] = useState(userData.tradingFeeDiscount);
  const dispatch = useDispatch();
  const rateZIG = coins?.ZIG.usdPrice;
  const [selectedVaultOffer, setSelectedVaultOffer] = useState<VaultOffer>(null);
  const [selectedProject, setSelectedProject] = useState<LaunchpadProject>(null);
  const [totalSavings, setTotalSavings] = useState(null);

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  useEffect(() => {
    // Reload user data
    setTradingFeeDiscount(userData.tradingFeeDiscount);
    setPayFeeWithZig(userData.payFeeWithZig);
  }, [userData.payFeeWithZig, userData.tradingFeeDiscount]);

  useEffect(() => {
    if (isOpen) {
      dispatch(getUserData());

      tradeApi.getWalletCoins().then((response) => {
        setCoins(response);
      });

      tradeApi.getWalletBalance().then((response) => {
        setWalletBalance(response);
      });

      tradeApi.getVaultOffers({ status: "active" }).then((response) => {
        setVaultOffers(response);
      });

      tradeApi.getLaunchpadProjects({ status: "active" }).then((response) => {
        setLaunchpadProjects(response);
      });

      tradeApi.getTotalSavings().then((response) => {
        setTotalSavings(response.total);
      });
    }
  }, [isOpen]);

  const onPayFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.checked;
    setPayFeeWithZig(val);
    tradeApi.updateUser({ payFeeWithZig: val }).catch(() => {
      setPayFeeWithZig(!val);
    });
  };

  const onTradingFeeDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.checked;
    setTradingFeeDiscount(val);
    tradeApi.updateUser({ tradingFeeDiscount: val }).catch(() => {
      setTradingFeeDiscount(!val);
    });
  };

  const BuyZig = useCallback(
    () => (
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          interactive
          placement="right"
          onClose={handleTooltipClose}
          open={tooltipOpen}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          PopperProps={{
            disablePortal: true,
          }}
          title={
            <TooltipContainer>
              <TypographyTooltip>
                <FormattedMessage id="wallet.buy.tooltip" />
              </TypographyTooltip>
              <a href={ascendexUrl} rel="noreferrer" target="_blank">
                AscendEX &gt;
              </a>
              <a href={mexcUrl} rel="noreferrer" target="_blank">
                MEXC &gt;
              </a>
              <a href={gateioUrl} rel="noreferrer" target="_blank">
                Gate.io &gt;
              </a>
            </TooltipContainer>
          }
        >
          <ButtonBuy onClick={handleTooltipOpen}>
            <FormattedMessage id="wallet.buy" />
            <ChevronRightStyled />
          </ButtonBuy>
        </Tooltip>
      </ClickAwayListener>
    ),
    [tooltipOpen],
  );

  return (
    <>
      {page === "deposit" && (
        <Modal
          onClose={() => setPath("")}
          newTheme={true}
          persist={false}
          size="medium"
          state={true}
        >
          <WalletDepositView coins={coins} onClose={() => setPath("")} coin={coinParam} />
        </Modal>
      )}
      {page === "withdraw" && (
        <Modal
          onClose={() => setPath("")}
          newTheme={true}
          persist={false}
          size="medium"
          state={true}
        >
          <WalletWithdrawView
            setPath={setPath}
            coins={coins}
            balance={walletBalance ? walletBalance[coinParam] || {} : null}
            onClose={() => setPath("")}
            coin={coinParam}
          />
        </Modal>
      )}
      {selectedVaultOffer && (
        <VaultOfferModal
          onClose={() => setSelectedVaultOffer(null)}
          open={true}
          vault={selectedVaultOffer}
        />
      )}
      {selectedProject && (
        <ProjectDetailsModal
          onClose={() => setSelectedProject(null)}
          open={true}
          projectId={selectedProject.id}
        />
      )}
      <Title>
        <img src={WalletIcon} width={40} height={40} />
        <FormattedMessage id="wallet.zig" />
      </Title>
      <StyledPanel>
        <PanelItem row>
          <CategIconStyled height={66} src={ZigCoinIcon} width={66} />
          <Box display="flex" flexDirection="column">
            <SubTitle>
              <FormattedMessage id="wallet.totalbalance" />
            </SubTitle>
            <TextMain data-test-id="total-balance">
              <NumberFormat value={balanceZIG} thousandSeparator={true} displayType="text" />
              <ZigBig>ZIG</ZigBig>
            </TextMain>
            <RateText data-test-id="total-balance-usd">
              <NumberFormat
                value={balanceZIG * rateZIG}
                displayType="text"
                thousandSeparator={true}
                prefix="$"
                decimalScale={2}
              />
              <Rate>@{rateZIG}/ZIG</Rate>
              {/* <ArrowIcon width={32} height={32} src={WalletIcon} /> */}
            </RateText>
            <HeightFiller>
              <BalanceChain coins={coins} walletBalance={walletBalance} />
              {walletBalance && !walletBalance.ZIG && <BuyZig />}
            </HeightFiller>
            <Box display="flex" flexDirection="row" mt="12px">
              <Button className="textPurple borderPurple" onClick={() => setPath("withdraw/ZIG")}>
                <FormattedMessage id="accounts.withdraw" />
              </Button>
              <Button className="bgPurple" onClick={() => setPath("deposit/ZIG")}>
                <FormattedMessage id="accounts.deposit" />
              </Button>
            </Box>
          </Box>
        </PanelItem>
        <Divider />
        <PanelItemMiddle>
          <Box display="flex">
            <RewardIconStyled />
            <Box display="flex" flexDirection="column">
              <SubTitle>
                <FormattedMessage id="wallet.rewards" />
              </SubTitle>
              <TextMain>
                {totalSavings !== null ? (
                  <NumberFormat value={totalSavings} thousandSeparator={true} displayType="text" />
                ) : (
                  "-"
                )}
                <ZigBig>ZIG</ZigBig>
              </TextMain>
              <TextSaving>
                <FormattedMessage id="wallet.saving.title" />
              </TextSaving>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" mt="2px">
            <FormControlLabel
              control={<StyledSwitch checked={payFeeWithZig} onChange={onPayFeeChange} />}
              label={
                <SwitchLabel enabled={payFeeWithZig}>
                  <SecondaryText noWrap>
                    <FormattedMessage id="wallet.fees.discount" />
                  </SecondaryText>
                  <FeeSavingText>
                    <FormattedMessage id="wallet.fees.min" />
                    <ValueBig>
                      6%
                      <Tooltip title={<FormattedMessage id="wallet.fees.tooltip" />}>
                        <StyledInfoIcon src={InfoIcon} width={12} height={12} />
                      </Tooltip>
                    </ValueBig>
                  </FeeSavingText>
                </SwitchLabel>
              }
            />
            <FormControlLabel
              control={
                <StyledSwitch checked={tradingFeeDiscount} onChange={onTradingFeeDiscountChange} />
              }
              label={
                <SwitchLabel enabled={tradingFeeDiscount}>
                  <SecondaryText noWrap>
                    <FormattedMessage id="wallet.fees.volume" />
                  </SecondaryText>
                  <FeeSavingText>
                    <FormattedMessage id="wallet.fees.min" />
                    <ValueBig>
                      15%
                      <Tooltip title={<FormattedMessage id="wallet.fees.cashback.tooltip" />}>
                        <StyledInfoIcon src={InfoIcon} width={12} height={12} />
                      </Tooltip>
                    </ValueBig>
                  </FeeSavingText>
                </SwitchLabel>
              }
            />
          </Box>
        </PanelItemMiddle>
        <Divider />
        <PanelItem>
          <SubTitleSmall>
            <FormattedMessage id="wallet.staking" />
          </SubTitleSmall>
          {vaultOffers && (
            <Box mt={1} display="flex" flexDirection="column">
              {vaultOffers.slice(0, 2).map((v) => (
                <Box display="flex" key={v.id} flexDirection="column">
                  <VaultListItem
                    display="flex"
                    alignItems="center"
                    onClick={() => setSelectedVaultOffer(v)}
                  >
                    <Box display="flex" alignItems="center">
                      <CoinIcon coin={v.coinReward} width={20} height={20} />
                      <NeutralText>
                        <FormattedMessage
                          id="wallet.staking.earn"
                          values={{ coin: v.coin, reward: v.coinReward, amount: v.minBalance }}
                        />
                      </NeutralText>
                    </Box>
                    <ChevronRightStyled />
                  </VaultListItem>
                  <VaultDivider />
                </Box>
              ))}
              <VaultButton endIcon={<ChevronRight />} href="#vault">
                <FormattedMessage
                  id="wallet.vaults.offers"
                  values={{ count: vaultOffers.length }}
                />
              </VaultButton>
            </Box>
          )}
          <SubTitleSmall style={{ textTransform: "uppercase" }}>
            <FormattedMessage id="zigpad.title" />
          </SubTitleSmall>
          {launchpadProjects && (
            <LaunchpadBox mt={1} mb="-22px" display="flex" flexDirection="column">
              {launchpadProjects.slice(0, 1).map((p) => (
                <Box display="flex" key={p.coin} flexDirection="column">
                  <VaultListItem
                    display="flex"
                    alignItems="center"
                    onClick={() => setSelectedProject(p)}
                  >
                    <Box display="flex" alignItems="center">
                      <img src={p.logo} height={20} width={20} />
                      <NeutralText>{p.name}</NeutralText>
                    </Box>
                    <ChevronRightStyled />
                  </VaultListItem>
                  <VaultDivider />
                </Box>
              ))}
              <VaultButton endIcon={<ChevronRight />} href="#zigpad">
                <FormattedMessage
                  id="zigpad.projects"
                  values={{ count: launchpadProjects.length }}
                />
              </VaultButton>
            </LaunchpadBox>
          )}
        </PanelItem>
      </StyledPanel>
      <Box mt="40px">
        <WalletCoins
          offers={vaultOffers}
          coins={coins}
          walletBalance={walletBalance}
          setPath={setPath}
          setSelectedVaultOffer={setSelectedVaultOffer}
        />
      </Box>
      <WalletTransactions />
    </>
  );
};

export default WalletView;
