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
  const fee = await decimal.estimateTxFee(TX_TYPE.COIN_MULTISEND, data.multisend, options);
  console.log(fee);
  const test = await decimal.multisendCoins(data.multisend, options);
  console.log(test);
}());
