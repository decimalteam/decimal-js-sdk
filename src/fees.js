
import DecimalNumber from 'decimal.js-light';
import TX_TYPE from './txTypes';
import { getAmountFromUNI, getAmountToUNI } from './math';

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


// eslint-disable-next-line no-unused-vars
function getCoinPrice(coin) {
  const reserve = getAmountFromUNI(coin.reserve);
  const supply = getAmountFromUNI(coin.volume);
  const crr = coin.crr / 100;

  const amount = Math.min(supply, 1);

  if (supply === 0) {
    return 0;
  }

  let result = new DecimalNumber(amount).div(supply);
  result = new DecimalNumber(1).minus(result);
  result = result.pow(new DecimalNumber(1).div(crr));
  result = new DecimalNumber(1).minus(result).times(reserve);

  return result;
}

async function getTxSize(api, tx) {
  const preparedTx = {
    type: 'cosmos-sdk/StdTx',
    value: {
      ...tx,
    },
  };

  console.log(JSON.stringify(preparedTx));

  const encodeTxResp = await api.post('/rpc/txs/encode', preparedTx);
  const encodedTxBase64 = encodeTxResp.data.tx;
  const encodedTx = Buffer.from(encodedTxBase64, 'base64');
  const size = encodedTx.length;

  console.log(encodedTxBase64);

  // console.log('size', size);

  return size;
}

export default function getCommission(api) {
  return async (tx, feeCoin) => {
    const { type } = tx.msg[0];
    const ticker = feeCoin;
    const textSize = await getTxSize(api, tx);

    console.log('textSize', textSize);


    const feeForText = new DecimalNumber(textSize).times(2);

    console.log('feeFoxText', feeForText.toFixed());

    const feeInBase = new DecimalNumber(FEES[type]).plus(feeForText).times(unit);

    // if (ticker !== 'tdel') {
    //   const coin = await getCoin(api)(ticker);
    //   if (!coin) throw new Error('Coin not found');
    //   const coinPrice = getCoinPrice(coin);
    //   const feeInCustom = coinPrice.times(feeInBase);
    //   // console.log(`fee: ${feeInCustom} ${ticker}`);
    //   return getAmountToUNI(feeInCustom);
    // }
    console.log(`fee: ${feeInBase} ${ticker}`);
    return getAmountToUNI(feeInBase);

    // return '0';
  };
}

// export function getTxBytes(value) {
//   return toCanonicalJSONBytes(value);
// }
