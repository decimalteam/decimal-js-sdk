import * as bip39 from 'bip39';
import { createWalletFromMnemonic } from '@tendermint/sig';
import proposalAdresses from './proposalAddresses.json';

// constants
const ADDRESS_PREFIX = 'dx';
const VALIDATOR_ADDRESS_PREFIX = 'dxvaloper';
const MASTER_DERIVATION_PATH = "m/44'/60'/0'/0/0";
const MNEMONIC_STRENGTH = 256;
const MAX_ACCOUNTS_NUMBER = 20;

// generate derivation path for depth method
export function generateDerivationPath(depth) {
  return `m/44'/60'/0'/0/${depth}`;
}

// generate random mnemonic method
export function generateMnemonic() {
  return bip39.generateMnemonic(MNEMONIC_STRENGTH);
}

// validate mnemonic method
export function validateMnemonic(mnemonic) {
  return bip39.validateMnemonic(mnemonic);
}

// mnemonic to seed method
export function mnemonicToSeedSync(mnemonic) {
  if (!validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic phrase');
  }
  return bip39.mnemonicToSeedSync(mnemonic);
}

// create wallet from mnemonic phrase
export default class Wallet {
  // constructor
  constructor(mnemonic) {
    // current mnemonic
    const _mnemonic = mnemonic || generateMnemonic();

    if (!validateMnemonic(_mnemonic)) {
      throw new Error('Invalid mnemonic');
    }

    // generate master wallet
    const wallet = createWalletFromMnemonic(_mnemonic, ADDRESS_PREFIX, MASTER_DERIVATION_PATH);

    // generate validator address
    const validatorAddress = createWalletFromMnemonic(_mnemonic, VALIDATOR_ADDRESS_PREFIX, MASTER_DERIVATION_PATH).address;

    // master fields
    this.mnemonic = _mnemonic; // master mnemonic to generate
    this.validatorAddress = validatorAddress; // do not need to change with derivation path update

    // current wallet
    this.wallet = wallet; // current wallet
    this.depth = 0; // current wallet depth
    this.id = 0; // current wallet account id

    // wallets
    this.wallets = [wallet]; // list of user's wallets

    // current private, public keys, address
    this.privateKey = wallet.privateKey; // current private key
    this.publicKey = wallet.publicKey; // current public key
    this.address = wallet.address; // current address

    // is available proposal submit
    this.availableProposalSubmit = !!(proposalAdresses.addresses.find((address) => address === wallet.address));
  }

  // get private key in hex
  getPrivateKeyString() {
    return this.privateKey.toString('hex');
  }

  // get public key in hex
  getPublicKeyString() {
    return this.publicKey.toString('hex');
  }

  // generate next account
  generateAccount() {
    // current depth
    const depth = this.depth + 1;

    if (depth >= MAX_ACCOUNTS_NUMBER) {
      throw new Error(`You can not generate more then ${MAX_ACCOUNTS_NUMBER} accounts`);
    }

    // current derivation path
    const derivationPath = generateDerivationPath(depth);

    // current wallet
    const wallet = createWalletFromMnemonic(this.mnemonic, ADDRESS_PREFIX, derivationPath);

    // update current wallet
    this.wallet = wallet;
    this.depth = depth;
    this.id = depth;

    // update wallets
    this.wallets = [...this.wallets, wallet];

    // update current private, public keys, address
    this.privateKey = wallet.privateKey; // current private key
    this.publicKey = wallet.publicKey; // current public key
    this.address = wallet.address; // current address
  }

  // switch to account by id private method
  switchAccount(id) {
    if (id > this.depth) {
      throw new Error(`You have not generated an account with ${id} id`);
    }

    const wallet = this.wallets[id];

    // update current wallet
    this.wallet = wallet;
    this.id = id;

    // update current private, public keys, address
    this.privateKey = wallet.privateKey; // current private key
    this.publicKey = wallet.publicKey; // current public key
    this.address = wallet.address; // current address
  }
}
