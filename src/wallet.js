import * as bip39 from 'bip39';
import { createWalletFromMnemonic } from '@tendermint/sig';
import { fromSeed } from 'bip32';

const prefix = 'dx';
const validatorPrefix = 'dxvaloper';
const path = "m/44'/60'/0'/0/0";

export function generateMnemonic() {
  return bip39.generateMnemonic(256);
}

export function validateMnemonic(mnemonic) {
  return bip39.validateMnemonic(mnemonic);
}

export function mnemonicToSeedSync(mnemonic) {
  if (!validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic phrase');
  }
  return bip39.mnemonicToSeedSync(mnemonic);
}

// create wallet from mnemonic phrase
export default class Wallet {
  constructor(mnemonic) {
    const _mnemonic = mnemonic || generateMnemonic();

    if (!validateMnemonic(_mnemonic)) {
      throw new Error('Invalid mnemonic');
    }

    const wallet = createWalletFromMnemonic(_mnemonic, '', prefix, path);
    const validatorAddress = createWalletFromMnemonic(_mnemonic, '', validatorPrefix, path).address;

    // const test = b32.fromSeed(seed);

    this.mnemonic = _mnemonic;
    this.privateKey = wallet.privateKey;
    this.publicKey = wallet.publicKey;
    this.address = wallet.address;
    this.validatorAddress = validatorAddress;
    bip39.mnemonicToSeed(_mnemonic).then((res) => {
      this.seed = res;
      console.log(res);
      const test1 = fromSeed(res);
      console.log('test111', test1);
      console.log(test1.derivePath(path));
    });
  }

  getPrivateKeyString() {
    return this.privateKey.toString('hex');
  }

  getPublicKeyString() {
    return this.publicKey.toString('hex');
  }
}
