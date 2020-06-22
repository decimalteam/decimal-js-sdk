import DecimalApi from './api/index';
import getCoinslist from './api/get-coins-list';
import getCoin from './api/get-coin';
import getAddress from './api/get-address';
import getNonce from './api/get-nonce';
import getMultisigsByAddress from './api/get-multisigs';
import getMultisig from './api/get-multisig';
import getMultisigTxs from './api/get-txs-multisig';
import getStakesByAddress from './api/get-stakes';
import TX_TYPE from './txTypes';
import {
  prepareTx,
  makeSignature,
  postTx,
  getTransaction,
  estimateTxCommission,
} from './txUtils';
import { issueCheck, redeemCheck } from './check';

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
    this.getMultisigsByAddress = getMultisigsByAddress(apiInstance);
    this.getMultisig = getMultisig(apiInstance);
    this.getMultisigTxs = getMultisigTxs(apiInstance);
    this.getStakesByAddress = getStakesByAddress(apiInstance);

    this.prepareTx = prepareTx(apiInstance);
    this.makeSignature = makeSignature(apiInstance);
    this.postTx = postTx(apiInstance);

    this.issueCheck = issueCheck(apiInstance);
    this.redeemCheck = redeemCheck(apiInstance, TX_TYPE.COIN_REDEEM_CHECK);

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

    this.multisigCreateWallet = postTx(apiInstance, TX_TYPE.MULTISIG_CREATE_WALLET);
    this.multisigSignTx = postTx(apiInstance, TX_TYPE.MULTISIG_SIGN_TX);
    this.multisigCreateTx = postTx(apiInstance, TX_TYPE.MULTISIG_CREATE_TX);

    this.estimateTxCommission = estimateTxCommission(apiInstance);
    this.getTransaction = getTransaction(apiInstance);
  }
}
