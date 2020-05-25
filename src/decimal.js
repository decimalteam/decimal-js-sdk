import DecimalApi from './api/index';
import getCoinslist from './api/get-coins-list';
import getCoin from './api/get-coin';
import { prepareTx, makeSignature, postTx } from './txUtils';
import { sendCoin, buyCoin, sellCoin } from './tx';

export default class Decimal {
  constructor(options) {
    const apiInstance = new DecimalApi(options.baseURL);
    const { chainId } = options;

    if (!(chainId === 'decimal-testnet' || chainId === 'decimal-mainnet')) {
      throw new Error('Invalid chainID');
    }

    this.getCoinsList = getCoinslist(apiInstance);
    this.getCoin = getCoin(apiInstance);

    this.prepareTx = prepareTx();
    this.makeSignature = makeSignature(apiInstance);
    this.postTx = postTx(apiInstance);

    this.sendCoin = sendCoin(apiInstance);
    this.buyCoin = buyCoin(apiInstance);
    this.sellCoin = sellCoin(apiInstance);
  }
}
