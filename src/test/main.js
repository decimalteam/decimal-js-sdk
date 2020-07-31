/* eslint-disable */
import { Wallet, Decimal, TX_TYPE } from '../index';
import TYPE_TX from '../txTypes';
import {data, options} from './data';
import {makeSignature, prepareTx, postTx} from '../txUtils';
import {createBroadcastTx} from '@tendermint/sig';
import { getTransaction } from '../tx';

const signMeta = {
  account_number: "4564",
  chain_id: "decimal-devnet-07-22-19-00",
  sequence: "236"
}
const wallet = new Wallet('hollow luggage slice soup leg vague icon walnut session candy improve struggle');
const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', wallet });



(async function test() {

  const test = await decimal.getMyTransactions();
  document.write(JSON.stringify(test));

  /*
  {
    mode: "sync"
    tx: {
      fee: {amount: Array(0), gas: "9000000000000000000"},
      memo: "sdk test",
      msg: [{…}],
      signatures: [{…}]
    }
  }
  */

  // setInterval(async () => {
    // const estimatedFee = await decimal.estimateTxFee(TX_TYPE.COIN_BUY, data.buy, options);

    // console.log('estimatedFee', estimatedFee);

    // const res = await decimal.buyCoins(data.buy, options);
    // const res2 = await decimal.postTx(res);
    // console.log(JSON.stringify(res));
  // }, 5000)
}());