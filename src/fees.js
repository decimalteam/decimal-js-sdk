/* eslint-disable no-unused-vars */

import DecimalNumber from 'decimal.js';

import TX_TYPE from './txTypes';
import { getAmountFromUNI, getAmountToUNI } from './math';
import getCoin from './api/get-coin';

DecimalNumber.set({ precision: 40 });
// import { prepareTx } from './txUtils';

// 1 unit = 0.001 DEL
// SendCoin fee is 10 unit.
// Every byte add additional 2 units.
const unit = 0.001;

const FEES = {};
FEES[TX_TYPE.COIN_SEND] = 10;
FEES[TX_TYPE.COIN_BUY] = 100;
FEES[TX_TYPE.COIN_CREATE] = 100;
FEES[TX_TYPE.COIN_SELL] = 100;
FEES[TX_TYPE.COIN_MULTISEND] = 8;
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
FEES[TX_TYPE.PROPOSAL_SUBMIT] = 0;
FEES[TX_TYPE.PROPOSAL_VOTE] = 0;
FEES[TX_TYPE.SWAP_HTLT] = 33000;
FEES[TX_TYPE.SWAP_REDEEM] = 0;
FEES[TX_TYPE.SWAP_REFUND] = 0;
FEES[TX_TYPE.COIN_UPDATE] = 0;
FEES[TX_TYPE.NFT_MINT] = 0;
FEES[TX_TYPE.NFT_BURN] = 0;
FEES[TX_TYPE.NFT_EDIT_METADATA] = 0;
FEES[TX_TYPE.NFT_TRANSFER] = 0;

async function getCoinPrice(api, ticker) {
  const coin = await getCoin(api)(ticker);
  if (!coin) throw new Error('Coin not found');

  return coin.price;
}

async function getTxSize(api, tx) {
  const preparedTx = {
    type: 'cosmos-sdk/StdTx',
    value: {
      ...tx,
    },
  };
  const signatureSize = 109;
  const encodeTxResp = await api.post('/rpc/txs/encode', preparedTx);
  const encodedTxBase64 = encodeTxResp.data.tx;
  const encodedTx = Buffer.from(encodedTxBase64, 'base64');
  const size = encodedTx.length + signatureSize;

  return size;
}

export function getCommission(api) {
  return async (tx, feeCoin) => {
    const { type } = tx.msg[0];
    const ticker = feeCoin.toLowerCase();
    const textSize = await getTxSize(api, tx);
    const feeForText = new DecimalNumber(textSize).times(2);
    let feeInBase = new DecimalNumber(FEES[type]).plus(feeForText).plus(20); // 20 - additional commission for the guarantee

    if (type === TX_TYPE.COIN_MULTISEND) {
      const numberOfParticipants = tx.msg[0].value.sends.length;
      const feeForParticipants = 5 * (numberOfParticipants - 1);
      feeInBase = feeInBase.plus(feeForParticipants);
    }

    if (ticker === 'tdel' || ticker === 'del') {
      return { coinPrice: '1', value: feeInBase, base: feeInBase }; // -> base {units}
    }

    const coinPriceRaw = await getCoinPrice(api, ticker);
    const coinPrice = new DecimalNumber(coinPriceRaw);
    const feeInCustom = feeInBase.div(coinPrice.div(unit));

    return { coinPrice, value: new DecimalNumber(feeInCustom.div(unit).toFixed(0)), base: feeInBase }; // -> custom {units}
  };
}

export function setCommission(api) {
  return async (tx, feeCoin) => {
    tx.fee.amount = [{
      denom: feeCoin,
      amount: '0',
    }];

    const fee = await getCommission(api)(tx, feeCoin);

    const feeAmountSize = Buffer.from(getAmountToUNI(fee.value.times(unit))).length;

    const feeForFeeAmount = new DecimalNumber(feeAmountSize).times(2); // base {units}

    let totalFee = '';

    if (feeCoin !== 'tdel' && feeCoin !== 'del') {
      const feeForFeeAmountToCustom = feeForFeeAmount.div(fee.coinPrice);
      totalFee = fee.value.plus(feeForFeeAmountToCustom).times(unit);
    } else {
      totalFee = fee.value.plus(feeForFeeAmount).times(unit);
    }

    tx.fee.amount[0].amount = getAmountToUNI(totalFee);
    return tx;
  };
}
