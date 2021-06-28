import { validate } from 'jsonschema';
import TX_TYPE from './txTypes';

const SCHEMA = {};

const patterns = {
  float: /^\d*\.?\d*$/,
  int: /^\d+$/,
  denom: /^[A-Za-z\-_]+$/,
  url: /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
};

const fields = {
  amount: {
    type: 'string',
    pattern: patterns.float,
  },
  array: {
    type: 'array',
  },
  string: {
    type: 'string',
  },
  int: {
    type: 'string',
    pattern: patterns.int,
  },
  boolean: {
    type: 'boolean',
  },
  url: {
    type: 'string',
    pattern: patterns.url,
  },
  denom: {
    type: 'string',
    pattern: patterns.denom,
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
    identity: fields.string,
  },
  minProperties: 6,
  maxProperties: 7,
  required: [
    'title',
    'ticker',
    'initSupply',
    'maxSupply',
    'reserve',
    'identity',
    'crr',
  ],
};

SCHEMA[TX_TYPE.COIN_UPDATE] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    ticker: fields.string,
    maxSupply: fields.amount,
    identity: fields.string,
  },
  minProperties: 3,
  maxProperties: 3,
  required: [
    'ticker',
    'maxSupply',
    'identity',
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
    content: {
      type: 'object',
      properties: {
        title: fields.string,
        description: fields.string,
      },
      minProperties: 2,
      maxProperties: 2,
      required: [
        'title',
        'description',
      ],
    },
    startBlcok: fields.int,
    endBlock: fields.int,
  },
  minProperties: 3,
  maxProperties: 3,
  required: [
    'content',
    'startBlock',
    'endBlock',
  ],
};

SCHEMA[TX_TYPE.PROPOSAL_VOTE] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    id: fields.int,
    decision: fields.string,
  },
  minProperties: 2,
  maxProperties: 2,
  required: [
    'id',
    'decision',
  ],
};

SCHEMA[TX_TYPE.SWAP_HTLT] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    type: fields.string,
    from: fields.string,
    recipient: fields.string,
    secretHash: fields.string,
    amount: fields.amount,
    coin: fields.string,
  },
  minProperties: 6,
  maxProperties: 6,
  required: [
    'type',
    'from',
    'recipient',
    'secretHash',
    'amount',
    'coin',
  ],
};

SCHEMA[TX_TYPE.SWAP_REDEEM] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    from: fields.string,
    secret: fields.string,
  },
  minProperties: 2,
  maxProperties: 2,
  required: [
    'from',
    'secret',
  ],
};

SCHEMA[TX_TYPE.SWAP_REFUND] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    from: fields.string,
    secretHash: fields.string,
  },
  minProperties: 2,
  maxProperties: 2,
  required: [
    'from',
    'secretHash',
  ],
};

SCHEMA[TX_TYPE.NFT_MINT] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    denom: fields.denom,
    // id: fields.string,
    // sender: fields.string,
    recipient: fields.string,
    quantity: fields.int,
    reserve: fields.amount,
    token_uri: fields.url,
    allow_mint: fields.boolean,
  },
  minProperties: 4,
  maxProperties: 6,
  required: [
    'denom',
    // 'id',
    // 'sender',
    // 'recipient',
    'token_uri',
    'quantity',
    'reserve',
    'allow_mint',
  ],
};

SCHEMA[TX_TYPE.NFT_BURN] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    denom: fields.denom,
    id: fields.string,
    sub_token_ids: fields.array,
  },
  minProperties: 3,
  maxProperties: 3,
  required: [
    'denom',
    'id',
    'sub_token_ids',
  ],
};

SCHEMA[TX_TYPE.NFT_EDIT_METADATA] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    denom: fields.denom,
    id: fields.string,
    token_uri: fields.string,
  },
  minProperties: 3,
  maxProperties: 3,
  required: [
    'denom',
    'id',
    'token_uri',
  ],
};

SCHEMA[TX_TYPE.NFT_TRANSFER] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    recipient: fields.string,
    denom: fields.denom,
    id: fields.string,
    sub_token_ids: fields.array,
  },
  minProperties: 4,
  maxProperties: 4,
  required: [
    'recipient',
    'denom',
    'id',
    'sub_token_ids',
  ],
};

SCHEMA[TX_TYPE.NFT_DELEGATE] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    validator_address: fields.string,
    id: fields.string,
    denom: fields.denom,
    sub_token_ids: fields.array,
  },
  minProperties: 4,
  maxProperties: 4,
  required: [
    'validator_address',
    'id',
    'denom',
    'sub_token_ids',
  ],
};

SCHEMA[TX_TYPE.NFT_UNBOND] = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    validator_address: fields.string,
    id: fields.string,
    denom: fields.denom,
    sub_token_ids: fields.array,
  },
  minProperties: 4,
  maxProperties: 4,
  required: [
    'validator_address',
    'id',
    'denom',
    'sub_token_ids',
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
