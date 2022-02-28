import { signTx, createBroadcastTx } from '@tendermint/sig';
import DecimalNumber from 'decimal.js';
import { setCommission } from './fees';
import TX_TYPE from './txTypes';
import ACCOUNT_INFO_MODES from './accountInfoModes';
import TX_BROADCAST_MODES from './txBroadcastModes';

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

function transactionResult(json) {
  // !IF ERROR
  if (json.code) {
    let errorMessage = '';
    if (json.raw_log) {
      const rawLogAsString = json.raw_log.toString();
      if (rawLogAsString[0] === '{' && rawLogAsString.message) {
        errorMessage = rawLogAsString.message;
      } else {
        errorMessage = rawLogAsString;
      }
    }

    const txResult = {
      hash: json.txhash,
      height: json.height,
      success: false,
      pending: false,
      error: {
        errorCode: json.code,
        errorMessage,
      },
    };

    console.error(`[ERROR]: https://explorer.decimalchain.com/transactions/${txResult.hash}`);

    return txResult;
  }
  // !IF ERROR

  // !IF PENDING <- OLD VERSION
  if (json.pending) {
    const txResult = {
      hash: json.txhash,
      height: json.height,
      success: true,
      pending: true,
      error: null,
    };

    console.warn(`[PENDING]: https://explorer.decimalchain.com/transactions/${txResult.hash}`);

    return txResult;
  }
  // !IF PENDING <- OLD VERSION

  // !FINAL RESPONSE
  const txResult = {
    hash: json.txhash,
    height: json.height,
    success: true,
    pending: false,
    error: null,
  };
  // !FINAL RESPONSE

  // !IF SUCCESS
  if (txResult.success) {
    console.info(`[SUCCESS]: https://explorer.decimalchain.com/transactions/${txResult.hash}`);
  }
  // !IF SUCCESS

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
        case ACCOUNT_INFO_MODES.BLOCKCHAIN_WITH_AUTOINCREMENT: {
          accountResp = await api.requestAccountSequence(wallet.address, true);
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

    const sequence = accountResp && accountResp.value.sequence;

    const chainId = nodeInfoResp && nodeInfoResp.data && nodeInfoResp.data.node_info && nodeInfoResp.data.node_info.network;

    console.info(`[SIGN-TX-META][ACCOUNT-NUMBER][${accountNumber}][SEQUENCE][${sequence}][CHAIN-ID][${chainId}]`);

    return {
      account_number: `${accountNumber || 0}`,
      sequence: `${(options && options.nonce) || sequence}`,
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

    // if (true || !signMeta || signMeta.account_number === '0') { // TODO: update condition
    signMeta = await getSignMeta(api, wallet, options)();
    // } // TODO: update condition

    console.info({ tx, signMeta, wallet });

    const stdTx = signTx(tx, signMeta, wallet);
    return stdTx;
  };
}

// send signed prepared tx for broadcast
export function postTx(api) {
  return async (txData, options) => {
    const data = await api.broadcastTx(txData, options);

    console.info({ sendTxResult: data });

    // TODO: EXTEND
    const txResult = transactionResult(data);

    // if (txResult.success && !isOfflineTx) {
    //   signMeta.sequence = (+signMeta.sequence + 1).toString();
    // }

    return txResult;
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
