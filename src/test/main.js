/* eslint-disable */
import { Wallet, Decimal, TX_TYPE } from '../index';
import TYPE_TX from '../txTypes';
import {data, options} from './data';
import {makeSignature, prepareTx, postTx} from '../txUtils';
import {createBroadcastTx} from '@tendermint/sig';
import { getTransaction } from '../tx';
import { generateNftId } from '../utils';
import * as fs from 'fs';

const mnemonic = '';

const wallet  = new Wallet(mnemonic);

const gateUrl = 'https://devnet-gate.decimalchain.com/api/';

const decimal = new Decimal({ gateUrl, wallet, });

const datas = [];

(async () => {
  const id = generateNftId('asdfg', 'asdfgasdfg', 'CadgWIHKcOkPzn5X0Eji96F7RLiLAxPQ', '7446c6522319e02ca5552c257d0c01faa89c41a9', '7446c6522319e02ca5552c257d0c01faa89c41a9');

  const data = {
    id,
    recipient: 'dx14kskueht0ul2qme5qmwjvlmjr9thd0x3x9ffrw',
    denom: 'asdfg',
    token_uri: 'https://devnet-nft.decimalchain.com/api/nfts/CadgWIHKcOkPzn5X0Eji96F7RLiLAxPQ',
    quantity: '1',
    reserve: '1',
    allow_mint: false,
  };

  const res = await decimal.nftMint(data, options);

  console.info({id, res});
})();
