import { validate } from 'jsonschema';
import TX_TYPE from './txTypes';

const SCHEMA = {};

const patterns = {
  float: /^\d*\.?\d*$/,
  int: /^\d+$/,
};

const fields = {
  amount: {
    type: 'string',
    pattern: patterns.float,
  },
  string: {
    type: 'string',
  },
  int: {
    type: 'string',
    pattern: patterns.int,
  },
};

SCHEMA[TX_TYPE.COIN_SEND] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    to: fields.string,
    coin: fields.string,
    amount: fields.amount,
  },
  minProperties: 3,
  maxProperties: 3,
  required: [
    'to',
    'coin',
    'amount',
  ],
};

SCHEMA[TX_TYPE.COIN_MULTISEND] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'array',
  items: {
    type: 'object',
    properties: {
      to: fields.string,
      coin: fields.string,
      amount: fields.amount,
    },
    minProperties: 3,
    maxProperties: 3,
    required: [
      'to',
      'coin',
      'amount',
    ],
  },
  minItems: 1,
};

SCHEMA[TX_TYPE.COIN_BUY] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    buyCoin: fields.string,
    amount: fields.amount,
    spendCoin: fields.string,
    maxSpendLimit: fields.amount,
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
    sellCoin: fields.string,
    amount: fields.amount,
    getCoin: fields.string,
    minBuyLimit: fields.amount,
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
    sellCoin: fields.string,
    getCoin: fields.string,
    minBuyLimit: fields.amount,
  },
  minProperties: 2,
  maxProperties: 3,
  required: [
    'sellCoin',
    'getCoin',
  ],
};

SCHEMA[TX_TYPE.VALIDATOR_DELEGATE] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    address: fields.string,
    coin: fields.string,
    stake: fields.amount,
  },
  minProperties: 3,
  maxProperties: 3,
  required: [
    'address',
    'coin',
    'stake',
  ],
};

SCHEMA[TX_TYPE.VALIDATOR_UNBOND] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    address: fields.string,
    coin: fields.string,
    stake: fields.amount,
  },
  minProperties: 3,
  maxProperties: 3,
  required: [
    'address',
    'coin',
    'stake',
  ],
};

SCHEMA[TX_TYPE.VALIDATOR_CANDIDATE] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    rewardAddress: fields.string,
    coin: fields.string,
    stake: fields.amount,
    pubKey: fields.string,
    commission: fields.int,
    description: {
      type: 'object',
      properties: {
        moniker: fields.string,
        identity: fields.string,
        website: fields.string,
        securityContact: fields.string,
        details: fields.string,
      },
      minProperties: 5,
      maxProperties: 5,
      required: [
        'moniker',
        'identity',
        'website',
        'securityContact',
        'details',
      ],
    },
  },
  minProperties: 6,
  maxProperties: 6,
  required: [
    'rewardAddress',
    'coin',
    'stake',
    'pubKey',
    'commission',
    'description',
  ],
};

SCHEMA[TX_TYPE.VALIDATOR_CANDIDATE_EDIT] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    rewardAddress: fields.string,
    description: {
      type: 'object',
      properties: {
        moniker: fields.string,
        identity: fields.string,
        website: fields.string,
        securityContact: fields.string,
        details: fields.string,
      },
      minProperties: 5,
      maxProperties: 5,
      required: [
        'moniker',
        'identity',
        'website',
        'securityContact',
        'details',
      ],
    },
  },
  minProperties: 2,
  maxProperties: 2,
  required: [
    'rewardAddress',
    'description',
  ],
};

SCHEMA[TX_TYPE.COIN_CREATE] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    title: fields.string,
    ticker: fields.string,
    initSupply: fields.amount,
    maxSupply: fields.amount,
    reserve: fields.amount,
    crr: fields.int,
  },
  minProperties: 6,
  maxProperties: 6,
  required: [
    'title',
    'ticker',
    'initSupply',
    'maxSupply',
    'reserve',
    'crr',
  ],
};

SCHEMA[TX_TYPE.COIN_ISSUE_CHECK] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    nonce: fields.int,
    coin: fields.string,
    amount: fields.amount,
    password: fields.string,
    dueBlock: fields.int,
  },
  minProperties: 5,
  maxProperties: 5,
  required: [
    'nonce',
    'coin',
    'amount',
    'password',
    'dueBlock',
  ],
};
SCHEMA[TX_TYPE.COIN_REDEEM_CHECK] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    check: fields.string,
    password: fields.string,
  },
  minProperties: 2,
  maxProperties: 2,
  required: [
    'check',
    'password',
  ],
};

SCHEMA[TX_TYPE.MULTISIG_CREATE_WALLET] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    owners: {
      type: 'array',
      items: fields.string,
      minItems: 1,
      uniqueItems: true,
    },
    weights: {
      type: 'array',
      items: fields.string,
      minItems: 1,
    },
    threshold: fields.string,
  },
  minProperties: 3,
  maxProperties: 3,
  required: [
    'owners',
    'weights',
    'threshold',
  ],
};

SCHEMA[TX_TYPE.MULTISIG_SIGN_TX] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    txId: fields.string,
  },
  minProperties: 1,
  maxProperties: 1,
  required: [
    'txId',
  ],
};

SCHEMA[TX_TYPE.PROPOSAL_SUBMIT] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    content: fields.string,
    startBlcok: fields.int,
    endBlock: fields.int
  },
  minProperties: 3,
  maxProperties: 3,
  required: [
    'content',
    'startBlock',
    'endBlock'
  ],
};

SCHEMA[TX_TYPE.PROPOSAL_VOTE] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    id: fields.int,
    decision: fields.string
  },
  minProperties: 2,
  maxProperties: 2,
  required: [
    'id',
    'decision',
  ],
};

export default function validateTxData(data, type) {
  if (!SCHEMA[type]) return true;

  const test = validate(data, SCHEMA[type]);
  if (!test.valid) {
    throw new Error(`[decimal-js-sdk]: ${test.errors[0].property} ${test.errors[0].message}`);
  }
  return true;
}
