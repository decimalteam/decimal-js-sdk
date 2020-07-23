/* eslint-disable */
import { Wallet, Decimal, TX_TYPE } from '../index';
import TYPE_TX from '../txTypes';
import {data, options} from './data';
import {makeSignature, prepareTx, postTx} from '../txUtils';
import {createBroadcastTx} from '@tendermint/sig';

const signMeta = {
  account_number: "4564",
  chain_id: "decimal-devnet-07-22-19-00",
  sequence: "235"
}
const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');
const decimal = new Decimal({ baseURL: 'https://devnet-gate.decimalchain.com/api/', wallet, signMeta });



(async function test() {
  // setInterval(async () => {
    console.log(decimal);
    const res = await decimal.getTransaction(TX_TYPE.COIN_SEND, data.send);
    // const res2 = await decimal.postTx(res);
    console.log(JSON.stringify(res));
  // }, 5000)
}());