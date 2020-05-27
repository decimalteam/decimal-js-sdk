# Decimal JS SDK

For detailed explanation on how things work, checkout the:

- [Decimal SDK docs](https://help.decimalchain.com/sdk/).
- [Decimal Console site](https://console.decimalchain.com/).

## Install

```bash
$ npm install decimal-js-sdk
```
## Publish

```bash
$ git commit -m "message"
$ npm version patch
$ git push
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

## Decimal instance

```js
import Decimal from 'decimal-js-sdk';
const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', chainId: 'decimal-testnet' });
```
### .getCoinsList()
```js
const coins = await decimal.getCoinsList(limit, offset, query)
```
### .getCoin()
```js
const coin = await decimal.getCoin('tDEL');
```
### .getAddress()
```js
const address = await decimal.getAddress(addressId, txLimit);
```

### .sendCoins()
```js
const txParams = {
  data: {
    sender: 'dx1twxl6ajpzur08mscql5z56r2n7eyurpy5q0hnp',
    receiver: 'dx12k95ukkqzjhkm9d94866r4d9fwx7tsd82r8pjd',
    coin: 'tDEL',
    amount: '50000000000000',
  },
  gas: '200000',
  message: 'message'
};

decimal.sendCoins(txParams, wallet);
```

### .buyCoins()
```js
const txParams = {
  data: {
    buyer: 'dx1twxl6ajpzur08mscql5z56r2n7eyurpy5q0hnp',
    coin_to_buy: 'CRT',
    coin_to_sell: 'tDEL',
    amount_to_buy: '500000',
    amount_to_sell: '100000',
  },
  gas: '200000',
  message: 'message'
};

decimal.buyCoins(txParams, wallet);
```

### .sellCoins()
```js
const txParams = {
  data: {
    seller: 'dx1twxl6ajpzur08mscql5z56r2n7eyurpy5q0hnp',
    coin_to_buy: 'CRT',
    coin_to_sell: 'tDEL',
    amount_to_buy: '500000',
    amount_to_sell: '100000',
  },
  gas: '200000',
  message: 'message'
}

decimal.sellCoins(txParams, wallet);
```

### .sellAllCoins()
```js
const txParams = {
  data: {
    seller: 'dx1twxl6ajpzur08mscql5z56r2n7eyurpy5q0hnp',
    coin_to_sell: 'tDEL',
    coin_to_buy: 'CRT',
    amount_to_buy: '500',
  },
  gas: '200000',
  message: 'message'
}

decimal.sellAllCoins(txParams, wallet);
```

### .createCoin()
```js
const txParams = {
  data: {
    creator: 'dx1twxl6ajpzur08mscql5z56r2n7eyurpy5q0hnp',
    title: 'Test coin',
    symbol: 'TST',
    constant_reserve_ratio: '45',
    initial_volume: '1000000000000000000',
    initial_reserve: '1000000000000000000000',
    limit_volume: '1000000000000000000000000000',
  },
  gas: '200000',
  message: 'message'
}

decimal.createCoin(txParams, wallet);
```