import fetch from "cross-fetch";
import { navigateLogin } from "./navigation";
import {
  userEntityResponseTransform,
  userPositionsResponseTransform,
  providersResponseTransform,
  providersStatsResponseTransform,
  userExchangeConnectionResponseTransform,
  userBalanceResponseTransform,
  userPositionItemTransform,
  userEquityResponseTransform,
  quotesResponseTransform,
  basesResponseTransform,
  connectedProviderUserInfoResponseTransform,
  providerGetResponseTransform,
  serverTimeResponseTransform,
  coinRayTokenResponseTransform,
  exchangeMarketDataResponseTransform,
  exchangeListResponseTransform,
  ownCopyTraderProvidersOptionsResponseTransform,
  providerCopiersResponseTransform,
  providerFollowersListResponseTransform,
  exchangeAssetsResponseTransform,
  exchangeDepositAddressResponseTransform,
  providerPerformanceResponseTransform,
  exchangeDepositsResponseTransform,
  withdrawResponseTransform,
  exchangeWithdrawsResponseTransform,
  providerExchangeSettingsResponseTransform,
  providerDataPointsResponseTransform,
  convertAssetResponseTransform,
  managementPositionsResponseTransform,
  profileNotificationsResponseTransform,
  providerCreateResponseTransform,
  userExchangeAssetsResponseTransform,
  sessionDataResponseTransform,
  exchangeOpenOrdersResponseTransform,
  exchangeContractsResponseTransform,
  userAvailableBalanceResponseTransform,
  cloneProviderResponseTransform,
} from "./tradeApiClient.types";

/**
 * @typedef {import('./tradeApiClient.types').AuthorizationPayload} AuthorizationPayload
 * @typedef {import('./tradeApiClient.types').UserEquityPayload} UserEquityPayload
 * @typedef {import('./tradeApiClient.types').PositionActionPayload} PositionActionPayload
 * @typedef {import('./tradeApiClient.types').PositionEntity} PositionEntity
 * @typedef {import('./tradeApiClient.types').PositionsListPayload} PositionsListPayload
 * @typedef {import('./tradeApiClient.types').ProvidersCollection} ProvidersCollection
 * @typedef {import('./tradeApiClient.types').ProvidersPayload} ProvidersPayload
 * @typedef {import('./tradeApiClient.types').ProvidersStatsCollection} ProvidersStatsCollection
 * @typedef {import('./tradeApiClient.types').ProvidersStatsPayload} ProvidersStatsPayload
 * @typedef {import('./tradeApiClient.types').UserLoginPayload} UserLoginPayload
 * @typedef {import('./tradeApiClient.types').UserRegisterPayload} UserRegisterPayload
 * @typedef {import('./tradeApiClient.types').UserEntity} UserEntity
 * @typedef {import('./tradeApiClient.types').UserPositionsCollection} UserPositionsCollection
 * @typedef {import('./tradeApiClient.types').GetProviderPayload} GetProviderPayload
 * @typedef {import('./tradeApiClient.types').GetProviderFollowersPayload} GetProviderFollowersPayload
 * @typedef {import('./tradeApiClient.types').ConnectTraderPayload} ConnectTraderPayload
 * @typedef {import('./tradeApiClient.types').ConnectProviderPayload} ConnectProviderPayload
 * @typedef {import('./tradeApiClient.types').DisableProviderPayload} DisableProviderPayload
 * @typedef {import('./tradeApiClient.types').DeleteProviderPayload} DeleteProviderPayload
 * @typedef {import('./tradeApiClient.types').EditProvderPayload} EditProvderPayload
 * @typedef {import('./tradeApiClient.types').BaseAssetsPayload} BaseAssetsPayload
 * @typedef {import('./tradeApiClient.types').ExchangeAssetsPayload} ExchangeAssetsPayload
 * @typedef {import('./tradeApiClient.types').ConnectedProviderUserInfoPayload} ConnectedProviderUserInfoPayload
 * @typedef {import('./tradeApiClient.types').ConnectedProviderUserInfo} ConnectedProviderUserInfo
 * @typedef {import('./tradeApiClient.types').CoinRayToken} CoinRayToken
 * @typedef {import('./tradeApiClient.types').MarketSymbolsCollection} MarketSymbolsCollection
 * @typedef {import('./tradeApiClient.types').CopyTradersProvidersOptionsPayload} CopyTradersProvidersOptionsPayload
 * @typedef {import('./tradeApiClient.types').CopyTradersProvidersOptionsCollection} CopyTradersProvidersOptionsCollection
 * @typedef {import('./tradeApiClient.types').ExchangeAddPayload} ExchangeAddPayload
 * @typedef {import('./tradeApiClient.types').ExchangeDeletePayload} ExchangeDeletePayload
 * @typedef {import('./tradeApiClient.types').ExchangeUpdatePayload} ExchangeUpdatePayload
 * @typedef {import('./tradeApiClient.types').ProviderExchangeSettingsPayload} ProviderExchangeSettingsPayload
 * @typedef {import('./tradeApiClient.types').ProviderExchangeSettingsUpdatePayload} ProviderExchangeSettingsUpdatePayload
 * @typedef {import('./tradeApiClient.types').DepositAddressGetPayload} DepositAddressGetPayload
 * @typedef {import('./tradeApiClient.types').ExchangeAssetsDict} ExchangeAssetsDict
 * @typedef {import('./tradeApiClient.types').CreatePositionPayload} CreatePositionPayload
 * @typedef {import('./tradeApiClient.types').UpdatePositionPayload} UpdatePositionPayload
 * @typedef {import('./tradeApiClient.types').ExchangeDepositEntity} ExchangeDepositEntity
 * @typedef {import('./tradeApiClient.types').ExchangeWithdrawEntity} ExchangeWithdrawEntity
 * @typedef {import('./tradeApiClient.types').GetExchangeLastDepositsPayload} GetExchangeLastDepositsPayload
 * @typedef {import('./tradeApiClient.types').WithdrawPayload} WithdrawPayload
 * @typedef {import('./tradeApiClient.types').ConvertPayload} ConvertPayload
 * @typedef {import('./tradeApiClient.types').WithdrawReply} WithdrawReply
 * @typedef {import('./tradeApiClient.types').ModifySubscriptionPayload} ModifySubscriptionPayload
 * @typedef {import('./tradeApiClient.types').CancelSubscriptionPayload} CancelSubscriptionPayload
 * @typedef {import('./tradeApiClient.types').UpdatePasswordPayload} UpdatePasswordPayload
 * @typedef {import('./tradeApiClient.types').TwoFAPayload} TwoFAPayload
 * @typedef {import('./tradeApiClient.types').ConvertReply} ConvertReply
 * @typedef {import('./tradeApiClient.types').ProfileNotifications} ProfileNotifications
 * @typedef {import('./tradeApiClient.types').ProfileNotificationsPayload} ProfileNotificationsPayload
 * @typedef {import('./tradeApiClient.types').ForgotPasswordStep1Payload} ForgotPasswordStep1Payload
 * @typedef {import('./tradeApiClient.types').ForgotPasswordStep3Payload} ForgotPasswordStep3Payload
 * @typedef {import('./tradeApiClient.types').ProviderCreatePayload} ProviderCreatePayload
 * @typedef {import('./tradeApiClient.types').CopyTraderCreatePayload} CopyTraderCreatePayload
 * @typedef {import('./tradeApiClient.types').EditClonedProvderPayload} EditClonedProvderPayload
 * @typedef {import('./tradeApiClient.types').UserExchangeAssetsPayload} UserExchangeAssetsPayload
 * @typedef {import('./tradeApiClient.types').NewProviderEntity} NewProviderEntity
 * @typedef {import('./tradeApiClient.types').CloneActionResponseObject} CloneActionResponseObject
 * @typedef {import('./tradeApiClient.types').UserExchangeAssetObject} UserExchangeAssetObject
 * @typedef {import('./tradeApiClient.types').SessionResponseObject} SessionResponseObject
 * @typedef {import('./tradeApiClient.types').ExchangeOpenOrdersObject} ExchangeOpenOrdersObject
 * @typedef {import('./tradeApiClient.types').ProviderDataPointsEntity} ProviderDataPointsEntity
 * @typedef {import('./tradeApiClient.types').ProviderExchangeSettingsObject} ProviderExchangeSettingsObject
 * @typedef {import('./tradeApiClient.types').CancelOrderPayload} CancelOrderPayload
 * @typedef {import('./tradeApiClient.types').ProviderPerformanceEntity} ProviderPerformanceEntity
 * @typedef {import('./tradeApiClient.types').ProviderFollowersEntity} ProviderFollowersEntity
 * @typedef {import('./tradeApiClient.types').ProviderCopiersEntity} ProviderCopiersEntity
 * @typedef {import('./tradeApiClient.types').ExchangeListEntity} ExchangeListEntity
 * @typedef {import('./tradeApiClient.types').DefaultProviderGetObject} DefaultProviderGetObject
 * @typedef {import('./tradeApiClient.types').DefaultDailyBalanceEntity} DefaultDailyBalanceEntity
 * @typedef {import('./tradeApiClient.types').UserBalanceEntity} UserBalanceEntity
 * @typedef {import('./tradeApiClient.types').ExchangeConnectionEntity} ExchangeConnectionEntity
 * @typedef {import('./tradeApiClient.types').ManagementPositionsEntity} ManagementPositionsEntity
 *
 */

/**
 * Trade API client service, provides integration to API endpoints.
 *
 * @constructor
 * @public
 * @class TradeApiClient
 */
class TradeApiClient {
  /**
   * Creates an instance of TradeApiClient.
   * @memberof TradeApiClient
   */
  constructor() {
    this.baseUrl = process.env.GATSBY_TRADEAPI_URL;
  }

  /**
   * Process API HTTP request.
   *
   * @param {string} endpointPath API endpoint path and action.
   * @param {Object} payload Request payload parameters object.
   * @returns {Promise<*>} Promise that resolves Trade API request response.
   *
   * @memberof TradeApiClient
   */
  async doRequest(endpointPath, payload) {
    let responseData = {};
    const requestUrl = this.baseUrl + endpointPath;

    const options = payload
      ? {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.GATSBY_API_KEY || "",
          },
        }
      : { method: "GET" };

    try {
      const response = await fetch(requestUrl, options);
      if (response.status === 200) {
        responseData = await response.json();
      } else {
        responseData.error = await response.json();
      }
    } catch (e) {
      responseData.error = e.message;
    }

    if (responseData.error) {
      const customError = responseData.error.error || responseData.error;

      if (customError.code === 13) {
        // Session expired
        navigateLogin();
      }
      throw customError;
    }

    return responseData;
  }

  /**
   * Login a user in Trade API.
   *
   * @param {UserLoginPayload} payload User login payload
   *
   * @returns {Promise<UserEntity>} Promise that resolves user entity.
   *
   * @memberof TradeApiClient
   */
  async userLogin(payload) {
    const endpointPath = "/fe/api.php?action=login";
    const responseData = await this.doRequest(endpointPath, payload);

    return userEntityResponseTransform(responseData);
  }

  /**
   * Register a user in Trade API.
   *
   * @param {UserRegisterPayload} payload User register payload.
   *
   * @returns {Promise<UserEntity>} Promise that resolves user entity.
   *
   * @memberof TradeApiClient
   */
  async userRegister(payload) {
    const endpointPath = "/fe/api.php?action=signup";
    const responseData = await this.doRequest(endpointPath, payload);

    return userEntityResponseTransform(responseData);
  }

  /**
   * Get user open trading positions.
   *
   * @param {PositionsListPayload} payload User authorization payload.

   * @returns {Promise<UserPositionsCollection>} Promise that resolve user positions collection.
   *
   * @memberof TradeApiClient
   */
  async openPositionsGet(payload) {
    const endpointPath = "/fe/api.php?action=getOpenPositions";
    const responseData = await this.doRequest(endpointPath, { ...payload, version: 2 });

    return userPositionsResponseTransform(responseData);
  }

  /**
   * Get user closed trading positions.
   *
   * @param {PositionsListPayload} payload User authorization payload.

   * @returns {Promise<UserPositionsCollection>} Promise that resolve user positions collection.
   *
   * @memberof TradeApiClient
   */
  async closedPositionsGet(payload) {
    const endpointPath = "/fe/api.php?action=getClosedPositions";
    const responseData = await this.doRequest(endpointPath, {
      type: "sold",
      ...payload,
    });

    return userPositionsResponseTransform(responseData);
  }

  /**
   * Get user unsold / unopened trading positions.
   *
   * @param {PositionsListPayload} payload User authorization payload.

   * @returns {Promise<UserPositionsCollection>} Promise that resolve user positions collection.
   *
   * @memberof TradeApiClient
   */
  async logPositionsGet(payload) {
    const endpointPath = "/fe/api.php?action=getClosedPositions";
    const responseData = await this.doRequest(endpointPath, {
      type: "log",
      ...payload,
    });

    return userPositionsResponseTransform(responseData);
  }

  /**
   * Get providers list.
   *
   * @param {ProvidersPayload} payload Get providers payload.

   * @returns {Promise<ProvidersCollection>} Promise that resolves providers collection.
   *
   * @memberof TradeApiClient
   */
  async providersGet(payload) {
    const endpointPath = "/fe/api.php?action=getProviderList2";
    const responseData = await this.doRequest(endpointPath, payload);

    return providersResponseTransform(responseData);
  }

  /**
   * Get user's exchange connections.
   *
   * @param {AuthorizationPayload} payload User's exchange connections payload.
   * @returns {Promise<Array<ExchangeConnectionEntity>>} Promise that resolbves user's exchange connections.
   * @memberof TradeApiClient
   */

  async userExchangesGet(payload) {
    const endpointPath = "/fe/api.php?action=getUserExchanges";
    const responseData = await this.doRequest(endpointPath, payload);

    return userExchangeConnectionResponseTransform(responseData);
  }

  /**
   * Get user's quick balance summary.
   *
   * @param {UserEquityPayload} payload Get user balance summary payload.
   * @returns {Promise<UserBalanceEntity>} Promise that resolves user balance entity.
   * @memberof TradeApiClient
   */

  async userBalanceGet(payload) {
    const endpointPath = "/fe/api.php?action=getQuickExchangeSummary";
    const responseData = await this.doRequest(endpointPath, payload);

    return userBalanceResponseTransform(responseData);
  }

  /**
   * Get user's daily balance for an exchange.
   *
   * @param {UserEquityPayload} payload Get daily balance payload.
   * @returns {Promise<DefaultDailyBalanceEntity>} Promise that resolves user's daily balance list.
   * @memberof TradeApiClient
   */

  async userEquityGet(payload) {
    const endpointPath = "/fe/api.php?action=getHistoricalBalance";
    const responseData = await this.doRequest(endpointPath, payload);

    return userEquityResponseTransform(responseData);
  }

  /**
   * Get providers profits stats.
   *
   * @param {ProvidersStatsPayload} payload Get providers stats payload.

   * @returns {Promise<ProvidersStatsCollection>} Promise that resolves providers stats collection.
   *
   * @memberof TradeApiClient
   */
  async providersStatsGet(payload) {
    const endpointPath = "/fe/api.php?action=getProviderProfitStats";
    const responseData = await this.doRequest(endpointPath, payload);

    return providersStatsResponseTransform(responseData);
  }

  /**
   * Close a position.
   *
   * @param {PositionActionPayload} payload Position action payload.

   * @returns {Promise<PositionEntity>} Promise that resolve user affected position entity.
   *
   * @memberof TradeApiClient
   */
  async positionClose(payload) {
    const endpointPath = "/fe/api.php?action=closePosition";
    const responseData = await this.doRequest(endpointPath, payload);

    return userPositionItemTransform(responseData);
  }

  /**
   * Exit a position.
   *
   * @param {PositionActionPayload} payload Position action payload.

   * @returns {Promise<PositionEntity>} Promise that resolve user affected position entity.
   *
   * @memberof TradeApiClient
   */
  async positionExit(payload) {
    const endpointPath = "/fe/api.php?action=sellPosition";
    const responseData = await this.doRequest(endpointPath, payload);

    return userPositionItemTransform(responseData);
  }

  /**
   * Cancel position entry.
   *
   * @param {PositionActionPayload} payload Position action payload.

   * @returns {Promise<PositionEntity>} Promise that resolve user affected position entity.
   *
   * @memberof TradeApiClient
   */
  async positionCancel(payload) {
    const endpointPath = "/fe/api.php?action=cancelBuy";
    const responseData = await this.doRequest(endpointPath, payload);

    return userPositionItemTransform(responseData);
  }

  /**
   * Get a position.
   *
   * @param {PositionActionPayload} payload Position action payload.

   * @returns {Promise<PositionEntity>} Promise that resolve user affected position entity.
   *
   * @memberof TradeApiClient
   */
  async positionGet(payload) {
    const endpointPath = "/fe/api.php?action=getPosition";
    const responseData = await this.doRequest(endpointPath, { ...payload, version: 2 });

    return userPositionItemTransform(responseData);
  }

  /**
   * Get a raw position (for debug).
   *
   * @param {PositionActionPayload} payload Position action payload.
   * @returns {Promise<*>} Promise that resolve raw position entity.
   *
   * @memberof TradeApiClient
   */
  async positionRawGet(payload) {
    const endpointPath = "/fe/api.php?action=getRawPosition";
    const responseData = await this.doRequest(endpointPath, { ...payload, version: 2 });
    return responseData;
  }

  /**
   * @typedef {import('./tradeApiClient.types').QuotesAssetsGetPayload} QuotesAssetsGetPayload
   * @typedef {import('./tradeApiClient.types').QuoteAssetsDict} QuoteAssetsDict
   * @typedef {import('./tradeApiClient.types').BaseAssetsDict} BaseAssetsDict
   */

  /**
   *
   * Get quote assets.
   *
   * @param {QuotesAssetsGetPayload} payload Payload.
   * @returns {Promise<QuoteAssetsDict>} Promise that resolves quote assets.
   * @memberof TradeApiClient
   */
  async quotesAssetsGet(payload) {
    const endpointPath = "/fe/api.php?action=getQuoteAssets";
    const responseData = await this.doRequest(endpointPath, payload);

    return quotesResponseTransform(responseData);
  }

  /**
   * Get provider's data.
   *
   * @param {GetProviderPayload} payload Get provider's data payload.

   * @returns {Promise<DefaultProviderGetObject>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async providerGet(payload) {
    const endpointPath = "/fe/api.php?action=getProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return providerGetResponseTransform(responseData);
  }

  /**
   * @typedef {import('./tradeApiClient.types').ServerTime} ServerTime
   */

  /**
   * Get Trade API server time.
   *
   * @param {AuthorizationPayload} payload User authorization.
   * @returns {Promise<ServerTime>} Promise that resolves server time value object.
   *
   * @memberof TradeApiClient
   */
  async serverTimeGet(payload) {
    const endpointPath = "/fe/ohlc.php?action=fetchTime";
    const responseData = await this.doRequest(endpointPath, payload);

    return serverTimeResponseTransform(responseData);
  }

  /**
   * Get a coinray access token for authenticated Trade API user.
   *
   * @param {AuthorizationPayload} payload User authorization.
   * @returns {Promise<CoinRayToken>} Promise that resolves server time value object.
   *
   * @memberof TradeApiClient
   */
  async coinRayTokenGet(payload) {
    const endpointPath = "/fe/api.php?action=getCoinRayToken";
    const responseData = await this.doRequest(endpointPath, payload);

    return coinRayTokenResponseTransform(responseData);
  }

  /**
   * Get user exchange connnection market data.
   *
   * @param {AuthorizationPayload} payload Authorized exchange data payload.
   * @returns {Promise<MarketSymbolsCollection>} Promise that resolves exchange market (symbols) data collection.
   *
   * @memberof TradeApiClient
   */
  async exchangeConnectionMarketDataGet(payload) {
    const endpointPath = "/fe/api.php?action=getPairsNew";
    const responseData = await this.doRequest(endpointPath, payload);

    return exchangeMarketDataResponseTransform(responseData);
  }

  /**
   *
   * Get quote assets.
   *
   * @param {BaseAssetsPayload} payload
   * @returns {Promise<BaseAssetsDict>} Promise that resolves base assets.
   * @memberof TradeApiClient
   */

  async baseAssetsGet(payload) {
    const endpointPath = "/fe/api.php?action=getBaseAssets";
    const responseData = await this.doRequest(endpointPath, payload);

    return basesResponseTransform(responseData);
  }

  /**
   *
   * Get exchange assets.
   *
   * @param {ExchangeAssetsPayload} payload
   * @returns {Promise<ExchangeAssetsDict>} Promise that resolves exchange assets.
   * @memberof TradeApiClient
   */

  async exchangeAssetsGet(payload) {
    const endpointPath = "/fe/api.php?action=getExchangeAssets";
    const responseData = await this.doRequest(endpointPath, payload);

    return exchangeAssetsResponseTransform(responseData);
  }

  /**
   *
   * Get connected provider user info.
   *
   * @param {ConnectedProviderUserInfoPayload} payload
   * @returns {Promise<ConnectedProviderUserInfo>} Promise that resolves connected trader user info.
   * @memberof TradeApiClient
   */

  async connectedProviderUserInfoGet(payload) {
    const endpointPath = "/fe/api.php?action=getCurrentAllocatedAndProfitSinceFollowing";
    const responseData = await this.doRequest(endpointPath, payload);

    return connectedProviderUserInfoResponseTransform(responseData);
  }

  /**
   * Connect to a copy trader service.
   *
   * @param {ConnectTraderPayload} payload Connect trader payload.

   * @returns {Promise<"OK">} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async providerConnect(payload) {
    const endpointPath = "/fe/api.php?action=createProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Connect to a signal provider service.
   *
   * @param {ConnectProviderPayload} payload Connect provider payload.

   * @returns {Promise<"OK">} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async serviceConnect(payload) {
    const endpointPath = "/fe/api.php?action=connectService";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Get providers profits stats.
   *
   * @param {DisableProviderPayload} payload Get providers stats payload.

   * @returns {Promise<Array<*>>}
   *
   * @memberof TradeApiClient
   */

  async providerDisable(payload) {
    const endpointPath = "/fe/api.php?action=toggleProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Get providers profits stats.
   *
   * @param {DeleteProviderPayload} payload Get providers stats payload.

   * @returns {Promise<Array<*>>}
   *
   * @memberof TradeApiClient
   */

  async providerDelete(payload) {
    const endpointPath = "/fe/api.php?action=deleteProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Get providers profits stats.
   *
   * @param {AuthorizationPayload} payload Get providers stats payload.

   * @returns {Promise<Array<ExchangeListEntity>>}
   *
   * @memberof TradeApiClient
   */

  async exchangeListGet(payload) {
    const endpointPath = "/fe/api.php?action=getExchangeList";
    const responseData = await this.doRequest(endpointPath, payload);

    return exchangeListResponseTransform(responseData);
  }
  /**
   * Get copy trader providers options.
   *
   * @param {CopyTradersProvidersOptionsPayload} payload Get own copy trader providers options payload.
   * @returns {Promise<CopyTradersProvidersOptionsCollection>} Promise that resolves own copy trader providers options.
   * @memberof TradeApiClient
   */
  async userOwnCopyTradersProvidersOptions(payload) {
    const endpointPath = "/fe/api.php?action=getCopyTradingProvidersOptions";
    const responseData = await this.doRequest(endpointPath, payload);

    return ownCopyTraderProvidersOptionsResponseTransform(responseData);
  }

  /**
   * Connect to a new exchange.
   *
   * @param {ExchangeAddPayload} payload Payload
   * @returns {Promise<boolean>} Result
   * @memberof TradeApiClient
   */
  async exchangeAdd(payload) {
    const endpointPath = "/fe/api.php?action=addExchange";
    const responseData = await this.doRequest(endpointPath, payload);
    return responseData;
  }

  /**
   * Delete an exchange.
   *
   * @param {ExchangeDeletePayload} payload Payload
   * @returns {Promise<boolean>} Result
   * @memberof TradeApiClient
   */
  async exchangeDelete(payload) {
    const endpointPath = "/fe/api.php?action=delNewExchange";
    const responseData = await this.doRequest(endpointPath, payload);
    return responseData;
  }

  /**
   * Update an exchange.
   *
   * @param {ExchangeUpdatePayload} payload Payload
   * @returns {Promise<boolean>} Result
   * @memberof TradeApiClient
   */
  async exchangeUpdate(payload) {
    const endpointPath = "/fe/api.php?action=updateNewExchange";
    const responseData = await this.doRequest(endpointPath, payload);
    return responseData;
  }

  /**
   * Edit Provider method.
   *
   * @param {EditProvderPayload} payload Edit provider payload.
   *
   * @returns {Promise<*>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async providerEdit(payload) {
    const endpointPath = "/fe/api.php?action=editProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Edti cloned provider method.
   *
   * @param {EditClonedProvderPayload} payload Edit cloned provider.
   *
   * @returns {Promise<*>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async clonedProviderEdit(payload) {
    const endpointPath = "/fe/api.php?action=editProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Get providers copiers data.
   *
   * @param {GetProviderFollowersPayload} payload Get providers copiers payload.
   *
   * @returns {Promise<Array<ProviderCopiersEntity>>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async providerCopiersGet(payload) {
    const endpointPath = "/fe/api.php?action=getFollowersChartForProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return providerCopiersResponseTransform(responseData);
  }

  /**
   * Get providers followers data.
   *
   * @param {GetProviderFollowersPayload} payload Get providers followers payload.
   *
   * @returns {Promise<Array<ProviderFollowersEntity>>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async providerFollowersListGet(payload) {
    const endpointPath = "/fe/api.php?action=getFollowersList";
    const responseData = await this.doRequest(endpointPath, payload);

    return providerFollowersListResponseTransform(responseData);
  }

  /**
   * Get deposit address for coin.
   *
   * @param {DepositAddressGetPayload} payload Get deposit address payload

   * @returns {Promise<*>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async exchangeDepositAddressGet(payload) {
    const endpointPath = "/fe/api.php?action=getExchangeDepositAddress";
    const responseData = await this.doRequest(endpointPath, payload);

    return exchangeDepositAddressResponseTransform(responseData);
  }

  /**
   * Create manual position.
   *
   * @param {CreatePositionPayload} payload Create manual position payload.

   * @returns {Promise<string>} Promise that resolve created position ID.
   *
   * @memberof TradeApiClient
   */
  async manualPositionCreate(payload) {
    const endpointPath = "/fe/api.php?action=createManualPosition";
    const responseData = await this.doRequest(endpointPath, { ...payload, version: 2 });

    return responseData;
  }

  /**
   * Update manual position.
   *
   * @param {UpdatePositionPayload} payload Update manual position payload.

   * @returns {Promise<string>} Promise that resolve updated position ID.
   *
   * @memberof TradeApiClient
   */
  async manualPositionUpdate(payload) {
    const endpointPath = "/fe/api.php?action=updatePosition";
    const responseData = await this.doRequest(endpointPath, { ...payload, version: 2 });

    return responseData;
  }

  /**
   * Get providers yearly performance stats.
   *
   * @param {GetProviderFollowersPayload} payload Get providers stats payload.
   * @returns {Promise<ProviderPerformanceEntity>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async providerPerformanceGet(payload) {
    const endpointPath = "/fe/api.php?action=getProviderPerformance";
    const responseData = await this.doRequest(endpointPath, payload);

    return providerPerformanceResponseTransform(responseData);
  }

  /**
   * Get user profile data.
   *
   * @param {AuthorizationPayload} payload User profile payloaad..

   * @returns {Promise<UserEntity>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async userDataGet(payload) {
    const endpointPath = "/fe/api.php?action=getUserData";
    const responseData = await this.doRequest(endpointPath, payload);

    return userEntityResponseTransform(responseData);
  }

  /**
   * Get provider exchange settings.
   *
   * @param {ProviderExchangeSettingsPayload} payload Get providers exchange settings payload.

   * @returns {Promise<ProviderExchangeSettingsObject>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async providerExchangeSettingsGet(payload) {
    const endpointPath = "/fe/api.php?action=getProviderExchangeSettings";
    const responseData = await this.doRequest(endpointPath, payload);

    return providerExchangeSettingsResponseTransform(responseData);
  }

  /**
   * Update provider settings.
   *
   * @param {ProviderExchangeSettingsUpdatePayload} payload Provider settings update payload.

   * @returns {Promise<ProviderExchangeSettingsObject>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async providerExchangeSettingsUpdate(payload) {
    const endpointPath = "/fe/api.php?action=updateProviderExchangeSettingsNew";
    const responseData = await this.doRequest(endpointPath, payload);

    return providerExchangeSettingsResponseTransform(responseData);
  }

  /**
   * Get provider's profit/management stats.
   *
   * @param {GetProviderFollowersPayload} payload Provider's stats payload.

   * @returns {Promise<ProviderDataPointsEntity>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async providerCopyTradingDataPointsGet(payload) {
    const endpointPath = "/fe/api.php?action=getCopyTradingDataPoints";
    const responseData = await this.doRequest(endpointPath, payload);

    return providerDataPointsResponseTransform(responseData);
  }

  /**
   * @param {GetExchangeLastDepositsPayload} payload Get exchange last deposits payload.
   * @returns {Promise<Array<ExchangeDepositEntity>>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async exchangeLastDepositsGet(payload) {
    const endpointPath = "/fe/api.php?action=getExchangeLastDeposits";
    const responseData = await this.doRequest(endpointPath, payload);

    return exchangeDepositsResponseTransform(responseData);
  }

  /**
   * Get providers profits stats.
   *
   * @param {GetExchangeLastDepositsPayload} payload Get exchange last withdrawals payload.
   * @returns {Promise<Array<ExchangeWithdrawEntity>>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async exchangeLastWithdrawalsGet(payload) {
    const endpointPath = "/fe/api.php?action=getExchangeLastWithdrawals";
    const responseData = await this.doRequest(endpointPath, payload);

    return exchangeWithdrawsResponseTransform(responseData);
  }

  /**
   * Withdraw currency to a different address.
   *
   * @param {WithdrawPayload} payload Withdraw payload.
   * @returns {Promise<WithdrawReply>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async withdraw(payload) {
    const endpointPath = "/fe/api.php?action=exchangeWithdraw";
    const responseData = await this.doRequest(endpointPath, payload);

    return withdrawResponseTransform(responseData);
  }

  /**
   * Modify user's subscription.
   *
   * @param {ModifySubscriptionPayload} payload payload.
   * @returns {Promise<Boolean>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async modifySubscription(payload) {
    const endpointPath = "/fe/api.php?action=modifyFollowerSubscriptionDuration";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Cancel user's subscription.
   *
   * @param {CancelSubscriptionPayload} payload Cancel subscription payload.
   * @returns {Promise<Boolean>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async cancelSubscription(payload) {
    const endpointPath = "/fe/api.php?action=cancelFollowerSubscription";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Convert small balances to BNB
   *
   * @param {ConvertPayload} payload Convert payload.
   * @returns {Promise<ConvertReply>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async convert(payload) {
    const endpointPath = "/fe/api.php?action=exchangeDustTransfer";
    const responseData = await this.doRequest(endpointPath, payload);

    return convertAssetResponseTransform(responseData);
  }

  /**
   * Function to get Management positions.
   *
   * @param {GetProviderFollowersPayload} payload Management poistions payload.
   * @returns {Promise<Array<ManagementPositionsEntity>>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async providerManagementPositions(payload) {
    const endpointPath = "/fe/api.php?action=getCopyTradingPositions";
    const responseData = await this.doRequest(endpointPath, payload);

    return managementPositionsResponseTransform(responseData);
  }

  /**
   * Change password.
   *
   * @param {UpdatePasswordPayload} payload Change password payload.
   * @returns {Promise<*>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async updatePassword(payload) {
    const endpointPath = "/fe/api.php?action=changePassword";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Get code to enable 2FA.
   *
   * @param {AuthorizationPayload} payload Payload
   * @returns {Promise<Array<string>>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async enable2FA1Step(payload) {
    const endpointPath = `/fe/api.php?action=enable2FA1Step&token=${payload.token}`;
    const responseData = await this.doRequest(endpointPath, null);

    return responseData;
  }

  /**
   * Enable 2FA.
   *
   * @param {TwoFAPayload} payload Payload
   * @returns {Promise<Boolean>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async enable2FA2Step(payload) {
    const endpointPath = "/fe/api.php?action=enable2FA2Step";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Disable 2FA.
   *
   * @param {TwoFAPayload} payload Payload
   * @returns {Promise<Boolean>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async disable2FA(payload) {
    const endpointPath = "/fe/api.php?action=disable2FA";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Verify 2FA.
   *
   * @param {TwoFAPayload} payload Payload
   * @returns {Promise<Boolean>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async verify2FA(payload) {
    const endpointPath = "/fe/api.php?action=verify2FA";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Get user notifications settings.
   *
   * @param {AuthorizationPayload} payload Payload
   * @returns {Promise<ProfileNotifications>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async getProfileNotifications(payload) {
    const endpointPath = "/fe/api.php?action=getProfileNotifications";
    const responseData = await this.doRequest(endpointPath, payload);

    return profileNotificationsResponseTransform(responseData);
  }

  /**
   * Update user notifications settings.
   *
   * @param {ProfileNotificationsPayload} payload Payload
   * @returns {Promise<ProfileNotifications>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async updateProfileNotifications(payload) {
    const endpointPath = "/fe/api.php?action=updateProfileNotifications";
    const responseData = await this.doRequest(endpointPath, payload);

    return profileNotificationsResponseTransform(responseData);
  }

  /**
   * Function to get provider's open positions.
   *
   * @param {GetProviderFollowersPayload} payload Provider's open poistions payload.
   * @returns {Promise<UserPositionsCollection>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async providerOpenPositions(payload) {
    const endpointPath = "/fe/api.php?action=getOpenPositionsFromProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return userPositionsResponseTransform(responseData);
  }

  /**
   * Function to get provider's closed positions.
   *
   * @param {GetProviderFollowersPayload} payload Provider's closed poistions payload.
   * @returns {Promise<UserPositionsCollection>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async providerSoldPositions(payload) {
    const endpointPath = "/fe/api.php?action=getSoldPositionsFromProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return userPositionsResponseTransform(responseData);
  }

  /**
   * Function to request password change through email.
   *
   * @param {ForgotPasswordStep1Payload} payload Request Password change step 1 payload.
   * @returns {Promise<"OK">} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async forgotPasswordStep1(payload) {
    const endpointPath = "/fe/api.php?action=forgottenPassword1Step";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Create a new copy trader.
   *
   * @param {ProviderCreatePayload} payload Provider Create payload.
   * @returns {Promise<NewProviderEntity>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async copyTraderCreate(payload) {
    const endpointPath = "/fe/api.php?action=createCopyTrader";
    const responseData = await this.doRequest(endpointPath, payload);

    return providerCreateResponseTransform(responseData);
  }

  /**
   * Function to verify token received by completing step 1 of password change.
   *
   * @param {AuthorizationPayload} payload Password change token verification payload.
   * @return {Promise<"OK">} Promise that resolve boolean result.
   * */
  async forgotPasswordStep2(payload) {
    const endpointPath = "/fe/api.php?action=forgottenPassword2Step";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Function to change password after completing step 2 of password change.
   *
   * @param {ForgotPasswordStep3Payload} payload Request Password change payload.
   * @returns {Promise<"OK">} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async forgotPasswordStep3(payload) {
    const endpointPath = "/fe/api.php?action=forgottenPassword3Step";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Create a new signal provider.
   *
   * @param {ProviderCreatePayload} payload Provider Create payload.
   * @returns {Promise<NewProviderEntity>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async providerCreate(payload) {
    const endpointPath = "/fe/api.php?action=createProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return providerCreateResponseTransform(responseData);
  }

  /**
   * Function to clone a provider.
   *
   * @param {GetProviderFollowersPayload} payload Clone provider payload.
   * @returns {Promise<CloneActionResponseObject>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async cloneProvider(payload) {
    const endpointPath = "/fe/api.php?action=cloneProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return cloneProviderResponseTransform(responseData);
  }

  /**
   * Get user exchange assets.
   *
   * @param {UserExchangeAssetsPayload} payload Get user exchange assets payload.
   * @returns {Promise<Array<UserExchangeAssetObject>>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async userExchangeAssetsGet(payload) {
    const endpointPath = "/fe/api.php?action=getExchangeAssets";
    const responseData = await this.doRequest(endpointPath, payload);

    return userExchangeAssetsResponseTransform(responseData);
  }

  /**
   * Get user exchange available balance.
   *
   * @param {UserEquityPayload} payload Get user balance payload.
   * @returns {Promise<*>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async userAvailableBalanceGet(payload) {
    const endpointPath = "/fe/api.php?action=getAvailableBalance";
    const responseData = await this.doRequest(endpointPath, payload);

    return userAvailableBalanceResponseTransform(responseData);
  }

  /**
   * Function to clone a provider.
   *
   * @param {AuthorizationPayload} payload Clone provider payload.
   * @returns {Promise<SessionResponseObject>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async sessionDataGet(payload) {
    const endpointPath = "/fe/api.php?action=getSessionData";
    const responseData = await this.doRequest(endpointPath, payload);

    return sessionDataResponseTransform(responseData);
  }

  /**
   * Function to get exchange open orders.
   *
   * @param {UserEquityPayload} payload exchange orders payload.
   * @returns {Promise<Array<ExchangeOpenOrdersObject>>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async openOrdersGet(payload) {
    const endpointPath = "/fe/api.php?action=getOpenOrders";
    const responseData = await this.doRequest(endpointPath, payload);

    return exchangeOpenOrdersResponseTransform(responseData);
  }

  /**
   * Function to get exchange contracts.
   *
   * @param {UserEquityPayload} payload exchange contracts payload.
   * @returns {Promise<*>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async exchangeContractsGet(payload) {
    const endpointPath = "/fe/api.php?action=getExchangeContracts";
    const responseData = await this.doRequest(endpointPath, payload);

    return exchangeContractsResponseTransform(responseData);
  }

  /**
   * Canel exchange order.
   *
   * @param {CancelOrderPayload} payload Cancel exchange order payload.
   * @returns {Promise<*>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async cancelExchangeOrder(payload) {
    const endpointPath = "/fe/api.php?action=cancelOrder";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }
}

// JS export by default guarantee a singleton instance if we export the class
// instance, see:
// https://medium.com/@lazlojuly/are-node-js-modules-singletons-764ae97519af
const client = new TradeApiClient();
Object.freeze(client);

export default client;
