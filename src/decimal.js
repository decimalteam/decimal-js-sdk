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

import TX_TYPE from './txTypes';

import {
  prepareTx,
  makeSignature,
  postTx,
} from './txUtils';
// import { issueCheck, redeemCheck } from './check';
import { estimateTxFee } from './fees';
import { getTransaction, sendTransaction } from './tx';

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

    // tx utils
    this.prepareTx = prepareTx(apiInstance);
    this.makeSignature = makeSignature(apiInstance, wallet, this);
    this.postTx = postTx(apiInstance, this);
    this.getTransaction = getTransaction(apiInstance, wallet, this);

    // get fee
    this.estimateTxFee = estimateTxFee(apiInstance, wallet);

    // tx methods
    this.sendCoins = sendTransaction(TX_TYPE.COIN_SEND, apiInstance, wallet, this);
    this.buyCoins = sendTransaction(TX_TYPE.COIN_BUY, apiInstance, wallet, this);
    this.sellCoins = sendTransaction(TX_TYPE.COIN_SELL, apiInstance, wallet, this);
    this.sellAllCoins = sendTransaction(TX_TYPE.COIN_SELL_ALL, apiInstance, wallet, this);


    // this.issueCheck = issueCheck(apiInstance); // deprecated
    // this.redeemCheck = redeemCheck(apiInstance, TX_TYPE.COIN_REDEEM_CHECK); // deprecated

    // this.sendCoins = postTx(apiInstance, TX_TYPE.COIN_SEND); // deprecated
    // this.buyCoins = postTx(apiInstance, TX_TYPE.COIN_BUY); // deprecated
    // this.sellCoins = postTx(apiInstance, TX_TYPE.COIN_SELL); // deprecated
    // this.sellAllCoins = postTx(apiInstance, TX_TYPE.COIN_SELL_ALL); // deprecated
    // this.createCoin = postTx(apiInstance, TX_TYPE.COIN_CREATE); // deprecated

    // this.delegate = postTx(apiInstance, TX_TYPE.VALIDATOR_DELEGATE); // deprecated
    // this.validatorSetOnline = postTx(apiInstance, TX_TYPE.VALIDATOR_SET_ONLINE); // deprecated
    // this.validatorSetOffline = postTx(apiInstance, TX_TYPE.VALIDATOR_SET_OFFLINE); // deprecated
    // this.validatorUnbond = postTx(apiInstance, TX_TYPE.VALIDATOR_UNBOND); // deprecated
    // this.editCandidate = postTx(apiInstance, TX_TYPE.VALIDATOR_CANDIDATE_EDIT); // deprecated

    // this.multisigCreateWallet = postTx(apiInstance, TX_TYPE.MULTISIG_CREATE_WALLET); // deprecated
    // this.multisigSignTx = postTx(apiInstance, TX_TYPE.MULTISIG_SIGN_TX); // deprecated
    // this.multisigCreateTx = postTx(apiInstance, TX_TYPE.MULTISIG_CREATE_TX); // deprecated
    // this.estimateTxCommission = estimateTxCommission(apiInstance); // deprecated
    // this.getTransaction = getTransaction(apiInstance); // deprecated
  }
}
