/* eslint-disable */

import { Wallet, Decimal } from '../index';

const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', chainId: 'decimal-testnet' });
const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');


const txParams = {
  data: {
    sender: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
    owners: ['dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g', 'dx1vcsnqezhtnyur8vanxhhhdsj3y3t4yzum9a865'],
    weights: ['1', '1'],
    threshold: '2',
  },
  gas: '200000',
  message: 'message',
};

(async function test() {
  const test = await decimal.multisigCreateWallet(txParams, wallet);
  console.log(test);
}());
