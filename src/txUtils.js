/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import { signTx, createBroadcastTx, createSignMsg } from '@tendermint/sig';
import DecimalNumber from 'decimal.js';
import { bytesToBase64 } from '@tendermint/belt';
import secp256k1 from 'secp256k1';
import { setCommission } from './fees';
import TX_TYPE from './txTypes';
import ACCOUNT_INFO_MODES from './accountInfoModes';
import TX_BROADCAST_MODES from './txBroadcastModes';
import { isNonceSetAutomatically, updateNonce } from './utils';
import { MASTER_DERIVATION_PATH_ARRAY } from './wallet';

const sortobject = require('deep-sort-object');

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
// eslint-disable-next-line no-unused-vars
export function makeLedgerMsgSignature(api, wallet, decimal, options) {
  return async (data) => {
    // const userSignMeta = decimal.signMeta;
    // if (userSignMeta) {
    //   signMeta = userSignMeta;
    // }
    // signMeta = await getSignMeta(api, wallet, options)();
    const path = MASTER_DERIVATION_PATH_ARRAY;
    path[path.length - 1] = wallet.id;
    const StdSignMsg = {
      ...signMeta,
      account_number: '',
      sequence: '',
      chain_id: '',
      fee: {
        amount: 0,
        gas: 0,
      },
      memo: '',
      msgs: [data],
    };
    const signatureBuffer = await wallet.nanoApp.sign(path, JSON.stringify(sortobject(StdSignMsg)));
    return signatureBuffer;
  };
}
export function makeLedgerSignature(api, wallet, decimal, options) {
  return async (tx) => {
    const userSignMeta = decimal.signMeta;
    if (userSignMeta) {
      signMeta = userSignMeta;
    }
    console.log('makeLedgerSignature: ', wallet);
    signMeta = await getSignMeta(api, wallet, options)();
    const path = MASTER_DERIVATION_PATH_ARRAY;
    path[path.length - 1] = wallet.id;
    console.log(path);
    const { publicKey } = wallet;
    const signMsg = sortobject(createSignMsg(tx, signMeta));
    const signatureBuffer = await wallet.nanoApp.sign(path, JSON.stringify(signMsg));
    const signature = bytesToBase64(secp256k1.signatureImport(signatureBuffer.signature));
    const signatures = [
      {
        signature,
        pub_key: {
          type: 'tendermint/PubKeySecp256k1',
          value: bytesToBase64(publicKey),
        },
      },
    ];
    const stdTx = {
      ...tx,
      signatures,
    };
    return stdTx;
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
    let signedTx;
    if (wallet.transport) {
      signedTx = await makeLedgerSignature(api, wallet, decimal, options)(unsignTx, wallet);
    } else {
      signedTx = await makeSignature(api, wallet, decimal, options)(unsignTx, wallet);
    }
    const mode = (options && options.txBroadcastMode) || TX_BROADCAST_MODES.SYNC;

    return createBroadcastTx(signedTx, mode);
  };
}
