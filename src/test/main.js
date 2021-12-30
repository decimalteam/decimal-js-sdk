/* eslint-disable */
import { Wallet, Decimal, TX_TYPE } from '../index';
import TYPE_TX from '../txTypes';
import {data, options} from './data';
import {makeSignature, prepareTx, postTx} from '../txUtils';
import {createBroadcastTx} from '@tendermint/sig';
import { getTransaction } from '../tx';

const mnemonic = 'cook purity strategy hen column clump vocal husband goose diary vapor second connect coin love sure fitness collect identify ball write destroy left identify';

const wallet  = new Wallet(mnemonic);

const gateURL = 'https://devnet-gate.decimalchain.com/api/';

const decimal = new Decimal({ gateURL, wallet, });

(async function test() {
  for (let i = 1; i<=100; i += 1) {
    const data = {
      to: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
      coin: 'del',
      amount: i + '',
    } 

    await decimal.sendCoins(data, options);
  }
}());
