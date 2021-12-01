# Decimal JS SDK 

For detailed explanation on how things work, checkout the:

- [Decimal SDK docs](https://help.decimalchain.com/api-sdk/).
- [Decimal Console site](https://console.decimalchain.com/).

# Install

```bash
$ npm install decimal-js-sdk
```

# Usage

## Connecting

You can provide your own Decimal node address to send transactions to the network, or you can use our gateways to do this and much more. Gateway URLs are provided below.

MAINNET -
https://mainnet-gate.decimalchain.com/api/

TESTNET -
https://testnet-gate.decimalchain.com/api/

Depending on what you wish to use provide either gateURL or restURL (your node rest service url) in config object passed to the Decimal instance

```js

const options = {
   gateURL: 'https://testnet-gate.decimalchain.com/api/',
   // restURL: 'https://your-node.example.com/rest' if you want to use your own Decimal node instance
}
// baseURL option used in old versions is now deprecated
const decimal = new Decimal(options);
```

The following code can be used to generate **mnemonic** or use your mnemonic

```js
const bip39 = require("bip39");
const mnemonic = bip39.generateMnemonic();
```

## Send coins

### CommonJS

```js
const {Wallet, Decimal} = require('decimal-js-sdk'); // For server use 'decimal-js-sdk/dist/decimal-sdk-node'

const wallet = new Wallet( /*your mnemonic*/);
const options = {
   restURL: 'https://your-node.example.com/rest' if you want to use your own Decimal node instance
}
// baseURL option used in old versions is now deprecated
const decimal = new Decimal(options);

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

import {Wallet, Decimal} from 'decimal-js-sdk';

const wallet = new Wallet(/*your mnemonic*/);
const decimal = new Decimal({gateURL: 'https://testnet-gate.decimalchain.com/api/', wallet})

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
import {Wallet} from 'decimal-js-sdk';

const wallet = new Wallet();
```

### Generate wallet from mnemonic

```js
import {Wallet} from 'decimal-js-sdk';

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
- [Utilities](#Utilities)
    - [verifyAddress](#verifyAddress)
- [API](#api)
    - [getCoinsList](#getcoinslist)
    - [getCoin](#getcoin)
    - [getAddress](#getaddress)
    - [getMeta](#getmeta)
    - [getMultisigsByAddress](#getmultisigsbyaddress)
    - [getMultisig](#getmultisig)
    - [getMultisigTxs](#getmultisigtxs)
    - [getNft](#getNft)
    - [getNfts](#getNfts)
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
- [Checks](#nfts)
    - [nftMint](#nftmint)
    - [nftBurn](#nftburn)
    - [nftTransfer](#nfttransfer)
    - [nftDelegate](#nftdelegate)
    - [nftUnbond](#nftunbond)
    - [nftUpdateReserve](#nftupdatereserve)
- [Swap](#swap)
    - [swapInit](#swap-init)
    - [swapRedeem](#swap-redeem)
- [NFTs](#checks)
    - [issueCheck](#issuechek)
    - [redeemCheck](#redeemcheck)
- [Multisig](#multisig)
    - [multisigCreateWallet](multisigcreatewallet)
    - [multisigCreateTx](multisigcreatetx)
    - [multisigSignTx](multisigsigntx)

## Network

Additionally, you can pass network parameter to enable network specific features:

```js
const decimal = new Decimal({
    gateURL: 'https://testnet-gate.decimalchain.com/api/',
    network: 'testnet', // Enable testnet only txs types
    wallet,
    meta
})
```

Available networks: ['mainnet', 'testnet', 'devnet']
If omitted defaults to 'mainnet', which is fine in most cases.

## Utilities

### verifyAddress

```js
decimal.verifyAddress(address, prefix = 'dx')
```
- examples:

```js
const decimal = new Decimal(...)

const isValid = await decimal.verifyAddress('dx13wv0w5w6uzkqceevtcefgc3sk0gg33vjuew2wy') // true

const isValidatorAddress = await decimal.verifyAddress('dxvaloper13wv0w5w6uzkqceevtcefgc3sk0gg33vjuew2wy', 'dxvaloper') // true

```

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

Please note, that these methods require gateURL to be provided

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
const address = 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g' // address of requested user, required property
const txLimit = 10; // optional property

await decimal.getAddress(address, txLimit);

/*
{
  "address": {
    "id": 31,
    "address": "dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g",
    "type": "single",
    "balance": {
      "tdel": "14999120000000000000000"
    },
    "balanceNft": [
      {
        amount: "1"
        collection: "testovaya"
        // if user's address then original cover of nft
        // else a placeholder image used for common display
        cover: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYI
        nftId: "4a482a53b16345bb625a214b2f9c3f2968461cd0"
        nftReserve: [{...}]
        nftStake: [{...}]
      }
    ],
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

await decimal.getMultisigsByAddress(address, txLimit);
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

### getNft()

```js
const id = '2ff8d64694c057777707739910f83f8bda53aa37'; // id of requested nft

await decimal.getNft(id);

/*

common fields for all users 

{
  allowMint: false
  blockId: 17187
  cover: "data:image/png;base64,iVBORw0KGgo..."
  createdAt: "2021-09-28T06:43:48.378Z"
  creator: "dx1wjewzht52hfy3m0rpm8usdmfk764ca4yrwd6q8"
  description: "token"
  headline: "tok"
  id: 422
  misc: {coverHash: '307a3e7ccac8dfbd522805d980e199e5e5dc1541', coverPath: 'cSWF9hjezHlgxCPvAj4DtjpIstBnvHHo_cover_93b28.png', coverExtension: 'png'}
  nftCollection: "tok"
  nftId: "2ff8d64694c057777707739910f83f8bda53aa37"
  nftReserve: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  nonFungible: false
  owners: (3) [{…}, {…}, {…}]
  quantity: "10"
  slug: "cSWF9hjezHlgxCPvAj4DtjpIstBnvHHo"
  startReserve: "100000000000000000000"
  status: "active"
  tokenUri: "https://devnet-nft.decimalchain.com/api/nfts/cSWF9hjezHlgxCPvAj4DtjpIstBnvHHo"
  totalReserve: "1000000000000000000000"
  txHash: "33A41B8C910F7BCB03958448F9F59401EC9D3089F5CF7C621248F2CE2E168063"
  updatedAt: "2021-09-28T06:43:58.071Z
}

if user is owner of requested nft then response is

{
  asset: 'assets/JeqShgz5ySuYgrDr2f5Cz8MrKTSP2pyk_0299a.png',
  ...commonFields,
}

if user is not owner of requested nft then response is

{
  asset: null,
  ...commonFields,
}

*/


```

### getNfts()

```js
const address = 'dx1wjewzht52hfy3m0rpm8usdmfk764ca4yrwd6q8'; // address of requested user with nfts, required property
const limit = 10; // optional property
const offset = 0; // optional property
const query = '2ff8d64694c05777770'; // nft id or nft collection to search, optional property

await decimal.getNfts(address, limit, offset, query);

/*

common fields for all users 

{
  count: 1,
  tokens: [{
    asset: null
    isPrivate: true
    allowMint: false
    blockId: 17187
    createdAt: "2021-09-28T06:43:48.378Z"
    creator: "dx1wjewzht52hfy3m0rpm8usdmfk764ca4yrwd6q8"
    description: "token"
    headline: "tok"
    id: 422
    nftCollection: "tok"
    nftId: "2ff8d64694c057777707739910f83f8bda53aa37"
    nftReserve: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    nonFungible: false
    owners: (3) [{…}, {…}, {…}]
    quantity: "10"
    slug: "cSWF9hjezHlgxCPvAj4DtjpIstBnvHHo"
    startReserve: "100000000000000000000"
    status: "active"
    tokenUri: "https://devnet-nft.decimalchain.com/api/nfts/cSWF9hjezHlgxCPvAj4DtjpIstBnvHHo"
    totalReserve: "1000000000000000000000"
    txHash: "33A41B8C910F7BCB03958448F9F59401EC9D3089F5CF7C621248F2CE2E168063"
    updatedAt: "2021-09-28T06:43:58.071Z
  }]
}

if user's address

{
  cover: "data:image/png;base64,iVBORw0KGgoAAAA...", // original cover of nft
  misc: {coverHash: '307a3e7ccac8dfbd522805d980e199e5e5dc1541', coverPath: 'cSWF9hjezHlgxCPvAj4DtjpIstBnvHHo_cover_93b28.png', coverExtension: 'png'}
  ...commonFields,
}

if not user's address

{
  // predefined data
  cover: "data:image/png;base64,FrrvfwqeyttytyT...", // a placeholder image used for common display
  misc: null,
  ...commonFields,
}

*/


```

### getNftTxes()

```js
const address = 'dx1wjewzht52hfy3m0rpm8usdmfk764ca4yrwd6q8'; // address of requested user with nfts, required property
const limit = 10; // optional property
const offset = 0; // optional property
const order = 'order[createdAt]=DESC'; // sort field and direction in format order[FIELD]=DIRECTION where DIRECTION in (DISC, ASC), optional property

await decimal.getNftTxes(address, limit, offset, order);

/*

common fields for all users 

{
  count: 1,
  txs: [{
    blockId: 648044
    code: 0
    cover: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUQ
    createdAt: "2021-10-15T04:53:40.411Z"
    creator: "dx1zenxxwspj8rnjstqyst9qvwaptq7jwwjnzul04"
    data: {log: "",…}
    description: "DAY"
    fee: {gas_coin: null, gas_used: "430000000000000000", gas_amount: null, gas_used_number: 430000000000000000}
    from: "dx1wjewzht52hfy3m0rpm8usdmfk764ca4yrwd6q8"
    hash: "7F3BFBBAB54373E7E83EA7ECAF32CB1C42BC5ED4CD37AE3ECBF984D3058E8F00"
    headline: "DAY"
    id: 528
    isPrivate: false
    message: ""
    misc: {coverHash: "6c37327f0e961595787924a89944894cd62d2a83",…}
    nonce: 119
    slug: "ndFK0PT2V1VmrEvd7F9jhzZLbG3b8cfI"
    status: "active"
    timestamp: "2021-11-15T10:15:52.669Z"
    to: null
    type: "delegate_nft"
    updatedAt: "2021-10-15T04:53:48.550Z"
  }]
}

if user's address

{
  cover: "data:image/png;base64,iVBORw0KGgoAAAA...", // original cover of nft
  misc: {coverHash: '307a3e7ccac8dfbd522805d980e199e5e5dc1541', coverPath: 'cSWF9hjezHlgxCPvAj4DtjpIstBnvHHo_cover_93b28.png', coverExtension: 'png'}
  ...commonFields,
}

if not user's address

{
  // predefined data
  cover: "data:image/png;base64,FrrvfwqeyttytyT...", // a placeholder image used for common display
  misc: null,
  ...commonFields,
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
      "stakesNfts": [
        {
           "baseQuantity": "1000",
           "nftCollection": "denom1",
           "quantity": "10",
           "unbondQuantity": "10"
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
  "total": "1000"
}
*/

```

### getNftStakesByAddress()

```js
const address = 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g';

await decimal.getNftStakesByAddress(address);

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

await decimal.getMyTransactions(limit, offset, types);

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

## NFTs

### nftMint()

```js
const data = {
    recipient: 'dx1lx4lvt8sjuxj8vw5dcf6knnq0pacre4w6hdh2v',
    // id: 'myId', If not present, UUID would be generated instead
    denom: 'phone',
    token_uri: 'https://develop.nft.decimalchain.com/api/nfts/pepe112',
    quantity: '1',
    reserve: '1',
    allow_mint: true,
}

await decimal.nftMint(data, options);
```

### nftBurn()

```js
const data = {
    denom: 'phone',
    id: 'd6ebb0c3-f075-43f2-ac60-ac0d02858154',
    sub_token_ids: ['1', '2']
}

await decimal.nftBurn(data, options);
```

### nftEditMetadata()

```js
const data = {
    denom: 'phone',
    id: 'd6ebb0c3-f075-43f2-ac60-ac0d02858154',
    token_uri: 'https://develop.nft.decimalchain.com/api/nfts/pepe112',
}

await decimal.nftEditMetadata(data, options);
```

### nftTransfer()

```js
const data = {
    recipient: 'dx1lx4lvt8sjuxj8vw5dcf6knnq0pacre4w6hdh2v',
    denom: 'phone',
    id: 'd6ebb0c3-f075-43f2-ac60-ac0d02858154',
    sub_token_ids: ['1', '2']
}

await decimal.nftTransfer(data, options);
```

### nftDelegate()

```js
const data = {
    denom: 'phone',
    id: 'd6ebb0c3-f075-43f2-ac60-ac0d02858154',
    validator_address: 'dxvaloper1mvqrrrlcd0gdt256jxg7n68e4neppu5tk872z3',
    sub_token_ids: ['1', '2']
}

await decimal.nftDelegate(data, options);
```

### nftUnbond()

```js
const data = {
    denom: 'phone',
    id: 'd6ebb0c3-f075-43f2-ac60-ac0d02858154',
    validator_address: 'dxvaloper1mvqrrrlcd0gdt256jxg7n68e4neppu5tk872z3',
    sub_token_ids: ['1', '2']
}

await decimal.nftUnbond(data, options);
```

### nftUpdateReserve()

```js
const data = {
    denom: 'phone', // nft collection name
    id: 'd6ebb0c3-f075-43f2-ac60-ac0d02858154', // nft id
    sub_token_ids: ['1', '2'], // sub token ids which need to be updated
    reserve: '3' // new nft sub tokens reserve in DELs
                 // must be greater than the current nft sub token reserve
                 // have to consider user's account balance in DEL, total reserve differences must be less than balance
}

await decimal.nftUpdateReserve(data, options);
```

## Swap

### Swap init

```js
const data = {
    recipient: '0x45376AD024c767577714C7B92882578aE8B7f98C',
    amount: '1',
    tokenName: 'decimal',
    tokenSymbol: 'DEL',
    destChain: '2',
}
await decimal.msgSwapInit(data, options)
```

### Swap redeem

```js

const data = {
    from: '0x856F08B12cB844fa05CDF1eBfFd303B091D34d09',
    amount: '2',
    recipient: 'dx1twj64nphm8zl98uxv7gnt6xg4tpkk4gyr3tux9',
    tokenName: 'muh coin',
    transactionNumber: 'qqqqqqqq',
    tokenSymbol: 'coin',
    fromChain: '2',
    v: 0x1c,
    r: '0xb8b3eb4980e649a65b7e136fbcafda4d12e3b11a40d8aaa7d951e13fbe483579',
    s: '0x74de77f4a9f4045992cf6f220cff9be67a2c0332124e60af0a6791c9b0a64c36',
}
await decimal.msgSwapInit(data, options)
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
