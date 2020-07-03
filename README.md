# Decimal JS SDK

For detailed explanation on how things work, checkout the:

- [Decimal SDK docs](https://help.decimalchain.com/sdk/).
- [Decimal Console site](https://console.decimalchain.com/).

# Install

```bash
$ npm install decimal-js-sdk
```

# Usage

Send coins
```js

import { Wallet, Decimal } from 'decimal-js-sdk';

// Optionally. Used for generating offline transactions
const meta = {
  account_number: "10",
  chain_id: "decimal-testnet-06-30-15-30",
  sequence: "198"
}

const wallet = new Wallet(/*your mnemonic*/);
const decimal = new Decimal({ baseURL: 'https://testnet-gate.decimalchain.com/api/', wallet, meta })

const txResult = await decimal.sendCoins(data, options); // see sendCoins for details
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

- [API](#api)
  - [getAddress]()
  - [getCoinsList]()
  - [getCoin]()
  - [getNonce]()
  - [getMultisigsByAddress]()
  - [getMultisig]()
  - [getMultisigTxs]()
  - [getStakesByAddress]()
  - [getValidator]()
- [Tx utils]()
  - [prepareTx]()
  - [makeSignature]()
  - [postTx]()
  - [getTransaction]()
  - [estimateTxFee]()
- [Coins](#coins)
  - [sendCoin](#sendCoins)
  - [buyCoins](#buyCoins)
  - [sellCoins](#sellCoins)
  - [sellAllCoins](#sellAllCoins)
  - [createCoin]()
- [Validators]()
  - [validatorDelegate]()
  - [validatorUnbond]()
  - [validatorDeclare]()
  - [validatorEdit]()
  - [validatorOn]()
  - [validatorOff]()
- [Checks]()
  - [issueCheck]()
  - [redeemCheck]()
- [Multisig]()
  - [multisigCreateWallet]()
  - [multisigCreateTx]()
  - [multisigSignTx]()



## Coins
<a name="coins"></a> 

### sendCoins()
<a name="sendCoins"></a>

```js
const data = {
  to: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
  coin: 'tdel',
  amount: '100',
}

// Optionally.
const options = {
  feeCoin: 'MYCOIN',
  message: 'some text',
  gasLimit: '9000000000000000000',
}

decimal.sendCoins(data, options);
```

### buyCoins()
<a name="buyCoins"></a>

```js
const data = {
  buyCoin: 'BTC',
  amount: '10',
  spendCoin: 'DEL',
  maxSpendLimit: '20', // Optionally
}

// Optionally.
const options = {
  feeCoin: 'MYCOIN',
  message: 'some text',
  gasLimit: '9000000000000000000',
}

decimal.buyCoins(data, options);
```
### sellCoins()
<a name="sellCoins"></a>

```js
const data = {
  sellCoin: 'DEL',
  amount: '10',
  getCoin: 'ETH',
  minBuyLimit: '2', // Optionally
}

// Optionally.
const options = {
  feeCoin: 'MYCOIN',
  message: 'some text',
  gasLimit: '9000000000000000000',
}

decimal.sellCoins(data, options);
```
### sellAllCoins()
<a name="sellAllCoins"></a>

```js
const data = {
  sellCoin: 'BTC',
  getCoin: 'DEL',
  minBuyLimit: '10', // Optionally
}

// Optionally
const options = {
  feeCoin: 'MYCOIN',
  message: 'some text',
  gasLimit: '9000000000000000000',
}

decimal.sellAllCoins(data, options);
```



