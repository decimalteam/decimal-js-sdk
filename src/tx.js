/* eslint-disable no-use-before-define */

import TX_TYPE from './txTypes';
import { validateTxData } from './validator';
// eslint-disable-next-line import/no-cycle
import { formTx, postTx } from './txUtils';
import { getAmountToUNI } from './math';


function sendCoinData(data, wallet) {
  return {
    sender: wallet.address,
    receiver: data.to,
    coin: {
      amount: getAmountToUNI(data.amount),
      denom: data.coin.toLowerCase(),
    },
  };
}

function buyCoinData(data, wallet) {
  const maxSpendLimit = data.maxSpendLimit ? getAmountToUNI(data.maxSpendLimit) : getAmountToUNI('100000000000');
  return {
    sender: wallet.address,
    coin_to_buy: {
      amount: getAmountToUNI(data.amount),
      denom: data.buyCoin.toLowerCase(),
    },
    max_coin_to_sell: {
      amount: maxSpendLimit,
      denom: data.spendCoin.toLowerCase(),
    },
  };
}

function sellCoinData(data, wallet) {
  const minBuyLimit = minBuyLimit ? getAmountToUNI(data.minBuyLimit) : '1';
  return {
    sender: wallet.address,
    coin_to_sell: {
      amount: data.amount,
      denom: data.sellCoin.toLowerCase(),
    },
    min_coin_to_buy: {
      amount: minBuyLimit,
      denom: data.getCoin.toLowerCase(),
    },
  };
}

function sellAllCoinsData(data, wallet) {
  return {
    sender: wallet.address,
    coin_to_sell: {
      amount: '0',
      denom: data.sellCoin.toLowerCase(),
    },
    min_coin_to_buy: {
      amount: getAmountToUNI(data.minBuyLimit) || '1',
      denom: data.getCoin.toLowerCase(),
    },
  };
}

export function getTransaction(api, wallet) {
  return async (type, data, options) => {
    console.log(wallet);
    validateTxData(data, type);

    let value = {};
    switch (type) {
      case TX_TYPE.COIN_SEND:
        value = sendCoinData(data, wallet);
        break;
      case TX_TYPE.COIN_BUY:
        value = buyCoinData(data, wallet);
        break;
      case TX_TYPE.COIN_SELL:
        value = sellCoinData(data, wallet);
        break;
      case TX_TYPE.COIN_SELL_ALL:
        value = sellAllCoinsData(data, wallet);
        break;
      default:
        throw new Error('Invalid type of transaction');
    }

    const broadcastTx = await formTx(api, wallet)(type, value, options, wallet);
    return broadcastTx;
  };
}

export function sendTransaction(api, wallet) {
  return async (type, data, options) => {
    const broadcastTx = await getTransaction(api, wallet)(type, data, options);
    const txResult = await postTx(api)(broadcastTx);
    return txResult;
  };
}
