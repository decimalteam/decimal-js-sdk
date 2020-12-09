/* eslint-disable */
import { Wallet, Decimal, TX_TYPE } from '../index';
import TYPE_TX from '../txTypes';
import {data, options} from './data';
import {makeSignature, prepareTx, postTx} from '../txUtils';
import {createBroadcastTx} from '@tendermint/sig';
import { getTransaction } from '../tx';

// const signMeta = {
//   account_number: "4564",
//   chain_id: "decimal-devnet-07-22-19-00",
//   sequence: "236"
// }
const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');
const decimal = new Decimal({ baseURL: 'https://devnet-gate.decimalchain.com/api/', wallet });

console.log(wallet);

(async function test() {
  const test = await decimal.sendCoins(data.send, options);
  console.log(test);
}());