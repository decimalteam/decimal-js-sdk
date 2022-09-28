import { decode } from 'bech32';
import * as CryptoJS from 'crypto-js';
import axios from 'axios';
import bs58 from 'bs58';
import { decode as rlpDecode } from 'rlp';
import {
  publicKeyConvert, ecdsaVerify, ecdsaRecover, signatureImport, signatureNormalize,
} from 'secp256k1';
import { createAddress, sha256 } from '@tendermint/sig';

const sortobject = require('deep-sort-object');
const sha3 = require('js-sha3');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

// constants
const MAX_AUTOMATICALLY_NONCE_VALID_UNTIL = 6 * 1000;

/**
 * @param {string} address Decimal blockchain address
 * @param {'dx' | 'dxvaloper' | string} prefix Prefix
 * @returns {boolean} boolean to indicate address validation
 */
export function verifyAddress(address, prefix = 'dx') {
  if (!address) {
    throw new Error('address is missing.');
  }

  try {
    const decoded = decode(address);
    return (prefix === decoded.prefix) && decoded.words !== undefined;
  } catch (error) {
    return false;
  }
}

export function verifyCheck(check) {
  try {
    const decodedCheck = bs58.decode(check);
    return rlpDecode(decodedCheck);
  } catch (e) {
    return false;
  }
}

export async function getAndUseGeneratedWallets(gateUrl, address) {
  try {
    const { data } = await axios.get(`${gateUrl}address/${address}/generated-wallets`);

    return (data && data.result && data.result.generatedWallets) || [];
  } catch (e) {
    if (e.response && e.response.code && e.response.code !== 404) console.error(e);

    return [];
  }
}

export async function sendAndSaveGeneratedWallets(gateUrl, wallets, generatedWallets, wallet) {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000.0);

    const msg = {
      timestamp,
    };
    let signature;
    const isLedger = !!wallet.nanoApp;
    const msgHash = sha3.keccak256(JSON.stringify(msg));

    if (isLedger) {
      signature = JSON.stringify(wallets[0].publicKey);
    } else {
      signature = JSON.stringify(ec.sign(msgHash, wallets[0].privateKey, 'hex', { canonical: true }));
    }
    const payload = {
      generatedWallets,
      timestamp,
      signature,
      isLedger,
    };
    // eslint-disable-next-line no-use-before-define
    getWalletAddressFromSignature(msg, signature);
    console.log(JSON.stringify(payload));
    console.log(`${gateUrl}address/${wallets[0].address}/generated-wallets`);
    const { data: { result = false } } = await axios.put(`${gateUrl}address/${wallets[0].address}/generated-wallets`, payload);

    return result;
  } catch (e) {
    if (e.response && e.response.code && e.response.code !== 404) console.error(e);

    return false;
  }
}

export function getStringHash(value) {
  return CryptoJS.SHA1(value).toString();
}

export function generateNftId(headline, description, slug, coverHash = null, assetHash = null) {
  try {
    const hashes = [
      getStringHash(headline),
      getStringHash(description),
      getStringHash(slug),
      coverHash,
      assetHash,
    ];

    const id = hashes.reduce((acc, value) => acc + value);

    return getStringHash(id);
  } catch (e) {
    console.error(e);

    throw new Error('Error when trying to get a hash ', e.message);
  }
}

export function getTimestamp() {
  return new Date().getTime();
}

export function isNonceSetAutomatically(wallet, options) {
  return options.setNonceAutomatically && Boolean(wallet.currentNonce) && (getTimestamp() - wallet.currentNonceValidUntil) < MAX_AUTOMATICALLY_NONCE_VALID_UNTIL;
}

export function updateNonce(wallet, nonce) {
  wallet.updateNonce(+nonce);
}

export const encodeEvmAccountAddress = (publicKey) => {
  const decompressedPublicKey = publicKeyConvert(publicKey, false);
  const slicedDecompressedPublicKey = decompressedPublicKey.slice(1);
  const hexedDecompressedPublicKey = sha3.keccak256(slicedDecompressedPublicKey);
  const evmAccountAddress = `0x${hexedDecompressedPublicKey.substring(hexedDecompressedPublicKey.length - 40, hexedDecompressedPublicKey.length)}`;
  return evmAccountAddress;
};

export function checkLedgerSignature(
  data,
  signature,
) {
  try {
    const StdSignMsg = {
      fee: {
        amount: 0,
        gas: 0,
      },
      memo: '',
      msgs: [data],
      account_number: '',
      sequence: '',
      chain_id: '',
    };
    const encoder = new TextEncoder();
    const bytes = encoder.encode(JSON.stringify(sortobject(StdSignMsg)));
    const hash = sha256(bytes);
    const parsed = JSON.parse(signature);
    const signatureBytes = signatureImport(Buffer.from(parsed.signature.data));
    const u8 = Uint8Array.from(Buffer.from(parsed.signature.data));
    console.log(u8);
    console.log(u8[u8.length - 1]);
    console.log(u8.length);
    const normalized = signatureNormalize(signatureBytes);
    console.log(normalized);
    // const recid = normalized[normalized.length - 1];
    const pubKey = ecdsaRecover(normalized, 2, hash, true);
    console.log(pubKey);
    const isValid = ecdsaVerify(signatureBytes, hash, pubKey);
    const walletAddress = createAddress(pubKey, 'dx');
    console.log(walletAddress);
    return isValid;
  } catch (e) {
    console.error(e);

    return false;
  }
}

export function getWalletAddressFromSignature(
  data,
  signature,
) {
  try {
    // sort msg object by keys
    const msg = sortobject(data);

    console.log(msg);
    // getting message hash
    const msgHash = sha3.keccak256(JSON.stringify(msg));

    console.log('msgHash', msgHash);
    // hex to decimal function
    const hexToDecimal = (x) => ec.keyFromPrivate(x, 'hex').getPrivate().toString(10);

    // casting signature as string
    const rawSignature = signature;

    // parsing raw signature from string
    const parsedSignature = JSON.parse(rawSignature);

    // getting public key from signature
    const pubKeyRecovered = ec.recoverPubKey(
      hexToDecimal(msgHash),
      parsedSignature,
      parsedSignature.recoveryParam,
      'hex',
    );

    console.log('pubKeyRecovered', pubKeyRecovered.encodeCompressed('bites'));
    // getting wallet address from recovered public key
    const walletAddress = createAddress(pubKeyRecovered.encodeCompressed('bites'), 'dx');

    console.log('address from utils: ', walletAddress);

    return walletAddress;
  } catch (e) {
    console.error(e);

    return null;
  }
}
