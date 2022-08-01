import { decode } from 'bech32';
import * as CryptoJS from 'crypto-js';
import * as bech32 from 'bech32-buffer';
import axios from 'axios';
import bs58 from 'bs58';
import { decode as rlpDecode } from 'rlp';

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

export async function sendAndSaveGeneratedWallets(gateUrl, wallets, generatedWallets) {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000.0);

    const msg = {
      timestamp,
    };

    const msgHash = sha3.keccak256(JSON.stringify(msg));

    const signature = JSON.stringify(ec.sign(msgHash, wallets[0].privateKey, 'hex', { canonical: true }));

    const payload = {
      generatedWallets,
      timestamp,
      signature,
    };

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

export const decodeCosmosAccountAddress = (cosmosAccountAddress) => {
  try {
    const decodedCosmosAccountAddress = bech32.decode(cosmosAccountAddress);

    const hexedEvmAccountAddress = Buffer.from(decodedCosmosAccountAddress.data).toString('hex');

    const evmAccountAddress = `0x${hexedEvmAccountAddress}`;

    return evmAccountAddress;
  } catch (e) {
    return null;
  }
};
