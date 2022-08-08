const { decode } = require('bech32');
const { publicKeyConvert } = require('secp256k1')
const bech32 = require('bech32-buffer')
const CryptoJS = require('crypto-js')
const rlp = require('rlp')
const sha3 = require('js-sha3');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');
const decimalSdk = require('./dist/decimal-sdk-node')
const cosmos = require('@cosmos-client/core')
const Long = require('long');
const mnemonic_dec2 = 'hold liquid enhance slim clerk frame grape welcome hybrid tower window grab bottom cluster cry tonight need depart table april good jar suspect napkin'
const cosmosclient = cosmos.default;
const { proto, rest } = cosmosclient;
const { Wallet, Decimal } = decimalSdk;
const options = {
    gateUrl: 'https://devnet-dec2.console.decimalchain.com/api/',
};

(async () => {
    const wallet = new Wallet(mnemonic_dec2, options);
    const keyPair = ec.genKeyPair();
    console.log(keyPair.getPrivate('hex'))
    // console.log(wallet.publicKey);
    // const publicKey = wallet.publicKey;
    // console.log(decompressedPublicKey)
})()