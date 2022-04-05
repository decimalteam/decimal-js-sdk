/* eslint-disable */
import { Wallet, Decimal } from '../index';
import {data, options} from './data';

const mnemonic = '';

const wallet  = new Wallet(mnemonic);

const gateUrl = 'https://devnet-gate.decimalchain.com/api/';

const decimal = new Decimal({ gateUrl, wallet, });

(async () => {
})();
