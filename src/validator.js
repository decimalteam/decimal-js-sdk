import { validate } from 'jsonschema';
import TX_TYPE from './txTypes';

const SCHEMA = {};

const patterns = {
  float: /^\d*\.?\d*$/,
};

SCHEMA[TX_TYPE.COIN_SEND] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    to: {
      type: 'string',
    },
    coin: {
      type: 'string',
    },
    amount: {
      type: 'string',
      pattern: patterns.float,
    },
  },
  minProperties: 3,
  maxProperties: 3,
  required: [
    'to',
    'coin',
    'amount',
  ],
};

SCHEMA[TX_TYPE.COIN_BUY] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    buyCoin: {
      type: 'string',
    },
    amount: {
      type: 'string',
      pattern: patterns.float,
    },
    spendCoin: {
      type: 'string',
    },
    maxSpendLimit: {
      type: 'string',
    },
  },
  minProperties: 3,
  maxProperties: 4,
  required: [
    'buyCoin',
    'amount',
    'spendCoin',
  ],
};

SCHEMA[TX_TYPE.COIN_SELL] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    sellCoin: {
      type: 'string',
    },
    amount: {
      type: 'string',
      pattern: patterns.float,
    },
    getCoin: {
      type: 'string',
    },
    minBuyLimit: {
      type: 'string',
    },
  },
  minProperties: 3,
  maxProperties: 4,
  required: [
    'sellCoin',
    'amount',
    'getCoin',
  ],
};

SCHEMA[TX_TYPE.COIN_SELL_ALL] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    sellCoin: {
      type: 'string',
    },
    getCoin: {
      type: 'string',
    },
    minBuyLimit: {
      type: 'string',
    },
  },
  minProperties: 2,
  maxProperties: 3,
  required: [
    'sellCoin',
    'getCoin',
  ],
};


export default function validateTx(txParams) {
  return validate(txParams, SCHEMA[txParams.type]);
}

export function validateTxData(data, type) {
  if (!SCHEMA[type]) return true;

  const test = validate(data, SCHEMA[type]);
  if (!test.valid) {
    throw new Error('[decimal-js-sdk]: invalid inputs');
  }
  return true;
}
