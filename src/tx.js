import { prepareTx, postTx } from './txUtils';
import TX_TYPE from './txTypes';

async function prepareAndPostTx(api, txParams, type, wallet) {
  // eslint-disable-next-line no-param-reassign
  txParams.type = type;
  console.log(`Send transaction: "${txParams.type}"`);

  const tx = await prepareTx(api)(txParams);
  const txResult = await postTx(api)(tx, wallet);

  if (txResult.success) {
    console.log('[SUCCESS] Transaction result: ', txResult);
  } else {
    console.error('[FAIL] Transaction result: ', txResult);
  }
  return txResult;
}


/*
{
  data: {
    sender: 'dx12k95ukkqzjhkm9d94866r4d9fwx7tsd82r8pjd',
    receiver: 'dx12k95ukkqzjhkm9d94866r4d9fwx7tsd82r8pjd',
    coin: 'tDEL',
    amount: '50000000000000',
  },
  gas: '200000',
}
*/
export function sendCoin(api) {
  return async (txParams, wallet) => {
    const txResult = await prepareAndPostTx(api, txParams, TX_TYPE.COIN_SEND, wallet);
    return txResult;
  };
}


/*
{
  data: {
    buyer: 'dx12k95ukkqzjhkm9d94866r4d9fwx7tsd82r8pjd',
    coin_to_buy: 'CRT',
    coin_to_sell: 'tDEL',
    amount_to_buy: '500000',
    amount_to_sell: '100000',
  },
  gas: '200000',
}
*/
export function buyCoin(api) {
  return async (txParams, wallet) => {
    const txResult = await prepareAndPostTx(api, txParams, TX_TYPE.COIN_BUY, wallet);
    return txResult;
  };
}

/*
{
  data: {
    seller: 'dx12k95ukkqzjhkm9d94866r4d9fwx7tsd82r8pjd',
    coin_to_buy: 'CRT',
    coin_to_sell: 'tDEL',
    amount_to_buy: '500000',
    amount_to_sell: '100000',
  },
  gas: '200000',
}
*/
export function sellCoin(api) {
  return async (txParams, wallet) => {
    const txResult = await prepareAndPostTx(api, txParams, TX_TYPE.COIN_SELL, wallet);
    return txResult;
  };
}
export default true;
