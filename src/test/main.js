/* eslint-disable */

// import BigNumber from 'bignumber.js';
import { Wallet, Decimal } from '../index';
import TX_TYPE from '../txTypes';

const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', chainId: 'decimal-testnet' });
// const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');


(async function test() {
  const validator = await decimal.getValidator('dxvaloper1j3j2mwxnvlmsu2tkwm415390vq8v337w3gskap');
  console.log(validator);
}());
