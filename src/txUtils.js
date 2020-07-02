/* eslint-disable */
import { signTx, createBroadcastTx } from '@tendermint/sig';
import getCommission from './fees';
import TX_TYPE from './txTypes';


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

  const txResult = {
    hash: json.txhash,
    success: true,
    error: null,
  };

  if (txResult.success) {
    console.log(`[SUCCESS]: https://explorer.decimalchain.com/transactions/${txResult.hash}`);
  } else {
    console.log(`[FAIL]: https://explorer.decimalchain.com/transactions/${txResult.hash}`);
  }

  return txResult;
}

export function prepareTx(api) {
  return async (type, value, options) => {
    const tx = {
      msg: [{ type, value }],
      fee: {
        amount: [],
        gas: options.gas || '9000000000000000000',
      },
      memo: options.message || '',
    };

    if (!options.feeCoin ||
        type === TX_TYPE.COIN_REDEEM_CHECK) {
      return tx;
    }

    tx.fee.amount = [{
      denom: options.feeCoin,
      amount: ''
    }]
    const fee = await getCommission(api)(tx);
    tx.fee.amount[0].amount = fee;

    return tx
  }
}

export function makeSignature(api, wallet) {
  return async (tx) => {
    console.log(wallet);
    const nodeInfoResp = await api.get('/rpc/node_info');
    const accountResp = await api.get(`/rpc/auth/accounts/${wallet.address}`);

    const signMeta = {
      account_number: `${accountResp.data.result.value.account_number}`,
      sequence: `${accountResp.data.result.value.sequence}`,
      chain_id: nodeInfoResp.data.node_info.network,
    };

    const stdTx = signTx(tx, signMeta, wallet);
    return stdTx;
  };
}

// send signed prepared tx for broadcast
export function postTx(api) {
  return async (broadcastTx) => {
    const resp = await api.post('/rpc/txs', broadcastTx);
    return transactionResult(resp.data);
  };
}

export function formTx(api, wallet) {
  return async (type, value, options) => {
    const unsignTx = await prepareTx(api)(type, value, options);
    const signTx = await makeSignature(api, wallet)(unsignTx, wallet);
    return createBroadcastTx(signTx);
  }
}
