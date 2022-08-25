import * as bip39 from 'bip39';
import { createWalletFromMnemonic } from '@tendermint/sig';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
// import SpeculosTransport from '@ledgerhq/hw-transport-node-speculos';
import proposalAdresses from './proposalAddresses.json';
import { getAndUseGeneratedWallets, sendAndSaveGeneratedWallets, getTimestamp } from './utils';
import DecimalApp from './ledger/utils';
// import WebSocketTransport from './ledger/WebSocketTransport';
import HttpTransport from './ledger/HttpTransport';

// constants
const ADDRESS_PREFIX = 'dx';
const VALIDATOR_ADDRESS_PREFIX = 'dxvaloper';
const MASTER_DERIVATION_PATH = "m/44'/60'/0'/0/0";
export const MASTER_DERIVATION_PATH_ARRAY = [44, 60, 0, 0, 0];
const MNEMONIC_STRENGTH = 256;
const MAX_ACCOUNTS_NUMBER = 20;
const LEDGER_MODS = {
  usb: 'usb',
  emulator: 'emulator',
};

// generate derivation path for depth method
export function generateDerivationPath(depth) {
  if (!Number.isInteger(depth) || depth < 1) {
    throw new Error(`Invalid depth number ${depth}, must be integer number between 1 and ${MAX_ACCOUNTS_NUMBER}`);
  }
  const correctDepth = depth - 1;
  return `m/44'/60'/0'/0/${correctDepth}`;
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
  static async initLedger(mode, options = null, emulatorUrl = 'http://127.0.0.1:5000') {
    let transport;
    if (mode === LEDGER_MODS.usb) {
      transport = await TransportWebUSB.create();
    } else if (mode === LEDGER_MODS.emulator) {
      transport = await HttpTransport.open(emulatorUrl);
    } else {
      throw new Error('Not implemented connection type');
    }
    const path = MASTER_DERIVATION_PATH_ARRAY;
    const decimalNanoApp = new DecimalApp(transport);
    const validatorAddress = (await decimalNanoApp.getAddressAndPubKey(path, VALIDATOR_ADDRESS_PREFIX)).bech32_address;
    // eslint-disable-next-line camelcase
    const { compressed_pk, bech32_address } = await decimalNanoApp.getAddressAndPubKey(path, ADDRESS_PREFIX);
    const wallet = {
      publicKey: compressed_pk,
      privateKey: null,
      address: bech32_address,
      id: 0,
    };
    const ledgerOptions = {
      transport,
      wallet,
      validatorAddress,
      decimalNanoApp,
    };
    return new Wallet('', options, ledgerOptions);
  }

  // constructor
  constructor(mnemonic, options = null, ledgerOptions = null) {
    let wallet;
    let validatorAddress;
    // current mnemonic
    if (ledgerOptions) {
      // generate master wallet
      wallet = ledgerOptions.wallet;
      // generate validator address
      validatorAddress = ledgerOptions.validatorAddress;
      this.transport = ledgerOptions.transport;
      this.nanoApp = ledgerOptions.decimalNanoApp;
      this.mnemonic = '';
    } else {
      const _mnemonic = mnemonic || generateMnemonic();

      if (!validateMnemonic(_mnemonic)) {
        throw new Error('Invalid mnemonic');
      }

      // generate master wallet
      wallet = { ...createWalletFromMnemonic(_mnemonic, ADDRESS_PREFIX, MASTER_DERIVATION_PATH), id: 0 };

      // generate validator address
      validatorAddress = createWalletFromMnemonic(_mnemonic, VALIDATOR_ADDRESS_PREFIX, MASTER_DERIVATION_PATH).address;
      this.mnemonic = _mnemonic;
    }
    // master fields
    // master mnemonic to generate
    this.validatorAddress = validatorAddress; // do not need to change with derivation path update

    // current wallet
    this.wallet = wallet; // current wallet
    this.depth = 1; // current wallet depth
    this.id = 0; // current wallet account id

    // current private, public keys, address
    this.privateKey = wallet.privateKey; // current private key
    this.publicKey = wallet.publicKey; // current public key
    this.address = wallet.address; // current address

    // is available proposal submit
    this.availableProposalSubmit = !!(proposalAdresses.addresses.find((address) => address === wallet.address));

    // gate url
    this.gateUrl = options && options.gateUrl ? options.gateUrl : null;

    // get generated wallets including master wallet
    this.wallets = [wallet];

    // current nonce for sending transactions and lifetime of the current nonce, valid for 6 secs
    this.currentNonce = null;
    this.currentNonceValidUntil = null;
  }

  // get private key in hex
  getPrivateKeyString() {
    return this.privateKey.toString('hex');
  }

  // get public key in hex
  getPublicKeyString() {
    return this.publicKey.toString('hex');
  }

  // switch to account by id private method
  switchAccount(id) {
    try {
      // if id does not exist
      if (typeof id === 'undefined' || !Number.isInteger(id)) {
        throw new Error('Id must be of type number');
      }

      // if id more then generated accounts
      if (id > this.depth) {
        throw new Error(`You have not generated an account with ${id} id`);
      }

      // current wallet
      const wallet = this.wallets[id];
      // update current wallet
      this.wallet = wallet;
      this.id = id;

      // update current private, public keys, address
      this.privateKey = wallet.privateKey; // current private key
      this.publicKey = wallet.publicKey; // current public key
      this.address = wallet.address; // current address

      // update current nonce for sending transactions and lifetime of the current nonce
      this.updateNonce(null);
    } catch (e) {
      console.error(e);
    }
  }

  // generate next account and switch to last
  generateAccount() {
    try {
      // current depth
      const depth = this.depth + 1;

      // if depth more then max available amount
      if (depth >= MAX_ACCOUNTS_NUMBER) {
        throw new Error(`You can not generate more then ${MAX_ACCOUNTS_NUMBER} accounts`);
      }

      // current derivation path
      const derivationPath = generateDerivationPath(depth);

      // current wallet
      const wallet = { ...createWalletFromMnemonic(this.mnemonic, ADDRESS_PREFIX, derivationPath), id: depth - 1 };

      // update current wallet
      this.depth = depth;

      // update wallets
      this.wallets = [...this.wallets, wallet];

      // update wallet
      this.switchAccount(depth - 1);
    } catch (e) {
      console.error(e);
    }
  }

  // generate accounts and switch if necessary
  generateAndSwitchAccount(depth, id) {
    try {
      // if depth does not exist
      if (typeof depth === 'undefined' || !Number.isInteger(depth)) {
        throw new Error('Depth must be of type number');
      }

      // id depth more then max available amount
      if (depth >= MAX_ACCOUNTS_NUMBER) {
        throw new Error(`You can not generate more then ${MAX_ACCOUNTS_NUMBER} accounts`);
      }

      let _id = id;

      // if id does not exist
      if (typeof id === 'undefined' || !Number.isInteger(id)) {
        _id = Math.max(depth, this.depth) - 1;
      }

      // if id more then max depth
      if (_id >= Math.max(depth, this.depth)) {
        throw new Error(`You can not switch to account, more then ${depth - 1} id`);
      }

      // if depth less or equal to current depth
      if (depth <= this.depth) {
        // swith account
        this.switchAccount(_id);
      }

      // generate accounts to depth amount
      for (let _depth = this.depth + 1; _depth <= depth; _depth += 1) {
        let hasWalletInArrayWallets = true;

        // if wallet is already in this.wallets array
        this.wallets.forEach((wallet) => {
          if (wallet.id === _depth - 1) {
            hasWalletInArrayWallets = false;
          }
        });
        if (hasWalletInArrayWallets) {
          // current derivation path
          const derivationPath = generateDerivationPath(_depth);

          // current wallet
          const wallet = { ...createWalletFromMnemonic(this.mnemonic, ADDRESS_PREFIX, derivationPath), id: _depth - 1 };

          // update current wallet
          this.depth = _depth;

          // update wallets
          this.wallets = [...this.wallets, wallet];
        }
      }

      // swith account
      this.switchAccount(_id);
    } catch (e) {
      console.error(e);
    }
  }

  async getAndUseGeneratedWallets() {
    try {
      if (!this.gateUrl) {
        throw new Error('You did not set the gate url');
      }

      const masterWallet = { ...createWalletFromMnemonic(this.mnemonic, ADDRESS_PREFIX, MASTER_DERIVATION_PATH), id: 0 };

      const ids = await getAndUseGeneratedWallets(this.gateUrl, masterWallet.address);

      if (ids && ids.length) {
        this.wallets = [masterWallet];
        this.switchAccount(masterWallet.id);
        ids.forEach((id) => {
          if (id !== masterWallet.id) {
            const derivationPath = generateDerivationPath(id + 1);
            const wallet = { ...createWalletFromMnemonic(this.mnemonic, ADDRESS_PREFIX, derivationPath), id };
            this.wallets.push(wallet);
          }
        });

        this.depth = this.wallets.length;

        console.info('[GET-GENERATED-WALLETS-STATUS]: TRUE');
      } else console.info('[GET-GENERATED-WALLETS-STATUS]: FALSE');
    } catch (e) {
      console.error('An error occurred during wallet synchronization', e.message);

      console.warn('[GET-GENERATED-WALLETS-STATUS]: FALSE');
    }
  }

  async sendAndSaveGeneratedWallets() {
    try {
      const ids = this.wallets.map((wallet) => wallet.id);

      const updated = await sendAndSaveGeneratedWallets(this.gateUrl, this.wallets, ids);

      console.info(`[SAVE-GENERATED-WALLETS-STATUS]: ${updated.toString().toUpperCase()}`);
    } catch (e) {
      console.error('An error occurred during wallets\'s id adding', e.message);

      console.warn('[SAVE-GENERATED-WALLETS-STATUS]: FALSE');
    }
  }

  updateNonce(nonce) {
    this.currentNonce = nonce;
    this.currentNonceValidUntil = nonce ? getTimestamp() : null;
  }
}
