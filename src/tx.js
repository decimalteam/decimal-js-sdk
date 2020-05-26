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
    sender: 'dx1twxl6ajpzur08mscql5z56r2n7eyurpy5q0hnp',
    receiver: 'dx12k95ukkqzjhkm9d94866r4d9fwx7tsd82r8pjd',
    coin: 'tDEL',
    amount: '50000000000000',
  },
  gas: '200000',
}
*/
export function sendCoins(api) {
  return async (txParams, wallet) => {
    const txResult = await prepareAndPostTx(api, txParams, TX_TYPE.COIN_SEND, wallet);
    return txResult;
  };
}


/*
{
  data: {
    buyer: 'dx1twxl6ajpzur08mscql5z56r2n7eyurpy5q0hnp',
    coin_to_buy: 'CRT',
    coin_to_sell: 'tDEL',
    amount_to_buy: '500000',
    amount_to_sell: '100000',
  },
  gas: '200000',
}
*/
export function buyCoins(api) {
  return async (txParams, wallet) => {
    const txResult = await prepareAndPostTx(api, txParams, TX_TYPE.COIN_BUY, wallet);
    return txResult;
  };
}

/*
{
  data: {
    seller: 'dx1twxl6ajpzur08mscql5z56r2n7eyurpy5q0hnp',
    coin_to_buy: 'CRT',
    coin_to_sell: 'tDEL',
    amount_to_buy: '500000',
    amount_to_sell: '100000',
  },
  gas: '200000',
}
*/
export function sellCoins(api) {
  return async (txParams, wallet) => {
    const txResult = await prepareAndPostTx(api, txParams, TX_TYPE.COIN_SELL, wallet);
    return txResult;
  };
}

/*
{
  data: {
    seller: 'dx1twxl6ajpzur08mscql5z56r2n7eyurpy5q0hnp',
    coin_to_sell: 'tDEL',
    coin_to_buy: 'CRT',
    amount_to_buy: '500',
  },
  gas: '200000',
}
*/

export function sellAllCoins(api) {
  return async (txParams, wallet) => {
    const txResult = await prepareAndPostTx(api, txParams, TX_TYPE.COIN_SELL_ALL, wallet);
    return txResult;
  };
}


/*
{
  data: {
    creator: 'dx1twxl6ajpzur08mscql5z56r2n7eyurpy5q0hnp',
    title: 'Test coin',
    symbol: 'TST',
    constant_reserve_ratio: '45',
    initial_volume: '1000000000000000000',
    initial_reserve: '1000000000000000000000',
    limit_volume: '1000000000000000000000000000',
  },
  gas: '200000',
}
*/
export function createCoin(api) {
  return async (txParams, wallet) => {
    const txResult = await prepareAndPostTx(api, txParams, TX_TYPE.COIN_CREATE, wallet);
    return txResult;
  };
}


export default true;
