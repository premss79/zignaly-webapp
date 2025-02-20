import { useState, useEffect } from "react";
import tradeApi from "../services/tradeApiClient";
import { useDispatch } from "react-redux";
import { showErrorAlert } from "../store/actions/ui";
import { useStoreUserData } from "./useStoreUserSelector";
import useProviderUsers from "./useProviderUsers";

/**
 * @typedef {import('services/tradeApiClient.types').DefaultProviderGetObject} Provider
 * @typedef {import('services/tradeApiClient.types').ProviderEntity} ProviderEntity
 */

const paginationOptions = {
  page: 1,
  maxPerPage: 10,
};

/**
 * @typedef {Object} ReturnData
 * @property {boolean} loading True if check is loading.
 * @property {boolean} canDisconnect True if the user can disconnect.
 */

/**
 * Check if the admin of a profit sharing service can disconnect from his own service. (No followers or open positions)
 *
 * @param {Provider|ProviderEntity} provider Provider object to check.
 * @returns {ReturnData} Result.
 */
const useCheckPSCanDisconnect = (provider) => {
  const [canDisconnect, setCanDisconnect] = useState(null);
  const dispatch = useDispatch();
  const userData = useStoreUserData();
  const { list } = useProviderUsers(provider, paginationOptions);
  const providerFollowers = list.filter((user) => user.userId !== userData.userId);

  const loadPositions = () => {
    if (!provider) return;

    if (!provider.disable && provider.profitSharing && provider.isAdmin) {
      if (!providerFollowers.length) {
        tradeApi
          .providerOpenPositions(provider.id)
          .then((response) => {
            setCanDisconnect(response.length === 0);
          })
          .catch((e) => {
            dispatch(showErrorAlert(e));
          });
      } else {
        setCanDisconnect(false);
      }
    } else {
      setCanDisconnect(true);
    }
  };

  useEffect(loadPositions, [provider]);

  return { loading: canDisconnect === null, canDisconnect };
};

export default useCheckPSCanDisconnect;
