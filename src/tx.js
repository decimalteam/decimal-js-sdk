import { prepareTx, postTx } from './txUtils';

export function sendCoin(api) {
  return async (txParams, wallet) => {
    const tx = await prepareTx(api)(txParams);
    const txResult = await postTx(api)(tx, wallet);

    return txResult;
  };
}

export default true;
