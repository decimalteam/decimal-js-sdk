import DecimalApi from './api/index';
import getCoinslist from './api/get-coins-list';
import getCoin from './api/get-coin';
import getAddress from './api/get-address';
import getNonce from './api/get-nonce';

import { prepareTx, makeSignature, postTx } from './txUtils';
import {
  sendCoins,
  buyCoins,
  sellCoins,
  sellAllCoins,
  createCoin,
} from './tx';

export default class Decimal {
  constructor(options) {
    const apiInstance = new DecimalApi(options.baseURL);
    const { chainId } = options;

    if (!(chainId === 'decimal-testnet' || chainId === 'decimal-mainnet')) {
      throw new Error('Invalid chainID');
    }

    this.getCoinsList = getCoinslist(apiInstance);
    this.getCoin = getCoin(apiInstance);
    this.getAddress = getAddress(apiInstance);
    this.getNonce = getNonce(apiInstance);

    this.prepareTx = prepareTx();
    this.makeSignature = makeSignature(apiInstance);
    this.postTx = postTx(apiInstance);

    this.sendCoins = sendCoins(apiInstance);
    this.buyCoins = buyCoins(apiInstance);
    this.sellCoins = sellCoins(apiInstance);
    this.sellAllCoins = sellAllCoins(apiInstance);
    this.createCoin = createCoin(apiInstance);
  }
}
