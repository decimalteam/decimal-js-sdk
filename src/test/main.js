/* eslint-disable */
import { Wallet, Decimal, TX_TYPE } from '../index';
import TYPE_TX from '../txTypes';
import {data, options} from './data';
import {makeSignature, prepareTx, postTx} from '../txUtils';
import {createBroadcastTx} from '@tendermint/sig';

const signMeta = {
  account_number: "4564",
  chain_id: "decimal-devnet-07-22-19-00",
  sequence: "219"
}
const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');
const decimal = new Decimal({ baseURL: 'https://devnet-gate.decimalchain.com/api/', wallet, signMeta });



(async function test() {
  // setInterval(async () => {
    console.log(decimal);
    const res = await decimal.getMeta();
    console.log(res);
  // }, 5000)
}());