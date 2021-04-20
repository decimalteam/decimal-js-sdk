import { signTx, createBroadcastTx } from '@tendermint/sig';
import DecimalNumber from 'decimal.js';
import { setCommission } from './fees';
import TX_TYPE from './txTypes';

DecimalNumber.set({ precision: 40 });
let signMeta = null;

function transactionResult(json) {
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

    return {
      hash: json.txhash,
      success: false,
      error: {
        errorCode: json.code,
        errorMessage,
      },
    };
  }

  if (json.pending) {
      const txResult = {
        hash: json.txhash,
        success: true,
        pending: true,
        error: null,
      };
      console.log(`[PENDING]: https://explorer.decimalchain.com/transactions/${txResult.hash}`);
  }

  const txResult = {
    hash: json.txhash,
    success: true,
    error: null,
  };

  if (txResult.success) {
    console.log(`[SUCCESS]: https://explorer.decimalchain.com/transactions/${txResult.hash}`);
  }

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

export function getSignMeta(api, wallet) {
  return async () => {
    const nodeInfoResp = await api.get('/rpc/node_info');
    const accountResp = await api.get(`/rpc/auth/accounts/${wallet.address}`);

    return {
      account_number: `${accountResp.data.result.value.account_number}`,
      sequence: `${accountResp.data.result.value.sequence}`,
      chain_id: nodeInfoResp.data.node_info.network,
    };
  };
}

export function makeSignature(api, wallet, decimal) {
  return async (tx) => {
    const userSignMeta = decimal.signMeta;

    if (userSignMeta) {
      signMeta = userSignMeta;
    }

    if (true || !signMeta || signMeta.account_number === '0') { // TODO
      signMeta = await getSignMeta(api, wallet)();
    }

    const stdTx = signTx(tx, signMeta, wallet);
    return stdTx;
  };
}

// send signed prepared tx for broadcast
export function postTx(api) {
  return async (broadcastTx, isOfflineTx) => {
    const resp = await api.post('/rpc/txs', broadcastTx);
    const txResult = transactionResult(resp.data);

    if (txResult.success && !isOfflineTx) {
      signMeta.sequence = (+signMeta.sequence + 1).toString();
    }

    return txResult;
  };
}

export function formTx(api, wallet, decimal) {
  return async (type, value, options) => {
    const unsignTx = await prepareTx(api)(type, value, options);
    const signedTx = await makeSignature(api, wallet, decimal)(unsignTx, wallet);

    const mode = options && options.mode ? options.mode : 'sync';

    return createBroadcastTx(signedTx, mode);
  };
}
