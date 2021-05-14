/* eslint-disable */
import { Wallet, Decimal, TX_TYPE } from '../index';
import TYPE_TX from '../txTypes';
import {data, options} from './data';
import {makeSignature, prepareTx, postTx} from '../txUtils';
import {createBroadcastTx} from '@tendermint/sig';
import { getTransaction } from '../tx';

const wallet = new Wallet('stamp group slice apple music cement crumble jazz grow slow asset neither garlic hotel extend boost enroll cube rare lesson fluid soup matrix piano');
const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', wallet, network: 'testnet' });

(async function test() {
  //await decimal.nftMint(data.nftMint);
  // await decimal.nftBurn(data.nftBurn);
  // await decimal.nftEditMetadata(data.nftEditMetadata);
  // await decimal.nftTransfer(data.nftTransfer);
  //await decimal.nftDelegate(data.nftDelegate);
  await decimal.nftUnbond(data.nftUnbond);
}());

// const wallet = new Wallet('doctor transfer mystery electric any satisfy crop pill wet music legend hero success lock item dune shiver mesh badge orbit correct february rifle museum');
// const decimal = new Decimal({ baseURL: 'https://devnet-gate.decimalchain.com/api/', wallet, network: 'devnet' });

// (async function test() {
//   // await decimal.nftMint(data.nftMint);
//   // await decimal.nftBurn(data.nftBurn);
//   // await decimal.nftEditMetadata(data.nftEditMetadata);
//   // await decimal.nftTransfer(data.nftTransfer);
// }());
