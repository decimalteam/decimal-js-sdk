# Decimal JS SDK

For detailed explanation on how things work, checkout the:

- [Decimal SDK docs](https://help.decimalchain.com/api-sdk/).
- [Decimal Console site](https://console.decimalchain.com/).

# Install

```bash
$ npm install decimal-js-sdk
```

# Usage
## Available endpoints
MAINNET -
https://mainnet-gate.decimalchain.com/api/

TESTNET -
https://testnet-gate.decimalchain.com/api/


The following code can be used to generate **mnemonic** or use your mnemonic
```js
const bip39 = require("bip39");
const mnemonic = bip39.generateMnemonic();
```

## Send coins
### CommonJS
```js
const { Wallet, Decimal } = require('decimal-js-sdk'); // For server use 'decimal-js-sdk/dist/decimal-sdk-node'

const wallet = new Wallet( /*your mnemonic*/);
const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', wallet });

const data = {
    to: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
    coin: 'tdel',
    amount: '1',
  };

const txResult = await decimal.sendCoins(data, [options]); // see options for details
// => {hash: '4C0A408B6EBC33AD...', success: true, error: null}
```

### ES6
```js

import { Wallet, Decimal } from 'decimal-js-sdk';

const wallet = new Wallet(/*your mnemonic*/);
const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', wallet})

const data = {
    to: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
    coin: 'tdel',
    amount: '1',
  };

const txResult = await decimal.sendCoins(data); // see sendCoins for details
// => {hash: '4C0A408B6EBC33AD...', success: true, error: null}
```

## Wallet API
### Generate wallet
```js
import { Wallet } from 'decimal-js-sdk';
const wallet = new Wallet();
```
### Generate wallet from mnemonic
```js
import { Wallet } from 'decimal-js-sdk';
const wallet = new Wallet('erase august mask elevator sand picture north there apple equal anchor target');
```
### Wallet methods
`getPrivateKeyString`
Return the private key string of 64 hex characters
```js
wallet.getPrivateKeyString();
// 8f7370936a728ff3d2306cbf2422382a4297f9059aecb5703fe83eef49d3e828
```
`getPrivateKeyString`
Return the public key string of 64 hex characters
```js
wallet.getPublicKeyString();
// 02f85bb9b5d87cda4197b09d0cd0ef5a1fb97f74f261f508f48a26d7dba2d0ed12
```

# SDK instance
- [Options](#options)
- [Types](#types)
- [API](#api)
  - [getCoinsList](#getaddress)
  - [getCoin](#getcoinslist)
  - [getAddress](#getcoin)
  - [getMeta](#getmeta)
  - [getMultisigsByAddress](#getmultisigsbyaddress)
  - [getMultisig](#getmultisig)
  - [getMultisigTxs](#getmultisigtxs)
  - [getStakesByAddress](#getstakesbyaddress)
  - [getValidator](#getvalidator)
- [Tx utils](#txutils)
  - [getTransaction](#gettransaction)
  - [postTx](#posttx)
  - [estimateTxFee](#estimatetxfee)
- [Coins](#coins)
  - [sendCoin](#sendcoins)
  - [multisendCoins](#multisendcoins)
  - [buyCoins](#buycoins)
  - [sellCoins](#sellcoins)
  - [sellAllCoins](#sellallcoins)
  - [createCoin](#createcoin)
- [Validators](#validators)
  - [validatorDelegate](#validatordelegate)
  - [validatorUnbond](#validatorunbond)
  - [validatorDeclare](#validatordeclare)
  - [validatorEdit](#validatoredit)
  - [validatorOn](#validatoron)
  - [validatorOff](#validatoroff)
- [Checks](#checks)
  - [issueCheck](#issuechek)
  - [redeemCheck](#redeemcheck)
- [Multisig](#multisig)
  - [multisigCreateWallet](multisigcreatewallet)
  - [multisigCreateTx](multisigcreatetx)
  - [multisigSignTx](multisigsigntx)


## Types
``` js
  import {TX_TYPE} from 'decimal-js-sdk'
```
* TX_TYPE.COIN_BUY
* TX_TYPE.COIN_CREATE
* TX_TYPE.COIN_SELL
* TX_TYPE.COIN_SEND
* TX_TYPE.COIN_MULTISEND
* TX_TYPE.COIN_SELL_ALL
* TX_TYPE.COIN_REDEEM_CHECK
* TX_TYPE.COIN_ISSUE_CHECK
* TX_TYPE.VALIDATOR_CANDIDATE
* TX_TYPE.VALIDATOR_DELEGATE
* TX_TYPE.VALIDATOR_SET_ONLINE
* TX_TYPE.VALIDATOR_SET_OFFLINE
* TX_TYPE.VALIDATOR_UNBOND
* TX_TYPE.VALIDATOR_CANDIDATE_EDIT
* TX_TYPE.MULTISIG_CREATE_WALLET
* TX_TYPE.MULTISIG_CREATE_TX
* TX_TYPE.MULTISIG_SIGN_TX


## Meta
Used for generating offline transactions.
**This is an optional parameter!**
```js
const meta = {
  account_number: "10",
  chain_id: "decimal-testnet-06-30-15-30",
  sequence: "198"
}
```
## Options
Each transaction method consists of input data (data) and options.
**This is an optional parameter!**
```js
const options = {
  feeCoin: 'BTC', // The coin that pays commission
  message: 'my message', // Any additional information about the transaction
  gasLimit: '9000000000000000000', // The maximum amount of gas you are willing to pay for a transaction
  mode: 'sync', // broadcast mode {sync | async | block}
};
```

## Tx utils

### getTransaction()

```js
import {TX_TYPE} from 'decimal-js-sdk';

const broadcastTx = await decimal.getTransaction(TX_TYPE.COIN_SEND, data, options);
/*
{
  mode: "sync"
  tx: {
    fee: {amount: Array(0), gas: "9000000000000000000"},
    memo: "sdk test",
    msg: [{…}],
    signatures: [{…}]
  }
}
*/

```

### postTx()
```js
import {TX_TYPE} from 'decimal-js-sdk';

const broadcastTx = await decimal.getTransaction(TX_TYPE.COIN_SEND, data, options);
const result = await decimal.postTx(broadcastTx);

/*
{
  error: null
  hash: "244AA816B881BDA43704867574114D905631EFA3B6AFD0E401C7B603D8264DF8"
  success: true
}
*/
```

### estimateTxFee()
```js
const fee = await decimal.estimateTxFee(TX_TYPE.COIN_SEND, data, options);
console.log(fee); // 0.44
```

## API

### getCoinsList()
```js
const limit = 10;
const offset = 0;
const query = ''; // search
await decimal.getCoinsList(limit, offset, query);

/*
{
  "count": 5,
  "coins": [
    {
      "symbol": "mycoin",
      "title": "MYCOIN",
      "volume": "1023454326378015905553",
      "reserve": "12609116636032889229477",
      "crr": 10,
      "limitVolume": "2000000000000000000000",
      "creator": "dx1vkn4lje42gjmyghc3vneg0yqa39wfgqvh4f8zg",
      "txHash": "93AC6D86FF12BD9594889FEF4092542CBA6FEFA09F5E4A710D9E6CF12C1006A7",
      "blockId": 1529,
      "avatar": "data:image/png;base64...",
      "createdAt": "2020-07-28T14:09:38.852Z",
      "updatedAt": "2020-07-29T12:25:56.512Z"
    },
    // ...
  ]
}
*/
```
### getCoin()
```js
const coinTicker = 'MYCOIN'
await decimal.getCoin(coinTicker);

/*
{
  "symbol": "mycoin",
  "title": "MYCOIN",
  "volume": "1022451550064246238748",
  "reserve": "12486116326032889229477",
  "crr": 10,
  "limitVolume": "2000000000000000000000",
  "creator": "dx1vkn4lje42gjmyghc3vneg0yqa39wfgqvh4f8zg",
  "txHash": "93AC6D86FF12BD9594889FEF4092542CBA6FEFA09F5E4A710D9E6CF12C1006A7",
  "blockId": 1529,
  "avatar": "data:image/png;base64..."
  "createdAt": "2020-07-28T14:09:38.852Z",
  "updatedAt": "2020-07-29T08:09:44.203Z"
}
*/
```

### getAddress()

```js
const address = 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g'
await decimal.getAddress(address);

/*
{
  "address": {
    "id": 31,
    "address": "dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g",
    "type": "single",
    "balance": {
      "tdel": "14999120000000000000000"
    },
    "nonce": 2,
    "txes": 5,
    "createdAt": "2020-07-29T07:48:15.089Z",
    "updatedAt": "2020-07-29T08:07:36.086Z",
    "totalStake": null,
    "txs": [
      // ...
    ]
  },
  "coins": [
    // ...
  ]
}
*/
```

### getMeta()
```js
await decimal.getMeta();

/*
{
  "account_number": "33",
  "sequence": "2",
  "chain_id": "decimal-testnet-07-28-18-30"
}
*/
```
### getMultisigsByAddress()
```js
const address = 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g'
await decimal.getMultisigsByAddress(address);
/*
{
  "count": 4,
  "wallets": [
    {
      "id": 1,
      "address": "dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g",
      "multisig": "dx1q8957kzw3dxvc2gndc0cwqq3v35xfrrl76tdsw",
      "weight": 1,
      "createdAt": "2020-07-29T09:50:47.842Z",
      "updatedAt": "2020-07-29T09:50:47.842Z",
      "wallet": {
        "address": "dx1q8957kzw3dxvc2gndc0cwqq3v35xfrrl76tdsw",
        "threshold": 2,
        "creator": "dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g",
        "createdAt": "2020-07-29T09:50:47.839Z",
        "updatedAt": "2020-07-29T09:50:47.839Z"
      }
    },
    {
      // ...
    }
  ]
}
*/
```
### getMultisig()
```js
const multisigAddress = 'dx1q8957kzw3dxvc2gndc0cwqq3v35xfrrl76tdsw';
await decimal.getMultisig(multisigAddress);

/*
{
  "address": "dx1q8957kzw3dxvc2gndc0cwqq3v35xfrrl76tdsw",
  "threshold": 2,
  "creator": "dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g",
  "createdAt": "2020-07-29T09:50:47.839Z",
  "updatedAt": "2020-07-29T09:50:47.839Z",
  "owners": [
    {
      "id": 1,
      "address": "dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g",
      "multisig": "dx1q8957kzw3dxvc2gndc0cwqq3v35xfrrl76tdsw",
      "weight": 1,
      "createdAt": "2020-07-29T09:50:47.842Z",
      "updatedAt": "2020-07-29T09:50:47.842Z"
    },
    {
      "id": 2,
      "address": "dx1tnqtm4kr9r2584wehzvtvvycq3zvm9s3tp6rdw",
      "multisig": "dx1q8957kzw3dxvc2gndc0cwqq3v35xfrrl76tdsw",
      "weight": 1,
      "createdAt": "2020-07-29T09:50:47.846Z",
      "updatedAt": "2020-07-29T09:50:47.846Z"
    }
  ],
  "txs": [
    {
      "transaction": "dxmstx1mxpwmc7skej00chq4ryzfs3rysz980wtnsdfws",
      "hashTx": "D6F7DAC81F52D9FEE522582D0E77D2F75C4737B3D313B343F01132399F5CDD93",
      "hashSign": null,
      "confirmed": false,
      "confirmations": 1,
      "data": {
        "dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g": {
          "timestamp": "2020-07-29T10:34:37.925Z",
          "signer_weight": 1
        },
        "dx1tnqtm4kr9r2584wehzvtvvycq3zvm9s3tp6rdw": {
          "timestamp": null,
          "signer_weight": null
        }
      },
      "coin": [
        {
          "coin": "tdel",
          "amount": "4000000000000000000"
        }
      ],
      "address": "dx1q8957kzw3dxvc2gndc0cwqq3v35xfrrl76tdsw",
      "to": "dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g",
      "createdAt": "2020-07-29T10:34:37.926Z",
      "updatedAt": "2020-07-29T10:34:37.926Z"
    }
  ],
  "account": {
    "id": 33,
    "address": "dx1q8957kzw3dxvc2gndc0cwqq3v35xfrrl76tdsw",
    "type": "multisig",
    "balance": {
      "tdel": "14892500000000000000000"
    },
    "nonce": null,
    "txes": 2,
    "createdAt": "2020-07-29T09:50:47.836Z",
    "updatedAt": "2020-07-29T11:43:52.372Z"
  }
}
*/
```
### getMultisigTxs()
```js
const multisigAddress = 'dx1q8957kzw3dxvc2gndc0cwqq3v35xfrrl76tdsw';
const limit = 10;
const offset = 0;

await decimal.getMultisigTxs(multisigAddress, limit, offset);

/*
{
  "count": 1,
  "txs": [
    {
      "transaction": "dxmstx1mxpwmc7skej00chq4ryzfs3rysz980wtnsdfws",
      "hashTx": "D6F7DAC81F52D9FEE522582D0E77D2F75C4737B3D313B343F01132399F5CDD93",
      "hashSign": null,
      "confirmed": false,
      "confirmations": 1,
      "data": {
        "dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g": {
          "timestamp": "2020-07-29T10:34:37.925Z",
          "signer_weight": 1
        },
        "dx1tnqtm4kr9r2584wehzvtvvycq3zvm9s3tp6rdw": {
          "timestamp": null,
          "signer_weight": null
        }
      },
      "coin": [
        {
          "coin": "tdel",
          "amount": "4000000000000000000"
        }
      ],
      "address": "dx1q8957kzw3dxvc2gndc0cwqq3v35xfrrl76tdsw",
      "to": "dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g",
      "createdAt": "2020-07-29T10:34:37.926Z",
      "updatedAt": "2020-07-29T10:34:37.926Z"
    }
  ]
}
*/
```
### getStakesByAddress()
```js
const address = 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g';

await decimal.getStakesByAddress(address);

/*
{
  "validators": [
    {
      "validatorId": "dxvaloper1ajytg8jg8ypx0rj9p792x32fuxyezga4dq2uk0",
      "stakes": [
        {
          "coin": "tdel",
          "amount": "500000000000000000000",
          "baseAmount": "500000000000000000000",
          "unbondAmount": null
        }
      ],
      "totalStake": "500000000000000000000",
      "validator": {
        "address": "dxvaloper1ajytg8jg8ypx0rj9p792x32fuxyezga4dq2uk0",
        "consensusAddress": "dxvalcons17ntss5hyuutk5w4a4upptz3xc9f3f0tgwwmfw8",
        "rewardAddress": "dx1ajytg8jg8ypx0rj9p792x32fuxyezga43jd3ry",
        "moniker": "test-node-fra1-02",
        "website": "decimalchain.com",
        "details": "Declaring validator on test-node-fra1-02",
        "identity": null,
        "security_contact": null,
        "blockId": 0,
        "skippedBlocks": 0,
        "delegators": 2,
        "fee": "0.100000000000000000",
        "slots": 2,
        "mins": "0",
        "stake": "40000500000000000000000000",
        "power": "40000500",
        "rating": null,
        "status": "online",
        "kind": "Validator",
        "createdAt": "2020-07-28T11:48:06.658Z",
        "updatedAt": "2020-07-29T12:51:33.002Z"
      }
    }
  ],
  "total": "500000000000000000000"
}
*/

```
### getValidator()
```js
const validatorAddress = 'dxvaloper1ajytg8jg8ypx0rj9p792x32fuxyezga4dq2uk0';

await decimal.getValidator(validatorAddress);

/*
{
  "address": "dxvaloper1ajytg8jg8ypx0rj9p792x32fuxyezga4dq2uk0",
  "consensusAddress": "dxvalcons17ntss5hyuutk5w4a4upptz3xc9f3f0tgwwmfw8",
  "rewardAddress": "dx1ajytg8jg8ypx0rj9p792x32fuxyezga43jd3ry",
  "moniker": "test-node-fra1-02",
  "website": "decimalchain.com",
  "details": "Declaring validator on test-node-fra1-02",
  "identity": null,
  "security_contact": null,
  "blockId": 0,
  "skippedBlocks": 0,
  "delegators": 2,
  "fee": "0.100000000000000000",
  "slots": 2,
  "mins": "0",
  "stake": "40000500000000000000000000",
  "power": "40000500",
  "rating": null,
  "status": "online",
  "kind": "Validator",
  "createdAt": "2020-07-28T11:48:06.658Z",
  "updatedAt": "2020-07-29T12:51:33.002Z"
}
*/
```

## getMyTransactions()
```js
const limit = 10;
const offset = 0;
const types = '';

await decimal.getMyTransactions(limit, offset ,types);

/*
{
  "count": 27,
  "txs": [
    {
      "id": 101,
      "hash": "E248CD76554521D0FB021E9AC666CC4B3511F974992771CD2AB7904F8ABE608C",
      "timestamp": "2020-07-29T13:26:35.194Z",
      "status": "Success",
      "type": "set_offline",
      "fee": {
        "gas_coin": null,
        "gas_used": "408000000000000000",
        "gas_amount": null,
        "gas_used_number": 408000000000000000
      },
      "data": {
        "log": "",
        "coin": "",
        "check": "",
        "coins": "",
        "proof": "",
        "title": "",
        "amount": "",
        "issuer": "",
        "owners": "",
        "sender": "",
        "symbol": "",
        "wallet": "",
        "weights": "",
        "coin_base": "",
        "confirmed": null,
        "due_block": "",
        "recipient": "",
        "threshold": "",
        "coin_check": "",
        "commission": "",
        "amount_base": "",
        "coin_to_buy": "",
        "nonce_check": null,
        "transaction": "",
        "amount_check": "",
        "coin_to_sell": "",
        "limit_volume": "",
        "amount_to_buy": "",
        "confirmations": null,
        "signer_weight": null,
        "amount_to_sell": "",
        "initial_volume": "",
        "reward_address": "",
        "validator_desc": {
          "details": "",
          "moniker": "",
          "website": "",
          "identity": "",
          "security_contact": ""
        },
        "completion_time": "",
        "initial_reserve": "",
        "delegator_address": "",
        "min_amount_to_buy": "",
        "validator_address": "dxvaloper13ykakvugqwzqqmqdj2j2hgqauxmftdn32jrhsr",
        "max_amount_to_sell": "",
        "multisend_receivers": "",
        "constant_reserve_ratio": null
      },
      "nonce": 23,
      "code": 0,
      "message": "",
      "blockId": 16607,
      "from": "dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g",
      "to": null,
      "createdAt": "2020-07-29T13:26:41.244Z",
      "updatedAt": "2020-07-29T13:26:41.244Z"
    }
    // ....
  ]
}
*/

```

## Coins

### sendCoins()

```js
const data = {
  to: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
  coin: 'tDEL',
  amount: '100', // 100 tDEL
}

await decimal.sendCoins(data, options);
```

### multisendCoins()

```js
const data = [
  {
    to: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
    coin: 'tDEL',
    amount: '100'
  },
  {
    to: 'dx13m9gxeru45wxlcqk9dxf4vlewslauwr8try0tl',
    coin: 'tDEL',
    amount: '50'
  },
]

await decimal.multisendCoins(data, options);
```

### buyCoins()

```js
const data = {
  buyCoin: 'BTC',
  amount: '10',
  spendCoin: 'DEL',
  maxSpendLimit: '20', // Optionally
}

await decimal.buyCoins(data, options);
```
<a name="sellCoins"></a>

### sellCoins()

```js
const data = {
  sellCoin: 'DEL',
  amount: '10',
  getCoin: 'ETH',
  minBuyLimit: '2', // Optionally
}

await decimal.sellCoins(data, options);
```
<a name="sellAllCoins"></a>

### sellAllCoins()
```js
const data = {
  sellCoin: 'BTC',
  getCoin: 'DEL',
  minBuyLimit: '10', // Optionally
}

await decimal.sellAllCoins(data, options);
```

### createCoin()
```js
const data = {
    title: 'Test coin',
    ticker: 'TESTTT',
    initSupply: '50000',
    maxSupply: '100000',
    reserve: '12000',
    crr: '45',
}

await decimal.createCoin(data, options);
```

## Validators

### validatorDelegate()
```js
const data = {
    address: 'dxvaloper1ajytg8jg8ypx0rj9p792x32fuxyezga4dq2uk0',
    coin: 'tdel',
    stake: '10',
}

await decimal.validatorDelegate(data, options);
```
### validatorUnbond()
```js
const data = {
    address: 'dxvaloper1ajytg8jg8ypx0rj9p792x32fuxyezga4dq2uk0',
    coin: 'tdel',
    stake: '10',
}

await decimal.validatorUnbond(data, options);
```
### validatorDeclare()
```js
const data = {
    rewardAddress: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
    coin: 'tdel',
    stake: '10',
    pubKey: 'JRlv38BXuD1TvWQJ9ic1KHr8PzuOITZH3rD8Zm0Vj3Y=',
    commission: '10',
    description: {
      moniker: 'my-node-123',
      identity: '',
      website: 'hello.ru',
      securityContact: 'test@test.com',
      details: 'details node',
    },
}

await decimal.validatorDeclare(data, options);
```
### validatorEdit()
```js
const data = {
    rewardAddress: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
    description: {
      moniker: 'my-node-123-edit',
      identity: '321',
      website: 'hello.ru',
      securityContact: 'test@test.com',
      details: 'details node',
    },
}

await decimal.validatorEdit(data, options);
```
### validatorOn()
```js
await decimal.validatorOn(options);
```
### validatorOff
```js
await decimal.validatorOff(options);
```

## Checks

### issueCheck()
```js
const data = {
    nonce: '34',
    coin: 'tdel',
    amount: '100',
    password: '123',
    dueBlock: '999999999',
}

await decimal.issueCheck(data, options);
```
### redeemCheck()
```js
const data = {
    check: 'ERp9FR24Vz19XG....',
    password: '123',
}

await decimal.redeemCheck(data, options);
```

## Multisig

### multisigCreateWallet()
```js
const data = {
    owners: ['dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g', 'dx1v9macmluxh7rk3zsd69v7dwv9fsjhctn2jfhz9'],
    weights: ['1', '1'],
    threshold: '2',
}

await decimal.multisigCreateWallet(data, options);
```
### multisigCreateTx()
```js
const data = {
    from: 'dx1am6ke3l79kjzdqhwgx37em04mzg686ekf9p3pq',
    to: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
    coin: 'tdel',
    amount: '10',
}

await decimal.multisigCreateTx(data, options);
```
### multisigSignTx()
```js
const data = {
  txId: 'dxmstx1tqmjch2x5uk9wgnu8zl88rj6h4hy8rm8mtqfft'
}

await decimal.multisigSignTx(data, options);
```