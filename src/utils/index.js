import { decode } from 'bech32';
import axios from 'axios';

const sha3 = require('js-sha3');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');
/**
 * @param {string} address Decimal blockchain address
 * @param {'dx' | 'dxvaloper' | string} prefix Prefix
 * @returns {boolean} boolean to indicate address validation
 */
// eslint-disable-next-line import/prefer-default-export
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

export async function getGeneratedWallets(gateUrl, address) {
  try {
    const { data } = await axios.get(`${gateUrl}address/${address}/generated-wallets`);
    return (data && data.result && data.result.generatedWallets) || [];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateGeneratedWallets(gateUrl, wallets, generatedWallets) {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000.0);

    const msg = {
      timestamp,
    };

    const msgHash = sha3.keccak256(JSON.stringify(msg));

    const signature = ec.sign(msgHash, wallets[0].privateKey, 'hex', { canonical: true });

    const payload = {
      generatedWallets,
      timestamp,
      signature,
    };

    await axios.put(`${gateUrl}address/${wallets[0].address}/generated-wallets`, payload);
  } catch (error) {
    console.error(error);
    return null;
  }
}
