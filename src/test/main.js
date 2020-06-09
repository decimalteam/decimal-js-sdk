/* eslint-disable */

import { Wallet, Decimal } from '../index';

const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', chainId: 'decimal-testnet' });
const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');

const txParams = {
  data: {
    sender: wallet.address,
    check: '',
    passphrase: '',
  },
  gas: '200000',
  message: 'message',
};


(async function test() {
  console.log(wallet.address);
  const check = await decimal.issueCheck({
    coin: 'tdel',
    amount: 7000000000000000000,
    nonce: 33,
    due_block: 500000,
    passphrase: '1234567890',
  }, wallet);
  
  console.log(`Issued check: ${check}`);
  
  const txParams = {
    data: {
      sender: wallet.address,
      check: check,
      proof: '1234567890',
    },
    gas: '200000',
    message: 'message',
  };

  const test = await decimal.redeemCheck(txParams, wallet);
  console.log(test);


  // const test = await decimal.getMultisigTxs('dx1we37ct0je698nc3rv269zvjnjng40axwpna58y');
  // console.log(test);
}());
