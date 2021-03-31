/* eslint-disable */
import { Wallet, Decimal, TX_TYPE } from '../index';
import TYPE_TX from '../txTypes';
import {data, options} from './data';
import {makeSignature, prepareTx, postTx} from '../txUtils';
import {createBroadcastTx} from '@tendermint/sig';
import { getTransaction } from '../tx';

const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');
const decimal = new Decimal({ baseURL: 'https://devnet-gate.decimalchain.com/api/', wallet });

(async function test() {
  const meta = await decimal.getMeta();
  //const failedTx = await decimal.sendCoins(data.send, options)
  console.log(111111111111111,meta)
}());