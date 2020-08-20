import { unsetUser, getUserExchanges, getUserData } from "./user";
import { unsetProvider } from "./views";
import { showErrorAlert } from "./ui";
import { assign } from "lodash";
import { navigate } from "gatsby";
import tradeApi from "../../services/tradeApiClient";
import gtmPushApi from "../../utils/gtmPushApi";

export const START_TRADE_API_SESSION = "START_TRADE_API_SESSION";
export const END_TRADE_API_SESSION = "END_TRADE_API_SESSION";
export const REFRESH_SESSION_DATA = "REFRESH_SESSION_DATA_ACTION";
export const CLEAR_SESSION_DATA = "CLEAR_SESSION_DATA_ACTION";
export const SET_APP_VERSION = "SET_APP_VERSION";

/**
 * @typedef {import("../../services/tradeApiClient.types").UserLoginPayload} UserLoginPayload
 * @typedef {import("../../services/tradeApiClient.types").UserRegisterPayload} UserRegisterPayload
 * @typedef {import("../../services/tradeApiClient.types").UserEntity} UserEntity
 * @typedef {import("../../services/tradeApiClient.types").TwoFAPayload} TwoFAPayload
 * @typedef {import('../../store/store').AppThunk} AppThunk
 * @typedef {import('redux').AnyAction} AnyAction
 */

/**
 * @param {UserEntity} response User login payload.
 * @returns {AppThunk} return action object.
 */
export const startTradeApiSession = (response) => {
  const { gtmEventPush } = gtmPushApi();
  const eventType = {
    event: "login",
  };

  return async (dispatch) => {
    if (!response.token) return;

    const action = {
      type: START_TRADE_API_SESSION,
      payload: response,
    };

    dispatch(action);
    // Add event type with user entity properties.
    // console.log(gtmEventPush, eventType, response);
    // console.log("test", assign(eventType, response || {}));
    // // @ts-ignore
    // console.log("win", window.dataLayer, window.dataLayer.push({ test: true }));
    // console.log(gtmEventPush(assign(eventType, response || {})));
    gtmEventPush(assign(eventType, response || {}));
    dispatch(refreshSessionData(response.token));

    // Navigate to return url or dashboard
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    const path = params.get("ret") || "/dashboard";
    const pathPrefix = process.env.GATSBY_BASE_PATH || "";
    const pathWithoutPrefix = path.replace(pathPrefix, "");
    navigate(pathWithoutPrefix);
  };
};

/**
 * @returns {AppThunk} Thunk Action.
 */
export const endTradeApiSession = () => {
  return async (dispatch) => {
    try {
      const action = {
        type: END_TRADE_API_SESSION,
      };

      dispatch(action);
      dispatch(unsetUser());
      dispatch(unsetProvider());
      dispatch(clearSessionData());
    } catch (e) {
      dispatch(showErrorAlert(e));
    }
  };
};

/**
 * Set user session.
 *
 * @param {UserRegisterPayload} payload User login payload.
 * @param {React.SetStateAction<*>} setLoading State Action to hide loader.
 * @returns {AppThunk} Thunk action function.
 */
export const registerUser = (payload, setLoading) => {
  const { gtmEventPush } = gtmPushApi();
  const eventType = {
    event: "signup",
  };

  return async (dispatch) => {
    try {
      const responseData = await tradeApi.userRegister(payload);
      // Add event type with user entity properties.
      gtmEventPush(assign(eventType, responseData || {}));
      dispatch(startTradeApiSession(responseData));
      setLoading(false);
    } catch (e) {
      dispatch(showErrorAlert(e));
      setLoading(false);
    }
  };
};

/**
 * Function to preload user data.
 *
 * @param {string} token api token.
 * @returns {AppThunk} Thunk action.
 */
export const loadAppUserData = (token) => {
  return async (dispatch) => {
    if (token) {
      const authorizationPayload = {
        token,
      };

      dispatch(getUserExchanges(authorizationPayload));
      dispatch(getUserData(authorizationPayload));
    }
  };
};

/**
 * @param {string} token Access token.
 * @returns {AppThunk} Thunk Action.
 */
export const refreshSessionData = (token) => {
  return async (dispatch) => {
    try {
      const payload = {
        token: token,
      };
      const responseData = await tradeApi.sessionDataGet(payload);
      const action = {
        type: REFRESH_SESSION_DATA,
        payload: responseData,
      };

      dispatch(action);
    } catch (e) {
      dispatch(showErrorAlert(e));
    }
  };
};

/**
 * Set currently used app version.
 *
 * Triggers at the moment when app was loaded so we can identify which app
 * version is loaded in browser memory and perform automatic refresh when new
 * release was launched.
 *
 * @param {string} version Semantic version number.
 * @returns {*} Set version action object.
 */
export const setAppVersion = (version) => {
  return {
    type: SET_APP_VERSION,
    payload: version,
  };
};

export const clearSessionData = () => {
  return {
    type: CLEAR_SESSION_DATA,
  };
};
