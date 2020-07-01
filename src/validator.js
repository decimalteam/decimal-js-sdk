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

export default function validateTx(txParams) {
  return validate(txParams, SCHEMA[txParams.type]);
}

export function validateTxData(data, type) {
  const test = validate(data, SCHEMA[type]);
  if (!test.valid) {
    throw new Error('[decimal-js-sdk]: invalid inputs');
  }
  return true;
}
