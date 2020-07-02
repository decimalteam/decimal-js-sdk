/* eslint-disable */
import { Wallet, Decimal, TX_TYPE } from '../index';
import TYPE_TX from '../txTypes';
import {data, options} from './data';

const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');
const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', wallet});


(async function test() {
  // const fee = await decimal.estimateTxFee(TX_TYPE.COIN_BUY, data.buy, options, wallet);
  // console.log('fee', fee);
  

  const tx = await decimal.getTransaction(TX_TYPE.COIN_SELL_ALL, data.sellAll, options, wallet);
  const txResult = await decimal.postTx(tx);
  console.log(txResult);
}());
