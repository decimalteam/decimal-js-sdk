import DecimalApi from './api/index';
import getCoinslist from './api/get-coins-list';
import getCoin from './api/get-coin';
import getAddress from './api/get-address';
import getNonce from './api/get-nonce';
import getMultisigsByAddress from './api/get-multisigs';
import getMultisig from './api/get-multisig';
import getMultisigTxs from './api/get-txs-multisig';
import getStakesByAddress from './api/get-stakes';
import getValidator from './api/get-validator';
import getMyTransactions from './api/get-my-transactions';

import TX_TYPE from './txTypes';

import {
  prepareTx,
  makeSignature,
  postTx,
  getSignMeta,
} from './txUtils';

import { issueCheck } from './check';
import { getTransaction, sendTransaction, estimateTxFee } from './tx';

export default class Decimal {
  constructor(options) {
    const apiInstance = new DecimalApi(options.baseURL);
    const { wallet } = options;
    const { signMeta } = options;

    this.signMeta = signMeta;

    // api
    this.getCoinsList = getCoinslist(apiInstance);
    this.getCoin = getCoin(apiInstance);
    this.getAddress = getAddress(apiInstance);
    this.getNonce = getNonce(apiInstance);
    this.getMultisigsByAddress = getMultisigsByAddress(apiInstance);
    this.getMultisig = getMultisig(apiInstance);
    this.getMultisigTxs = getMultisigTxs(apiInstance);
    this.getStakesByAddress = getStakesByAddress(apiInstance);
    this.getValidator = getValidator(apiInstance);
    this.getMeta = getSignMeta(apiInstance, wallet);
    this.getMyTransactions = getMyTransactions(apiInstance, wallet);

    // tx utils
    this.prepareTx = prepareTx(apiInstance);
    this.makeSignature = makeSignature(apiInstance, wallet, this);
    this.postTx = postTx(apiInstance);
    this.getTransaction = getTransaction(apiInstance, wallet, this);

    // get fee
    this.estimateTxFee = estimateTxFee(apiInstance, wallet, this);

    // tx methods
    this.sendCoins = sendTransaction(TX_TYPE.COIN_SEND, apiInstance, wallet, this);
    this.buyCoins = sendTransaction(TX_TYPE.COIN_BUY, apiInstance, wallet, this);
    this.sellCoins = sendTransaction(TX_TYPE.COIN_SELL, apiInstance, wallet, this);
    this.sellAllCoins = sendTransaction(TX_TYPE.COIN_SELL_ALL, apiInstance, wallet, this);

    this.multisendCoins = sendTransaction(TX_TYPE.COIN_MULTISEND, apiInstance, wallet, this);

    this.validatorDelegate = sendTransaction(TX_TYPE.VALIDATOR_DELEGATE, apiInstance, wallet, this);
    this.validatorUnbond = sendTransaction(TX_TYPE.VALIDATOR_UNBOND, apiInstance, wallet, this);

    this.validatorDeclare = sendTransaction(TX_TYPE.VALIDATOR_CANDIDATE, apiInstance, wallet, this);
    this.validatorEdit = sendTransaction(TX_TYPE.VALIDATOR_CANDIDATE_EDIT, apiInstance, wallet, this);
    this.validatorOn = sendTransaction(TX_TYPE.VALIDATOR_SET_ONLINE, apiInstance, wallet, this);
    this.validatorOff = sendTransaction(TX_TYPE.VALIDATOR_SET_OFFLINE, apiInstance, wallet, this);

    this.createCoin = sendTransaction(TX_TYPE.COIN_CREATE, apiInstance, wallet, this);

    this.issueCheck = issueCheck(apiInstance, wallet, this);
    this.redeemCheck = sendTransaction(TX_TYPE.COIN_REDEEM_CHECK, apiInstance, wallet, this);

    this.multisigCreateWallet = sendTransaction(TX_TYPE.MULTISIG_CREATE_WALLET, apiInstance, wallet, this);
    this.multisigCreateTx = sendTransaction(TX_TYPE.MULTISIG_CREATE_TX, apiInstance, wallet, this);
    this.multisigSignTx = sendTransaction(TX_TYPE.MULTISIG_SIGN_TX, apiInstance, wallet, this);
  }
}
