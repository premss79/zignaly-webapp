import React, { useState } from "react";
import "./copyTradersLayout.scss";
import { getDisplayName } from "../../utils";
import { Box, Typography } from "@material-ui/core";
import FAQ from "../../components/FAQ";
import ProvidersHeader from "../../components/Providers/ProvidersHeader";

const withDashboardLayout = Component => {
  const WrapperComponent = props => {
    const [showFilters, setShowFilters] = useState(false);
    const [showSort, setShowSort] = useState(false);

    const toggleFilters = () => {
      setShowFilters(!showFilters);
    };

    const toggleSort = () => {
      setShowSort(!showSort);
    };

    return (
      <Box
        alignItems="flex-start"
        className="copyTradersLayout"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <Box className="titleBox" display="flex" flexDirection="column">
          <Typography variant="h1">Copy Traders</Typography>
          <h4 className="subHeader">
            Copy experienced traders who trade with the currencies you own.
          </h4>
        </Box>

        <ProvidersHeader
          showFilters={showFilters}
          showSort={showSort}
          toggleFilters={toggleFilters}
          toggleSort={toggleSort}
        />
        <Box className="pageContent">
          <Component
            {...props}
            showFilters={showFilters}
            showSort={showSort}
            toggleFilters={toggleFilters}
            toggleSort={toggleSort}
          />
        </Box>
        <Box className="faq">
          <FAQ />
        </Box>
      </Box>
    );
  };
  WrapperComponent.displayName = `Layout(${getDisplayName(Component)})`;
  return WrapperComponent;
};

export default withDashboardLayout;
