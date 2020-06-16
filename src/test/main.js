/* eslint-disable */

// import BigNumber from 'bignumber.js';
import { Wallet, Decimal } from '../index';
import TX_TYPE from '../txTypes';

const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', chainId: 'decimal-testnet' });
const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');

(async function test() {
  const txParams = {
    data: {
      sender: wallet.address,
      receiver: wallet.address,
      coin: {
        amount: '10000000000000000000',
        denom: 'tdel',
      },
    },
    feeCoin: 'pivas',
    gas: '200000',
    message: 'message'
  };
  
  const commission = await decimal.estimateTxCommission(TX_TYPE.COIN_SEND, txParams, wallet);
  console.log(commission);

  const testSend = await decimal.sendCoins(txParams, wallet);
}());
