import DecimalApi from './api/index';
import getCoinslist from './api/get-coins-list';
import getCoin from './api/get-coin';
import getAddress from './api/get-address';
import getNonce from './api/get-nonce';
import TX_TYPE from './txTypes';
import { prepareTx, makeSignature, postTx } from './txUtils';
import { multisigCreateWallet } from './multisig';

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

    this.sendCoins = postTx(apiInstance, TX_TYPE.COIN_SEND);
    this.buyCoins = postTx(apiInstance, TX_TYPE.COIN_BUY);
    this.sellCoins = postTx(apiInstance, TX_TYPE.COIN_SELL);
    this.sellAllCoins = postTx(apiInstance, TX_TYPE.COIN_SELL_ALL);
    this.createCoin = postTx(apiInstance, TX_TYPE.COIN_CREATE);

    this.declareCandidate = postTx(apiInstance, TX_TYPE.VALIDATOR_CANDIDATE);
    this.delegate = postTx(apiInstance, TX_TYPE.VALIDATOR_DELEGATE);
    this.validatorSetOnline = postTx(apiInstance, TX_TYPE.VALIDATOR_SET_ONLINE);
    this.validatorSetOffline = postTx(apiInstance, TX_TYPE.VALIDATOR_SET_OFFLINE);
    this.validatorUnbond = postTx(apiInstance, TX_TYPE.VALIDATOR_UNBOND);
    this.editCandidate = postTx(apiInstance, TX_TYPE.VALIDATOR_CANDIDATE_EDIT);

    this.multisigCreateWallet = multisigCreateWallet(apiInstance, TX_TYPE.MULTISIG_CREATE_WALLET);
    // this.multisigSignTx = postTx(apiInstance, TX_TYPE.MULTISIG_SIGN_TX);
    // this.multisigCreateTx = postTx(apiInstance, TX_TYPE.MULTISIG_CREATE_TX);
  }
}
