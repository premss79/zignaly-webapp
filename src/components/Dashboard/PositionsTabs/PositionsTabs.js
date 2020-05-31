import React, { useState } from "react";
import "./PositionsTabs.scss";
import { Box, Popover } from "@material-ui/core";
import SettingsIcon from "../../../images/dashboard/settings.svg";
import FiltersUnchecked from "../../../images/dashboard/filtersHollow.svg";
import FilstersChecked from "../../../images/dashboard/filtersFill.svg";
import PositionSettingsForm from "../../Forms/PositionSettingsForm";
import PositionsTable from "../PositionsTable";
import PositionFilters from "../PositionFilters";
// import NoPositions from "../NoPositions";
import TabsMenu from "./TabsMenu";
import usePositionsList from "../../../hooks/usePositionsList";

/**
 * @typedef {import("../../../hooks/usePositionsList").PositionsCollectionType} PositionsCollectionType
 */

const PositionsTabs = () => {
  const [tabValue, setTabValue] = useState(0);
  const [settingsAnchor, setSettingAnchor] = useState(undefined);
  const [filters, showFilters] = useState(false);

  /**
   * Map tab index to positions collection type.
   *
   * @returns {PositionsCollectionType} Collection type.
   */
  const mapIndexToCollectionType = () => {
    switch (tabValue) {
      case 1:
        return "closed";

      case 2:
        return "log";

      default:
        return "open";
    }
  };

  /**
   * Event handler to change tab value.
   *
   * @param {React.ChangeEvent<{checked: boolean}>} event Tab index to set active.
   * @param {Number} val Tab index to set active.
   * @returns {void}
   */
  const changeTab = (event, val) => {
    setTabValue(val);
  };

  const handleFiltersChange = () => {};

  const handleClose = () => setSettingAnchor(undefined);

  const selectedType = mapIndexToCollectionType();
  const positions = usePositionsList(selectedType);

  return (
    <Box bgcolor="grid.content" className="positionsTabs">
      <Box
        alignItems="center"
        className="tabsBox"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <TabsMenu changeTab={changeTab} tabValue={tabValue} />
        <Box
          alignItems="center"
          className="settings"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <img
            alt="zignaly"
            className="icon"
            onClick={() => showFilters(!filters)}
            src={filters ? FilstersChecked : FiltersUnchecked}
          />
          <img
            alt="zignaly"
            className="icon"
            onClick={(e) => setSettingAnchor(e.currentTarget)}
            src={SettingsIcon}
          />
        </Box>
      </Box>
      {filters && (
        <PositionFilters onChange={handleFiltersChange} onClose={() => showFilters(false)} />
      )}
      {tabValue === 0 && (
        <Box className="tabPanel">
          <PositionsTable positions={positions} type={selectedType} />
          {/* <NoPositions /> */}
        </Box>
      )}
      {tabValue === 1 && (
        <Box className="tabPanel">
          <PositionsTable positions={positions} type={selectedType} />
        </Box>
      )}
      {tabValue === 2 && (
        <Box className="tabPanel">
          <PositionsTable positions={positions} type={selectedType} />
        </Box>
      )}
      <Popover
        anchorEl={settingsAnchor}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={() => setSettingAnchor(undefined)}
        open={Boolean(settingsAnchor)}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <PositionSettingsForm onClose={handleClose} />
      </Popover>
    </Box>
  );
};

export default PositionsTabs;
