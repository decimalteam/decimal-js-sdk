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
      title: 'Test coin',
      symbol: 'q11',
      constant_reserve_ratio: '45',
      initial_volume: '1000000000000000000',
      initial_reserve: '10000000000000000000000',
      limit_volume: '1000000000000000000000000000',
    },
    feeCoin: 'fake',
    gas: '9223372036854775800',
    message: 'message'
  }
  
  // decimal.createCoin(txParams, wallet);
  
  const commission = await decimal.estimateTxCommission(TX_TYPE.COIN_CREATE, txParams, wallet);
  console.log(commission);

  const testSend = await decimal.createCoin(txParams, wallet);
}());
