/*eslint-disable*/
import DecimalNumber from 'decimal.js-light';
import TX_TYPE from './txTypes';
import { validateTxData } from './validator';
import { formAndSendTx } from './txUtils';

function getUNI(amount){
  return new DecimalNumber(amount).times(new DecimalNumber(10).pow(18)).toFixed();
}

export function sendCoins(api) {
  return async (data, options, wallet) => {
    validateTxData(data, TX_TYPE.COIN_SEND);

    const value = {
      sender: wallet.address,
      receiver: data.to,
      coin: {
        amount: getUNI(data.amount),
        denom: data.coin.toLowerCase(),
      },
    };

    const txResult = await formAndSendTx(api)(TX_TYPE.COIN_SEND, value, options, wallet);
    return txResult;
  };
}


export default true;
