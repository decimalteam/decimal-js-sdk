/* eslint-disable */

// import BigNumber from 'bignumber.js';
import { Wallet, Decimal } from '../index';
import TX_TYPE from '../txTypes';

const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', chainId: 'decimal-testnet' });
const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');


(async function test() {
  // const check = await decimal.issueCheck({
  //   coin: 'tdel',
  //   amount: 7000000000000,
  //   nonce: 47,
  //   due_block: 500000,
  //   passphrase: '1234567890',
  // }, wallet);
  // console.log(`Issued check: ${check}`);

  // const txParams = {
  //   data: {
  //     sender: wallet.address,
  //     check: check,
  //     proof: '1234567890',
  //   },
  //   feeCoin: '',
  //   gas: '1000000000000000000000000000',
  //   message: 'message',
  // };

  // const test = await decimal.redeemCheck(txParams, wallet);
  // console.log(test);
  const txParams = {
    data: {
      sender: wallet.address,
      receiver: wallet.address,
      coin: {
        amount: '50000000000000000000',
        denom: 'tdel',
      },
    },
    gas: '200000',
    message: '11111111111'
  };

  await decimal.sendCoins(txParams, wallet);
}());
