/* eslint-disable */

// import BigNumber from 'bignumber.js';
import { Wallet, Decimal } from '../index';
import TX_TYPE from '../txTypes';

const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', chainId: 'decimal-testnet' });
const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');
const wallet2 = new Wallet('response donate ethics dust twelve door salon wrist goddess strong era develop nice undo urge love idea gown night copy salad belt moon kite');

(async function test() {
  const check = await decimal.issueCheck({
    coin: 'tdel',
    amount: 10000000000000000000,
    nonce: 7,
    due_block: 500000,
    passphrase: '1234567890',
  }, wallet);
  console.log(`Issued check: ${check}`);

  const txParams = {
    data: {
      sender: wallet2.address,
      check: check,
      proof: '1234567890',
    },
    feeCoin: '',
    gas: '9000000000000000000',
    message: 'message',
  };

  const test = await decimal.redeemCheck(txParams, wallet2);
  console.log(test);
}());
