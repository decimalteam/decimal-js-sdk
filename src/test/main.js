/* eslint-disable */
import { Wallet, Decimal, TX_TYPE } from '../index';
import TYPE_TX from '../txTypes';
import {data, options} from './data';
import {makeSignature, prepareTx, postTx} from '../txUtils';
import {createBroadcastTx} from '@tendermint/sig';
import { getTransaction } from '../tx';

const wallet  = new Wallet('income space modify wealth attitude uniform guitar ready woman keen play problem hint fringe art lyrics crime learn blossom young dolphin pluck appear stadium');

const decimal = new Decimal({ rpcURL: 'http://46.101.127.241/rpc', gateURL: 'https://devnet-gate.decimalchain.com/api/', wallet, });
(async function test() {
  // await decimal.nftMint(data.nftMint);
  // await decimal.nftBurn(data.nftBurn);
  // await decimal.nftEditMetadata(data.nftEditMetadata);
  // await decimal.nftTransfer(data.nftTransfer);
  // console.log(`IS_VALID(${data.send.to}) = ${decimal.verifyAddress(data.send.to)}`)

  // console.log(`IS_VALID(dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g) = ${decimal.verifyAddress('dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g')}`)

  // console.log(`IS_VALID_VALIDATOR_ADDRESS(${data.delegate.address}) = ${decimal.verifyAddress(data.delegate.address, 'dxvaloper')}`)
  const result = await decimal.getNft('49501d55a30944bf7b3b72e618c1cc564cdeaeee')
  console.log(result)
}());
