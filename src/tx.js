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


export function sendCoins(api) {
  return async (txParams, wallet) => {
    const txResult = await prepareAndPostTx(api, txParams, TX_TYPE.COIN_SEND, wallet);
    return txResult;
  };
}


export function buyCoins(api) {
  return async (txParams, wallet) => {
    const txResult = await prepareAndPostTx(api, txParams, TX_TYPE.COIN_BUY, wallet);
    return txResult;
  };
}


export function sellCoins(api) {
  return async (txParams, wallet) => {
    const txResult = await prepareAndPostTx(api, txParams, TX_TYPE.COIN_SELL, wallet);
    return txResult;
  };
}


export function sellAllCoins(api) {
  return async (txParams, wallet) => {
    const txResult = await prepareAndPostTx(api, txParams, TX_TYPE.COIN_SELL_ALL, wallet);
    return txResult;
  };
}


export function createCoin(api) {
  return async (txParams, wallet) => {
    const txResult = await prepareAndPostTx(api, txParams, TX_TYPE.COIN_CREATE, wallet);
    return txResult;
  };
}


export default true;
