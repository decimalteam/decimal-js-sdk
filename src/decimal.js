import DecimalApi from './api/index';
import getCoinslist from './api/get-coins-list';
import getCoin from './api/get-coin';
import getAddress from './api/get-address';
import getNonce from './api/get-nonce';
import getMultisigsByAddress from './api/get-multisigs';
import getMultisig from './api/get-multisig';
import getMultisigTxs from './api/get-txs-multisig';
import getStakesByAddress from './api/get-stakes';
import getNftStakesByAddress from './api/get-nft-stakes';
import getValidator from './api/get-validator';
import getMyTransactions from './api/get-my-transactions';
import getVotesInfo from './api/votes';
import getMyCoins from './api/get-my-coins';
import getNft from './api/get-nft';
import getNfts from './api/get-nfts';
import getNftTxes from './api/get-nft-txes';
import getNftsTxes from './api/get-nfts-txes';
import updateAddressBlockingData from './api/update-address-blocking-data';
import getBlockedAddresses from './api/get-blocked-addresses';
import getTransactionByHash from './api/get-transaction-by-hash';

import { verifyAddress } from './utils';

import TX_TYPE from './txTypes';
import { validateNetwork } from './network';
import {
  prepareTx,
  makeSignature,
  postTx,
  getSignMeta, makeLedgerSignature, makeLedgerMsgSignature,
} from './txUtils';

import { issueCheck } from './check';
import { getTransaction, sendTransaction, estimateTxFee } from './tx';

export default class Decimal {
  constructor(options) {
    const apiInstance = new DecimalApi(options);
    const { wallet } = options;
    const { signMeta } = options;
    this.signMeta = signMeta;
    this.network = validateNetwork(options.network);

    // api
    this.getCoinsList = getCoinslist(apiInstance);
    this.getCoin = getCoin(apiInstance);
    this.getAddress = getAddress(apiInstance, wallet);
    this.getNonce = getNonce(apiInstance);
    this.getMultisigsByAddress = getMultisigsByAddress(apiInstance);
    this.getMultisig = getMultisig(apiInstance);
    this.getMultisigTxs = getMultisigTxs(apiInstance);
    this.getNft = getNft(apiInstance, wallet);
    this.getNfts = getNfts(apiInstance, wallet);
    this.getNftTxes = getNftTxes(apiInstance, wallet);
    this.getNftsTxes = getNftsTxes(apiInstance, wallet);
    this.updateAddressBlockingData = updateAddressBlockingData(apiInstance, wallet);
    this.getBlockedAddresses = getBlockedAddresses(apiInstance, wallet);
    this.getStakesByAddress = getStakesByAddress(apiInstance);
    this.getNftStakesByAddress = getNftStakesByAddress(apiInstance, wallet);
    this.getValidator = getValidator(apiInstance);
    this.getMeta = getSignMeta(apiInstance, wallet);
    this.getMyTransactions = getMyTransactions(apiInstance, wallet);
    this.getMyCoins = getMyCoins(apiInstance, wallet);
    this.getVotesInfo = getVotesInfo(apiInstance);

    // utils functions
    this.verifyAddress = verifyAddress;

    // tx utils
    this.prepareTx = prepareTx(apiInstance);
    this.makeSignature = makeSignature(apiInstance, wallet, this);
    this.makeLedgerSignature = makeLedgerSignature(apiInstance, wallet, this);
    this.makeLedgerMsgSignature = makeLedgerMsgSignature(apiInstance, wallet, this);
    this.postTx = postTx(apiInstance, wallet);
    this.getTransaction = getTransaction(apiInstance, wallet, this);
    this.getTransactionByHash = getTransactionByHash(apiInstance, wallet, this);

    // get fee
    this.estimateTxFee = estimateTxFee(apiInstance, wallet, this);

    // tx methods
    this.sendCoins = sendTransaction(TX_TYPE.COIN_SEND, apiInstance, wallet, this);
    this.burnCoins = sendTransaction(TX_TYPE.COIN_BURN, apiInstance, wallet, this);
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
    this.updateCoin = sendTransaction(TX_TYPE.COIN_UPDATE, apiInstance, wallet, this);

    this.issueCheck = issueCheck(apiInstance, wallet, this);
    this.redeemCheck = sendTransaction(TX_TYPE.COIN_REDEEM_CHECK, apiInstance, wallet, this);

    this.multisigCreateWallet = sendTransaction(TX_TYPE.MULTISIG_CREATE_WALLET, apiInstance, wallet, this);
    this.multisigCreateTx = sendTransaction(TX_TYPE.MULTISIG_CREATE_TX, apiInstance, wallet, this);
    this.multisigSignTx = sendTransaction(TX_TYPE.MULTISIG_SIGN_TX, apiInstance, wallet, this);

    this.proposalSubmit = sendTransaction(TX_TYPE.PROPOSAL_SUBMIT, apiInstance, wallet, this);
    this.proposalVote = sendTransaction(TX_TYPE.PROPOSAL_VOTE, apiInstance, wallet, this);

    this.msgSwapInit = sendTransaction(TX_TYPE.SWAP_INIT, apiInstance, wallet, this);
    this.msgSwapRedeem = sendTransaction(TX_TYPE.SWAP_REDEEM, apiInstance, wallet, this);
    this.nftMint = sendTransaction(TX_TYPE.NFT_MINT, apiInstance, wallet, this);
    this.nftBurn = sendTransaction(TX_TYPE.NFT_BURN, apiInstance, wallet, this);
    this.nftEditMetadata = sendTransaction(TX_TYPE.NFT_EDIT_METADATA, apiInstance, wallet, this);
    this.nftTransfer = sendTransaction(TX_TYPE.NFT_TRANSFER, apiInstance, wallet, this);
    this.nftDelegate = sendTransaction(TX_TYPE.NFT_DELEGATE, apiInstance, wallet, this);
    this.nftUnbond = sendTransaction(TX_TYPE.NFT_UNBOND, apiInstance, wallet, this);
    this.nftUpdateReserve = sendTransaction(TX_TYPE.NFT_UPDATE_RESERVE, apiInstance, wallet, this);
  }
}
