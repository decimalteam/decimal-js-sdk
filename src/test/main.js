/* eslint-disable */

import { Wallet, Decimal } from '../index';

const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', chainId: 'decimal-testnet' });
const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');

const txParams = {
  data: {
    sender: wallet.address,
    wallet: 'dx1ahmk668eh8nrt727p23529xr5e4zez5ecxp7ws',
    receiver: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
    coins: [
      {
        denom: 'tdel',
        amount: '50000000',
      },
    ]
  },
  gas: '200000',
  message: 'message',
};


(async function test() {
  console.log(wallet.address);
  const check = await decimal.issueCheck({
    chain_id: 'decimal-testnet-06-08-15-00',
    coin: 'tdel',
    amount: 7000000000000000000,
    nonce: 1,
    due_block: 500000,
    passphrase: '1234567890',
  }, wallet);
  console.log(check)
  // const test = await decimal.multisigCreateTx(txParams, wallet);

  // console.log(test);
}());
