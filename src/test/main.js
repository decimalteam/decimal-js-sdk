/* eslint-disable */
import { Wallet, Decimal, TX_TYPE } from '../index';
import TYPE_TX from '../txTypes';
import {data, options} from './data';


const signMeta = {
  account_number: "10",
  chain_id: "decimal-testnet-06-30-15-30",
  sequence: "198"
}
const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');
const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', wallet });


(async function test() {
  const res = await decimal.sendCoins(data.send, options);
  console.log(res);
}());
