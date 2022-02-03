import { decode } from 'bech32';
import axios from 'axios';

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

export function getGeneratedWallets(gateUrl, address) {
  const { data } = axios.get(`${gateUrl}address/${address}/generated-wallets`);
  return (data && data.result && data.result.generatedWallets) || [];
}
