/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable */

import Decimaljs from 'decimal.js-light';
import { toCanonicalJSONBytes, toCanonicalJSONString, bytesToString } from '@tendermint/belt';
import TX_TYPE from './txTypes';
import getCoin from './api/get-coin';

// 1 unit = 0.001 DEL
// SendCoin fee is 10 unit.
// Every byte add additional 2 units.
const unit = 0.001;

const FEES = {};
FEES[TX_TYPE.COIN_SEND] = 10;
FEES[TX_TYPE.COIN_BUY] = 100;
FEES[TX_TYPE.COIN_CREATE] = 100;
FEES[TX_TYPE.COIN_SELL] = 100;
FEES[TX_TYPE.COIN_MULTISEND] = 0; // TODO
FEES[TX_TYPE.COIN_SELL_ALL] = 100;
FEES[TX_TYPE.COIN_REDEEM_CHECK] = 30;
FEES[TX_TYPE.VALIDATOR_CANDIDATE] = 10000;
FEES[TX_TYPE.VALIDATOR_DELEGATE] = 200;
FEES[TX_TYPE.VALIDATOR_SET_ONLINE] = 100;
FEES[TX_TYPE.VALIDATOR_SET_OFFLINE] = 100;
FEES[TX_TYPE.VALIDATOR_UNBOND] = 200;
FEES[TX_TYPE.VALIDATOR_CANDIDATE_EDIT] = 10000;
FEES[TX_TYPE.MULTISIG_CREATE_WALLET] = 100;
FEES[TX_TYPE.MULTISIG_CREATE_TX] = 100;
FEES[TX_TYPE.MULTISIG_SIGN_TX] = 100;


function getAmountFromSatoshi(amount) {
  return new Decimaljs(amount).times(new Decimaljs(10).pow(-18)).toFixed(0);
}
function getAmountToSatoshi(amount) {
  return new Decimaljs(amount).times(new Decimaljs(10).pow(18)).toFixed(0);
}

function getCoinPrice(coin) {
  const reserve = getAmountFromSatoshi(coin.reserve);
  const supply = getAmountFromSatoshi(coin.volume);
  const crr = coin.crr / 100;

  const amount = Math.min(supply, 1);

  if (supply === 0) {
    return 0;
  }

  let result = new Decimaljs(amount).div(supply);
  result = new Decimaljs(1).minus(result);
  result = result.pow(new Decimaljs(1).div(crr));
  result = new Decimaljs(1).minus(result).times(reserve);

  return result;
}

export default function getCommission(api) {
  return async (tx) => {
    const { type } = tx.msg[0];
    const ticker = tx.fee.amount[0].denom || 'tdel';
    const textSize = toCanonicalJSONBytes(tx).length;
    const feeForText = new Decimaljs(textSize).times(2).times(unit);
    const feeInBase = new Decimaljs(unit).times(FEES[type]).plus(feeForText);

    if (ticker !== 'tdel') {
      const coin = await getCoin(api)(ticker);
      const coinPrice = getCoinPrice(coin);
      const feeInCustom = coinPrice.times(feeInBase);
      // console.log(`fee: ${feeInCustom} ${ticker}`);
      return getAmountToSatoshi(feeInCustom);
    }
    // console.log(`fee: ${feeInBase} ${ticker}`);
    return getAmountToSatoshi(feeInBase);
  };
}

export function getTxBytes(value) {
  return toCanonicalJSONBytes(value);
}
