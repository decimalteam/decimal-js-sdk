/* eslint-disable */
import { Wallet, Decimal, TX_TYPE } from '../index';
import TYPE_TX from '../txTypes';
import {data, options} from './data';
import {makeSignature, prepareTx, postTx} from '../txUtils';
import {createBroadcastTx} from '@tendermint/sig';
import { getTransaction } from '../tx';

const wallet = new Wallet('income space modify wealth attitude uniform guitar ready woman keen play problem hint fringe art lyrics crime learn blossom young dolphin pluck appear stadium');
const decimal = new Decimal({ baseURL: 'https://devnet-gate.decimalchain.com/api/', wallet, network: 'devnet' });

(async function test() {
  await decimal.nftMint(data.nftMint);
  // await decimal.nftBurn(data.nftMint);
  // await decimal.nftEditMetadata(data.nftMint);
  // await decimal.nftTransfer(data.nftMint);
}());