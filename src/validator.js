import { validate } from 'jsonschema';
import TX_TYPE from './txTypes';

const SCHEMA = {};

SCHEMA[TX_TYPE.COIN_SEND] = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        sender: {
          type: 'string',
          required: true,
        },
        receiver: {
          type: 'string',
          required: true,
        },
        coin: {
          type: 'string',
          required: true,
        },
        amount: {
          type: 'string',
          required: true,
        },
      },
    },
    gas: {
      type: 'string',
      required: true,
    },
    message: {
      type: 'string',
      required: true,
    },
  },
};

export default function validateTx(txParams) {
  return validate(txParams, SCHEMA[txParams.type]);
}
