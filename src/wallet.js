import * as bip39 from 'bip39';
import { createAddress, createWalletFromMnemonic } from '@tendermint/sig';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import TransportWebBLE from '@ledgerhq/hw-transport-web-ble';
import { listen } from '@ledgerhq/logs';
// import SpeculosTransport from '@ledgerhq/hw-transport-node-speculos';
import proposalAdresses from './proposalAddresses.json';
import {
  getAndUseGeneratedWallets, sendAndSaveGeneratedWallets, getTimestamp, encodeEvmAccountAddress,
} from './utils';
import DecimalApp from './ledger/utils';
// import WebSocketTransport from './ledger/WebSocketTransport';
import HttpTransport from './ledger/HttpTransport';

const delay = (ms) => new Promise((success) => setTimeout(success, ms));
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
  bluetooth: 'bluetooth',
};

// generate derivation path for depth method
export function generateDerivationPath(depth) {
  if (!Number.isInteger(depth) || depth < 1) {
    throw new Error(`Invalid depth number ${depth}, must be integer number between 1 and ${MAX_ACCOUNTS_NUMBER}`);
  }
  const correctDepth = depth - 1;
  return `m/44'/60'/0'/0/${correctDepth}`;
}
export function generateDerivationPathArray(depth) {
  if (!Number.isInteger(depth) || depth < 1) {
    throw new Error(`Invalid depth number ${depth}, must be integer number between 1 and ${MAX_ACCOUNTS_NUMBER}`);
  }
  const correctDepth = depth - 1;
  const path = MASTER_DERIVATION_PATH_ARRAY;
  path[path.length - 1] = correctDepth;
  return path;
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
export async function initGeneratedLedgerWallet(transport, depth, empty = false) {
  if (empty) {
    return {
      publicKey: null,
      privateKey: null,
      address: null,
      evmAddress: null,
      id: depth - 1,
    };
  }
  const path = generateDerivationPathArray(depth);
  const decimalNanoApp = new DecimalApp(transport);
  // eslint-disable-next-line camelcase
  const { compressed_pk, bech32_address } = await decimalNanoApp.getAddressAndPubKey(path, ADDRESS_PREFIX);
  const evmAddress = encodeEvmAccountAddress(compressed_pk);
  const wallet = {
    publicKey: compressed_pk,
    privateKey: null,
    address: bech32_address,
    evmAddress,
    id: depth - 1,
  };
  return wallet;
}
export function createDecimalWalletFromMnemonic(
  mnemonic,
  addressPrefix = ADDRESS_PREFIX,
  derivation_path = MASTER_DERIVATION_PATH,
  id = 0,
) {
  const { privateKey, publicKey, address } = createWalletFromMnemonic(
    mnemonic,
    addressPrefix,
    derivation_path,
  );
  const evmAddress = encodeEvmAccountAddress(publicKey);

  const wallet = {
    privateKey,
    publicKey,
    address,
    evmAddress,
    id,
  };

  return wallet;
}
const openTimeout = 3000;
let instance;
// create wallet from mnemonic phrase
export default class Wallet {
  static async initLedger(mode, options = null, emulatorUrl = 'http://127.0.0.1:5000') {
    let transportId = null;
    let sub = null;
    // const needsInstanceRefresh = mode === LEDGER_MODS.bluetooth || (mode === LEDGER_MODS.usb && usbNeedsDisconnect);
    if (instance) {
      instance.disconnectLedger(mode);
      await delay(openTimeout);
      instance = null;
    }
    let transport;
    if (mode === LEDGER_MODS.usb) {
      transport = await TransportWebUSB.create();
    } else if (mode === LEDGER_MODS.bluetooth) {
      try {
        console.log('Mod Bluetooth');
        const res = await new Promise((resolve, reject) => {
          console.log('Before listen');
          sub = TransportWebBLE.listen({
            next: (e) => {
              console.log('Next: ', e);
              transportId = e.descriptor;
              const bleTransport = TransportWebBLE.open(transportId, openTimeout);
              resolve(bleTransport);
            },
            error: (e) => {
              console.log('Error: ', e);
              reject(e);
            },
            complete: () => {
              sub.unsubscribe();
              console.log('complete');
              resolve(null);
            },
          });
        });
        if (res) {
          window.ledgerTransport = transport;
          console.log('found device in listen module');
          transport = res;
          TransportWebBLE.observeAvailability((e) => {
            console.log('observeAvailability', e);
          });
          listen((cb) => {
            console.log(cb);
          });
        } else {
          throw new Error('Completed, but not found device');
        }
      } catch (e) {
        console.log('Caught in initLedger', e);
      }
    } else if (mode === LEDGER_MODS.emulator) {
      transport = await HttpTransport.open(emulatorUrl);
    } else {
      throw new Error('Not implemented connection type');
    }
    const path = MASTER_DERIVATION_PATH_ARRAY;
    const decimalNanoApp = new DecimalApp(transport);
    let wallet;
    if (transport) {
      transport.on('disconnect', (e) => {
        console.log('transport event: ', e);
      });
    }
    if (options.masterAddress) {
      wallet = {
        publicKey: null,
        privateKey: null,
        address: options.masterAddress,
        evmAddress: null,
        id: 0,
      };
    } else {
      // eslint-disable-next-line camelcase
      const { compressed_pk, bech32_address } = await decimalNanoApp.getAddressAndPubKey(path, ADDRESS_PREFIX);
      const evmAddress = encodeEvmAccountAddress(compressed_pk);
      wallet = {
        publicKey: compressed_pk,
        privateKey: null,
        address: bech32_address,
        evmAddress,
        id: 0,
      };
    }
    const ledgerOptions = {
      transport,
      transportId,
      sub,
      wallet,
      decimalNanoApp,
    };
    instance = new Wallet('', options, ledgerOptions);
    return instance;
  }

  async disconnectLedger(mode) {
    if (mode === LEDGER_MODS.usb) {
      await TransportWebUSB.create();
    } else {
      await TransportWebBLE.disconnect(this.transportId);
    }
  }

  // constructor
  constructor(mnemonic, options = null, ledgerOptions = null) {
    let wallet;
    // current mnemonic
    if (ledgerOptions) {
      // generate master wallet
      wallet = ledgerOptions.wallet;
      // generate validator address
      this.transport = ledgerOptions.transport;
      this.transportId = ledgerOptions.transportId;
      this.nanoApp = ledgerOptions.decimalNanoApp;
      this.sub = ledgerOptions.sub;
      this.mnemonic = '';
    } else {
      const _mnemonic = mnemonic || generateMnemonic();

      if (!validateMnemonic(_mnemonic)) {
        throw new Error('Invalid mnemonic');
      }

      // generate master wallet
      wallet = createDecimalWalletFromMnemonic(_mnemonic, ADDRESS_PREFIX, MASTER_DERIVATION_PATH);

      // generate validator address
      this.mnemonic = _mnemonic;
    }

    // current wallet
    this.wallet = wallet; // current wallet
    this.depth = 1; // current wallet depth
    this.id = 0; // current wallet account id

    // current private, public keys, address
    this.privateKey = wallet.privateKey; // current private key
    this.publicKey = wallet.publicKey; // current public key
    this.address = wallet.address; // current address
    this.evmAddress = wallet.evmAddress;
    this.validatorAddress = this.publicKey ? createAddress(wallet.publicKey, VALIDATOR_ADDRESS_PREFIX) : '';
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
  async switchAccount(id) {
    try {
      // if id does not exist
      if (typeof id === 'undefined' || !Number.isInteger(id)) {
        throw new Error('Id must be of type number');
      }

      // if id more then generated accounts
      if (id > this.depth) {
        throw new Error(`You have not generated an account with ${id} id`);
      }
      if (this.wallets[id].publicKey === null) {
        this.wallets[id] = await initGeneratedLedgerWallet(this.transport, id + 1);
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
      this.evmAddress = wallet.evmAddress;
      this.validatorAddress = this.publicKey ? createAddress(wallet.publicKey, VALIDATOR_ADDRESS_PREFIX) : '';
      // update current nonce

      // for sending transactions and lifetime of the current nonce
      this.updateNonce(null);
    } catch (e) {
      console.error(e);
    }
  }

  // generate next account and switch to last
  async generateAccount() {
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
      let wallet;
      if (this.transport) {
        wallet = await initGeneratedLedgerWallet(this.transport, depth);
      } else {
        wallet = createDecimalWalletFromMnemonic(this.mnemonic, ADDRESS_PREFIX, derivationPath, depth - 1);
      }

      // update current wallet
      this.depth = depth;

      // update wallets
      this.wallets = [...this.wallets, wallet];

      // update wallet
      await this.switchAccount(depth - 1);
    } catch (e) {
      console.error(e);
    }
  }

  // generate accounts and switch if necessary
  async generateAndSwitchAccount(depth, id) {
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
        await this.switchAccount(_id);
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
          let wallet;
          if (this.transport) {
            // here we can pass true to wallet init, when we want to create empty wallets
            // eslint-disable-next-line no-await-in-loop
            wallet = await initGeneratedLedgerWallet(this.transport, _depth);
          } else {
            wallet = createDecimalWalletFromMnemonic(this.mnemonic, ADDRESS_PREFIX, derivationPath, _depth - 1);
          }

          // update current wallet
          this.depth = _depth;

          // update wallets
          this.wallets = [...this.wallets, wallet];
        }
      }

      // swith account
      await this.switchAccount(_id);
    } catch (e) {
      console.error(e);
    }
  }

  async getAndUseGeneratedWallets() {
    try {
      if (!this.gateUrl) {
        throw new Error('You did not set the gate url');
      }
      let masterWallet;
      if (this.transport) {
        // eslint-disable-next-line prefer-destructuring
        masterWallet = this.wallets[0];
      } else {
        masterWallet = createDecimalWalletFromMnemonic(this.mnemonic, ADDRESS_PREFIX, MASTER_DERIVATION_PATH, 0);
      }

      const ids = await getAndUseGeneratedWallets(this.gateUrl, masterWallet.address);
      console.log(ids);
      if (ids && ids.length) {
        this.wallets = [masterWallet];
        // eslint-disable-next-line no-restricted-syntax
        for (const id of ids) {
          if (id !== masterWallet.id) {
            const derivationPath = generateDerivationPath(id + 1);
            let wallet;
            if (this.transport) {
              // eslint-disable-next-line no-await-in-loop
              wallet = await initGeneratedLedgerWallet(this.transport, id + 1);
            } else {
              wallet = createDecimalWalletFromMnemonic(this.mnemonic, ADDRESS_PREFIX, derivationPath, id);
            }
            this.wallets.push(wallet);
          }
        }

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

      const updated = await sendAndSaveGeneratedWallets(this.gateUrl, this.wallets, ids, this);

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
