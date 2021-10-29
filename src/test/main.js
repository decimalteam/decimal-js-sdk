/* eslint-disable */
import { Wallet, Decimal, TX_TYPE } from '../index';
import TYPE_TX from '../txTypes';
import {data, options} from './data';
import {makeSignature, prepareTx, postTx} from '../txUtils';
import {createBroadcastTx} from '@tendermint/sig';
import { getTransaction } from '../tx';

const wallet  = new Wallet('doctor transfer mystery electric any satisfy crop pill wet music legend hero success lock item dune shiver mesh badge orbit correct february rifle museum');
const decimal = new Decimal({ rpcURL: 'http://46.101.127.241/rpc', restURL: 'http://46.101.127.241/rest', wallet, });

(async function test() {
    console.log('I', wallet)
    //console.log(result)
  // await decimal.nftMint(data.nftMint);
  // await decimal.nftBurn(data.nftBurn);
  // await decimal.nftEditMetadata(data.nftEditMetadata);
  // await decimal.nftTransfer(data.nftTransfer);
  // console.log(`IS_VALID(${data.send.to}) = ${decimal.verifyAddress(data.send.to)}`)

  // console.log(`IS_VALID(dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g) = ${decimal.verifyAddress('dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g')}`)

  // console.log(`IS_VALID_VALIDATOR_ADDRESS(${data.delegate.address}) = ${decimal.verifyAddress(data.delegate.address, 'dxvaloper')}`)
  // const result = await decimal.sendCoins(data.send)

}());
