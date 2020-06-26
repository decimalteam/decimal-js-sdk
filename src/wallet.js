import * as bip39 from 'bip39';
import { createWalletFromMnemonic } from '@tendermint/sig';

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

    this.mnemonic = _mnemonic;
    this.privateKey = wallet.privateKey;
    this.publicKey = wallet.publicKey;
    this.address = wallet.address;
    this.validatorAddress = validatorAddress;
  }

  getPrivateKeyString() {
    return this.privateKey.toString('hex');
  }

  getPublicKeyString() {
    return this.publicKey.toString('hex');
  }
}
