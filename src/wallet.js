import * as bip39 from 'bip39';
import { createWalletFromMnemonic } from '@tendermint/sig';

const prefix = 'dx';
const path = "m/44'/60'/0'/0/0";

export function generateMnemonic() {
  return bip39.generateMnemonic();
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
    const wallet = createWalletFromMnemonic(_mnemonic, '', prefix, path);

    this.mnemonic = _mnemonic;
    this.privateKey = wallet.privateKey;
    this.publicKey = wallet.publicKey;
    this.address = wallet.address;
  }

  getPrivateKeyString() {
    return this.privateKey.toString('hex');
  }

  getPublicKeyString() {
    return this.publicKey.toString('hex');
  }
}
