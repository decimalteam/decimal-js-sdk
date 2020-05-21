import { signTx } from '@tendermint/sig';


function transactionResult(json) {
  if (json.code) {
    const rawLogAsString = json.raw_log.toString();
    let errorMessage = '';

    if (rawLogAsString[0] === '{' && rawLogAsString.message) {
      errorMessage = rawLogAsString.message;
    } else {
      errorMessage = rawLogAsString;
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

  return {
    hash: json.txhash,
    success: true,
    error: null,
  };
}

export function prepareTx() {
  return async (txParams) => {
    if (!txParams) {
      throw new Error('Tx params is required');
    }

    const { type, data, gas } = txParams;

    const tx = {
      msg: [{ type, value: data }],
      fee: {
        amount: [],
        gas,
      },
      memo: '',
    };

    return tx;
  };
}

export function makeSignature(api) {
  return async (tx, wallet) => {
    const nodeInfoResp = await api.get('/node_info');
    const accountResp = await api.get(`/auth/accounts/${wallet.address}`);

    const signMeta = {
      account_number: `${accountResp.data.result.value.account_number}`,
      sequence: `${accountResp.data.result.value.sequence}`,
      chain_id: nodeInfoResp.data.node_info.network,
    };
    const stdTx = signTx(tx, signMeta, wallet);

    return stdTx;
  };
}

export function postTx(api) {
  return async (tx, wallet) => {
    let _tx = tx;

    if (!_tx.signatures) {
      if (wallet) {
        _tx = await makeSignature(api)(tx, wallet);
      } else {
        throw new Error('The transaction is not signed and the wallet is not provided');
      }
    }

    const resp = await api.post('/txs', JSON.stringify({ tx: _tx, mode: 'sync' }));
    return transactionResult(resp.data);
  };
}

export default true;
