/* eslint-disable no-param-reassign */
import { signTx } from '@tendermint/sig';
import getCommission from './fees';
// import Validator from './validator';


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
  return async (txParams) => {
    if (!txParams) {
      throw new Error('Tx params is required');
    }

    const {
      type, data, gas, message, feeCoin,
    } = txParams;

    const tx = {
      msg: [{ type, value: data }],
      fee: {
        amount: [],
        gas,
      },
      memo: message || '',
    };

    if (feeCoin) {
      tx.fee.amount.push({
        denom: feeCoin,
        amount: await getCommission(api)(tx, feeCoin),
      });
    }

    return tx;
  };
}

export function makeSignature(api) {
  return async (tx, wallet) => {
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

export function postTx(api, txType) {
  return async (txValue, wallet) => {
    if (txType) {
      txValue.type = txType;
      txValue = await prepareTx(api)(txValue);
    }

    if (!txValue.signatures) {
      if (wallet) {
        txValue = await makeSignature(api)(txValue, wallet);
      } else {
        throw new Error('The transaction is not signed and the wallet is not provided');
      }
    }


    const tx = {
      tx: txValue,
      mode: 'sync',
    };

    console.log(`[SEND TX]: ${txValue.msg[0].type}`);

    const resp = await api.post('/rpc/txs', tx);
    return transactionResult(resp.data);
  };
}
