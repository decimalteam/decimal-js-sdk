/* eslint-disable */
import { Wallet, Decimal } from '../index';

const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', chainId: 'decimal-testnet' });
const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');


(async function test() {
  const res = await decimal._sendCoins({to: wallet.address, coin: 'tdel', amount: '111'}, {feeCoin: 'coin1'}, wallet);
  console.log(res);
}());
