import React, { useContext, useEffect, useState } from "react";
import WalletIcon from "images/wallet/wallet.svg";
import ZigCoinIcon from "images/wallet/zignaly-coin.svg";
import { FormattedMessage } from "react-intl";
import { Panel, SubTitle, Title } from "styles/styles";
import styled, { css } from "styled-components";
import { Box, Popover, Typography } from "@material-ui/core";
import tradeApi from "services/tradeApiClient";
import CustomButton from "components/CustomButton";
import Modal from "components/Modal";
import WalletDepositView from "./WalletDepositView";
import PrivateAreaContext from "context/PrivateAreaContext";
import { ChevronRight } from "@material-ui/icons";
import WalletPopover from "./WalletPopover";

const TitleIcon = styled.img`
  /* background: linear-gradient(
    121.21deg,
    #a600fb 10.7%,
    #6f06fc 31.3%,
    #4959f5 60.13%,
    #2e8ddf 76.19%,
    #12c1c9 89.78%
  ); */
`;

const CategIconStyled = styled.img`
  /* height: 30px; */
  margin: 31px 14px 0 0;
`;

const ArrowIcon = styled.img`
  background: green;
  height: 30px;
  margin-right: 14px;
`;

const Rate = styled.span`
  color: #65647e;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.66px;
  line-height: 14px;
  margin: 0 8px;
  text-transform: uppercase;
`;

const Amount = styled.span`
  /* color: #f3f4f6; */
  font-size: 32px;
  font-weight: 500;
  letter-spacing: 0.66px;
  line-height: 40px;
`;

const ZigBig = styled.span`
  /* color: #9864ef; */
  color: ${(props) => props.theme.palette.text.secondary};
  font-size: 18px;
  letter-spacing: 1px;
  line-height: 16px;
  margin-left: 6px;
`;

const Zig = styled.span`
  /* color: #9864ef; */
  color: ${(props) => props.theme.palette.text.secondary};
  font-size: 12px;
  letter-spacing: 1px;
  line-height: 16px;
  margin-left: 4px;
`;

const Button = styled(CustomButton)`
  margin-right: 8px;
  min-width: 121px;
`;

const TextMain = styled.span`
  color: #9ca3af;
  font-size: 32px;
  font-weight: 500;
  /* line-height: 40px; */
  letter-spacing: 0.66px;
`;

const TextCaption = styled.span`
  color: #f3f4f6;
  font-size: 16px;
  /* line-height: 20px; */
  letter-spacing: 0.33px;
  margin-top: 20px;
`;

const Divider = styled.span`
  background: #222249;
  margin: 0 34px;
  width: 1px;
  height: 128px;
  align-self: center;
`;

const ChevronRightStyled = styled(ChevronRight)`
  color: #65647e;
  cursor: pointer;
`;

interface PanelItemProps {
  row?: boolean;
}
const PanelItem = styled.div`
  display: flex;
  flex: 1;
  flex-direction: ${(props: PanelItemProps) => (props.row ? "row" : "column")};
  margin: 0 3%;
  max-width: 300px;
  ${(props) =>
    props.row &&
    css`
      justify-content: center;
    `}
`;

// const PanelStyled = styled(Panel)`
//   margin-bottom: 20px;
// `;

const WalletView = () => {
  const { walletBalance } = useContext(PrivateAreaContext);
  const [path, setPath] = useState("");
  // const [balances, setBalances] = useState<WalletBalance>(null);
  const [coins, setCoins] = useState<WalletCoins>(null);
  const zigBalance = walletBalance?.ZIG?.total || 0;
  // const rate = 0.01;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // tradeApi.getWalletBalance().then((response) => {
    //   setBalances(response);
    // });

    tradeApi.getWalletCoins().then((response) => {
      setCoins(response);
    });
  }, []);

  return (
    <Box p={5}>
      <Modal
        // onClose={() => dispatch(showCreateTrader(false))}
        onClose={() => setPath("")}
        persist={false}
        size="large"
        state={path === "deposit"}
      >
        <WalletDepositView />
      </Modal>
      <Title>
        <Box display="flex" alignItems="center">
          <TitleIcon width="33px" height="30px" src={WalletIcon} />
          <FormattedMessage id="wallet.zig" />
        </Box>
      </Title>
      <Box display="flex" mt="20px" py="40px" px="7%">
        <PanelItem row>
          <CategIconStyled width={66} height={66} src={ZigCoinIcon} />
          <Box display="flex" flexDirection="column">
            <SubTitle>
              <FormattedMessage id="wallet.totalbalance" />
            </SubTitle>
            <Amount>
              {zigBalance}
              <ZigBig>ZIG</ZigBig>
            </Amount>
            {/* <div>
              ${zigBalance * rate}
              <Rate>@{rate}/ZIG</Rate>
              <ArrowIcon width={32} height={32} src={WalletIcon} />
            </div> */}
            <Box display="flex" flexDirection="row" alignItems="center" mt={1.5} mb={2.25}>
              ETH: {walletBalance?.ZIG?.ETH || 0}
              <Zig>ZIG</Zig> <ChevronRightStyled onClick={handleClick} />
              {walletBalance && coins && (
                <WalletPopover
                  anchorEl={anchorEl}
                  handleClose={handleClose}
                  balance={walletBalance.ZIG}
                  coin={coins.ZIG}
                />
              )}
            </Box>
            <Box display="flex" flexDirection="row">
              <Button className="textPurple borderPurple" href="#exchangeAccounts">
                <FormattedMessage id="accounts.withdraw" />
              </Button>
              {/* <Button className="bgPurple" href="#deposit"> */}
              <Button className="bgPurple" onClick={() => setPath("deposit")}>
                <FormattedMessage id="accounts.deposit" />
              </Button>
            </Box>
          </Box>
        </PanelItem>
        <Divider />
        <PanelItem>
          <SubTitle>
            <FormattedMessage id="wallet.rewards" />
          </SubTitle>
          <TextMain>
            <FormattedMessage id="wallet.rewards.soon" />
          </TextMain>
          <TextCaption>
            <FormattedMessage id="wallet.rewards.soon.desc" />
          </TextCaption>
        </PanelItem>
        <Divider />
        <PanelItem>
          <SubTitle>
            <FormattedMessage id="wallet.staking" />
          </SubTitle>
          <TextMain>
            <FormattedMessage id="wallet.staking.soon" />
          </TextMain>
          <TextCaption>
            <FormattedMessage id="wallet.staking.soon.desc" />
          </TextCaption>
        </PanelItem>
      </Box>
      <Title>
        <Box display="flex" alignItems="center">
          <TitleIcon width="33px" height="30px" src={WalletIcon} />
          <FormattedMessage id="wallet.transactions" />
        </Box>
      </Title>
    </Box>
  );
};

export default WalletView;
