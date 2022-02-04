/* eslint-disable */
import { Wallet, Decimal, TX_TYPE } from '../index';
import TYPE_TX from '../txTypes';
import {data, options} from './data';
import {makeSignature, prepareTx, postTx} from '../txUtils';
import {createBroadcastTx} from '@tendermint/sig';
import { getTransaction } from '../tx';

const mnemonic = '';

const wallet  = new Wallet(mnemonic);

const gateUrl = 'https://testnet-gate.decimalchain.com/api/';

const decimal = new Decimal({ gateUrl, wallet, });

const datas = [];

(async () => {
  const ids = [];
  // const startNonce = 15;

  for (let i = 1; i<=25; i += 1) {
    ids.push(i);
  }

  // options.mode = 'block';
  
  for await (const id of ids) {
    const data = {
      to: 'dx14kskueht0ul2qme5qmwjvlmjr9thd0x3x9ffrw',
      coin: 'tdel',
      amount: id / 10 + '',
    }

    // options.nonce = startNonce + id + '';

    // console.log(options.nonce);

    
    const txResp = await  decimal.sendCoins(data, options);

    console.info({txResp});
    
    // await decimal.sendCoins(data, options);
   
    // await new Promise(resolve => setTimeout(resolve, 1000))
  }
})();
