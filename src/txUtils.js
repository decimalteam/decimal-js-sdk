/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import { signTx, createBroadcastTx } from '@tendermint/sig';
import DecimalNumber from 'decimal.js';
import { setCommission } from './fees';
import TX_TYPE from './txTypes';
import ACCOUNT_INFO_MODES from './accountInfoModes';
import TX_BROADCAST_MODES from './txBroadcastModes';
import { isNonceSetAutomatically, updateNonce } from './utils';

DecimalNumber.set({ precision: 40 });
let signMeta = null;

/*
  response = {
    hash: string,
    height: string,
    success: boolean,
    pending: boolean,
    error: {
      errorCode: string,
      errorMessage: string,
    },
  }
*/

function processTxResponse(json, wallet) {
  let errorMessage = null;

  // !IF ERROR
  if (json.code && json.raw_log) {
    const rawLogAsString = json.raw_log.toString();
    errorMessage = rawLogAsString[0] === '{' && rawLogAsString.message
      ? rawLogAsString.message
      : rawLogAsString;
  }
  // !IF ERROR

  const txResult = {
    hash: json.txhash,
    height: json.height,
    success: !json.code,
    pending: json.pending,
    error: json.code ? {
      errorCode: json.code,
      errorMessage,
    } : null,
  };

  json.code ? console.error(`[ERROR]: https://explorer.decimalchain.com/transactions/${txResult.hash}`)
    : json.pending ? console.warn(`[PENDING]: https://explorer.decimalchain.com/transactions/${txResult.hash}`)
      : console.info(`[SUCCESS]: https://explorer.decimalchain.com/transactions/${txResult.hash}`);

  // setting the current nonce in wallet if set nonce automatically is enabled
  Boolean(wallet.currentNonce) && updateNonce(wallet, json.code ? null : +wallet.currentNonce + 1);

  return txResult;
}

export function prepareTx(api) {
  return async (type, value, options) => {
    const tx = {
      msg: [{ type, value }],
      fee: {
        amount: [],
        gas: '0',
      },
      memo: options && options.message ? options.message : '',
    };

    if (!options
      || !options.feeCoin
      || type === TX_TYPE.COIN_REDEEM_CHECK) {
      return tx;
    }

    const txWithCustomCoinFee = await setCommission(api)(tx, options.feeCoin);
    return txWithCustomCoinFee;
  };
}

export function getSignMeta(api, wallet, options) {
  return async () => {
    const nodeInfoResp = await api.getNodeInfo();

    let accountResp = null;

    if (options && options.accountInfoMode) {
      switch (options.accountInfoMode) {
        case ACCOUNT_INFO_MODES.BLOCKCHAIN: {
          accountResp = await api.requestAccountSequence(wallet.address, false);
          break;
        }
        case ACCOUNT_INFO_MODES.BLOCKCHAIN_WITH_MEMPOOL: {
          accountResp = await api.requestAccountSequenceWithUnconfirmedTxes(wallet.address);
          break;
        }
        default: {
          accountResp = await api.requestAccountSequence(wallet.address, true);
          break;
        }
      }
    } else {
      accountResp = await api.requestAccountSequence(wallet.address, true);
    }

    const accountNumber = accountResp && accountResp.value && accountResp.value.account_number;

    const sequence = accountResp && accountResp.value && accountResp.value.sequence;

    const chainId = nodeInfoResp && nodeInfoResp.data && nodeInfoResp.data.node_info && nodeInfoResp.data.node_info.network;

    const nonce = isNonceSetAutomatically(wallet, options) ? wallet.currentNonce : (options && options.nonce) || sequence;

    // setting the current nonce in wallet if set nonce automatically is enabled
    options.setNonceAutomatically && updateNonce(wallet, nonce);

    console.info(`[SIGN-TX-META][ACCOUNT-NUMBER][${accountNumber}][SEQUENCE][${sequence}][CHAIN-ID][${chainId}]`);

    return {
      account_number: `${accountNumber || 0}`,
      sequence: `${nonce || 0}`,
      chain_id: `${chainId || 0}`,
    };
  };
}

export function makeSignature(api, wallet, decimal, options) {
  return async (tx) => {
    const userSignMeta = decimal.signMeta;

    if (userSignMeta) {
      signMeta = userSignMeta;
    }

    signMeta = await getSignMeta(api, wallet, options)();

    const stdTx = signTx(tx, signMeta, wallet);
    return stdTx;
  };
}

// send signed prepared tx for broadcast
export function postTx(api, wallet) {
  return async (txData) => {
    const txResponse = await api.broadcastTx(txData);

    const formattedTxResponse = processTxResponse(txResponse, wallet);

    return formattedTxResponse;
  };
}

export function formTx(api, wallet, decimal) {
  return async (type, value, options) => {
    const unsignTx = await prepareTx(api)(type, value, options);

    const signedTx = await makeSignature(api, wallet, decimal, options)(unsignTx, wallet);

    const mode = (options && options.txBroadcastMode) || TX_BROADCAST_MODES.SYNC;

    return createBroadcastTx(signedTx, mode);
  };
}
