/* eslint-disable */
import { Wallet, Decimal, TX_TYPE } from '../index';
import TYPE_TX from '../txTypes';
import {data, options} from './data';
import {makeSignature, prepareTx, postTx} from '../txUtils';
import {createBroadcastTx} from '@tendermint/sig';
import { getTransaction } from '../tx';

const wallet  = new Wallet('stamp group slice apple music cement crumble jazz grow slow asset neither garlic hotel extend boost enroll cube rare lesson fluid soup matrix piano');
const decimal = new Decimal({ baseURL: 'https://devnet-gate.decimalchain.com/api/', wallet, });
console.log(wallet)
(async function test() {
  // for (let i=0; i < 1; i++) {
  //   await decimal.sendCoins(data.send);
  // }

  // await decimal.msgSwapInit(data.swapInit);
  // await decimal.nftMint(data.nftMint);
  // await decimal.nftBurn(data.nftBurn);
  // await decimal.nftEditMetadata(data.nftEditMetadata);
  // await decimal.nftTransfer(data.nftTransfer);
  //await decimal.proposalSubmit(data.submitProposal);
}());
