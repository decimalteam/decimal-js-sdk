/* eslint-disable */
import { Wallet, Decimal, TX_TYPE } from '../index';
import TYPE_TX from '../txTypes';
import {data, options} from './data';
import {makeSignature, prepareTx, postTx} from '../txUtils';
import {createBroadcastTx} from '@tendermint/sig';
import { getTransaction } from '../tx';
import { generateNftId } from '../utils';
import * as fs from 'fs';

const mnemonic = 'cook purity strategy hen column clump vocal husband goose diary vapor second connect coin love sure fitness collect identify ball write destroy left identify';

const wallet  = new Wallet(mnemonic);

const gateUrl = 'https://devnet-gate.decimalchain.com/api/';

const decimal = new Decimal({ gateUrl, wallet, });

(async () => {
  // const res = await decimal.updateAddressBlockingData('dx1lx4lvt8sjuxj8vw5dcf6knnq0pacre4w6hdh2v', true, 'both', 'gay');
  const res = await decimal.getBlockedAddresses(10, 0, 'incoming');
  console.info(res);
})();
