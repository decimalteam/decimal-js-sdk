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
const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', wallet });


(async function test() {
  // const check = {
  //   check: 'ERp9FR24Vz19XGXddnESNVBhTKxh8Q3G2c3VkW8Y6Dj4CFEEb1BhA33718EHKvm3ZcqsubDtHC8ZDWV2AYu9KQ4S1WFbVuQ2XNQCxK9njU4pzHWqtsZHTG3pQZx3u2SrkgYmiprZj7gyYSFv3ow7Z5dXpcyzZsiz5oF9xF73XHqML5MZMmwPiXTp7T1viQkzFfuxdacrkjzgkPoBysHKJJgYH5V9kVcjjEcmk57bgGAfNwmMvhodMcwRwGAme',
  //   password: '123123',
  // }

  const test = await decimal.sendCoins(data.send, options);
  console.log(test);
}());