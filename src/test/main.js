// /* eslint-disable */
// import { Wallet, Decimal, TX_TYPE } from '../index';
// import TYPE_TX from '../txTypes';
// import {data, options} from './data';
// import {makeSignature, prepareTx, postTx} from '../txUtils';
// import {createBroadcastTx} from '@tendermint/sig';
// import { getTransaction } from '../tx';
//
// const wallet = new Wallet('doctor transfer mystery electric any satisfy crop pill wet music legend hero success lock item dune shiver mesh badge orbit correct february rifle museum');
// const decimal = new Decimal({ baseURL: 'https://devnet-gate.decimalchain.com/api/', wallet, network: 'devnet' });
//
// (async function test() {
//   // await decimal.nftMint(data.nftMint);
//   // await decimal.nftBurn(data.nftBurn);
//   // await decimal.nftEditMetadata(data.nftEditMetadata);
//   // await decimal.nftTransfer(data.nftTransfer);
// }());
/* eslint-disable */
import {Wallet, Decimal, TX_TYPE} from '../index';
import TYPE_TX from '../txTypes';
import {data, options} from './data';
import {makeSignature, prepareTx, postTx} from '../txUtils';
import {createBroadcastTx} from '@tendermint/sig';
import {getTransaction} from '../tx';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
;

let wallet = new Wallet('doctor transfer mystery electric any satisfy crop pill wet music legend hero success lock item dune shiver mesh badge orbit correct february rifle museum');
// let wallet = new Wallet('floor edit hazard intact stem deny upon fat inflict timber fish rose more taxi leaf power alert crew left voice obey save shoulder gallery');
//const wallet = new Wallet('floor run must alter alone teach flag chicken level course speak alley loan naive wait echo wire spike hold thumb over siren grocery forward');
const decimal = new Decimal({baseURL: 'https://devnet-gate.decimalchain.com/api/', wallet, network: "devnet"});

(async function test() {
    const options = {
        feeCoin: 'del', // The coin that pays commission
        message: 'my message', // Any additional information about the transaction
        gasLimit: '9000000000000000000', // The maximum amount of gas you are willing to pay for a transaction
        mode: 'sync', // broadcast mode {sync | async | block}
    };
    //await decimal.sendCoins(data.send);

    console.log(111111)
    //await decimal.nftMint(data.nftMint);
    const fee = await decimal.estimateTxFee('nft/msg_mint', data.nftMint, options);
    console.log(fee)
     await decimal.nftDelegate(data.nftDelegate, options)
     await decimal.nftUnbond(data.nftUnbond, options)
    console.log(222222)
}());
