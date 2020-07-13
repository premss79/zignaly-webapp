import React, { useEffect } from "react";
import "./profile.scss";
import { Box } from "@material-ui/core";
import useStoreViewsSelector from "../../../hooks/useStoreViewsSelector";
import AboutUs from "../../../components/Provider/Profile/AboutUs";
import Strategy from "../../../components/Provider/Profile/Strategy";
import WhoWeAre from "../../../components/Provider/Profile/WhoWeAre";
import Performance from "../../../components/Provider/Profile/Performance";
import Disclaimer from "../../../components/Provider/Profile/Disclaimer";
import Options from "../../../components/Provider/Profile/Options";
import { useDispatch } from "react-redux";
import { showErrorAlert } from "../../../store/actions/ui";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import CloneProviderButton from "../../../components/Provider/ProviderHeader/CloneProviderButton";

const SignalProvidersProfile = () => {
  const storeViews = useStoreViewsSelector();
  const dispatch = useDispatch();
  const intl = useIntl();

  const checkPaymentStatus = () => {
    if (typeof window !== undefined) {
      let url = window.location.href;
      if (url.includes("error")) {
        let error = {
          code: "paymentnotcompleted",
        };
        history.pushState({}, "error", url.split("#")[0]);
        dispatch(showErrorAlert(error));
      }
      if (url.includes("success")) {
        let success = {
          code: "paymentnotcompleted",
        };
        history.pushState({}, "success", url.split("#")[0]);
        dispatch(showErrorAlert(success));
      }
    }
  };

  useEffect(checkPaymentStatus, []);

  return (
    <Box
      alignItems="flex-start"
      className="profilePage"
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="flex-start"
    >
      <Helmet>
        <title>
          {`${storeViews.provider.name} - ${intl.formatMessage({
            id: "srv.profile",
          })} | ${intl.formatMessage({ id: "product" })}`}
        </title>
      </Helmet>
      <Box bgcolor="grid.main" className="aboutBox">
        <AboutUs provider={storeViews.provider} />
      </Box>
      <Box bgcolor="grid.main" className="whoWeAreBox">
        <WhoWeAre provider={storeViews.provider} />
      </Box>
      <Box bgcolor="grid.main" className="strategyBox">
        <Strategy provider={storeViews.provider} />
      </Box>
      <Box bgcolor="grid.main" className="performanceBox">
        <Performance provider={storeViews.provider} />
      </Box>
      {!storeViews.provider.disable && (
        <Box bgcolor="grid.main" className="optionsBox">
          <Options provider={storeViews.provider} />
        </Box>
      )}
      {!storeViews.provider.disable &&
        !storeViews.provider.isClone &&
        storeViews.provider.allowClones && (
          <Box className="cloneBox">
            <CloneProviderButton provider={storeViews.provider} />
          </Box>
        )}
      <Disclaimer />
    </Box>
  );
};

export default SignalProvidersProfile;
