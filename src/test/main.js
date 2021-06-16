/* eslint-disable */
import { Wallet, Decimal, TX_TYPE } from '../index';
import TYPE_TX from '../txTypes';
import {data, options} from './data';
import {makeSignature, prepareTx, postTx} from '../txUtils';
import {createBroadcastTx} from '@tendermint/sig';
import { getTransaction } from '../tx';

const wallet = new Wallet('wife volume desert main turkey symptom marble taxi fitness train frog gallery kitchen minimum cash love minimum toe sentence office else water funny camp');
const decimal = new Decimal({ baseURL: 'https://devnet-gate.decimalchain.com/api/', wallet, network: 'devnet' });

(async function test() {
  //await decimal.nftMint(data.nftMint);
  // await decimal.nftBurn(data.nftBurn);
  // await decimal.nftEditMetadata(data.nftEditMetadata);
  await decimal.nftTransfer(data.nftTransfer);
  //await decimal.nftDelegate(data.nftDelegate);
  //await decimal.createCoin(data.createCoin);
}());

// const wallet = new Wallet('doctor transfer mystery electric any satisfy crop pill wet music legend hero success lock item dune shiver mesh badge orbit correct february rifle museum');
// const decimal = new Decimal({ baseURL: 'https://devnet-gate.decimalchain.com/api/', wallet, network: 'devnet' });

// (async function test() {
//   // await decimal.nftMint(data.nftMint);
//   // await decimal.nftBurn(data.nftBurn);
//   // await decimal.nftEditMetadata(data.nftEditMetadata);
//   // await decimal.nftTransfer(data.nftTransfer);
// }());
