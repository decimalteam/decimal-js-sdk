import { decode } from 'bech32';

/**
 * @param {string} address Decimal blockchain address
 * @param {string} prefix Prefix
 * @returns {boolean} boolean to indicate address validation
 */
export default function verifyAddress(address, prefix = 'dx') {
  if (!address) {
    throw new Error('address is missing.');
  }

  try {
    const decoded = decode(address);
    return (prefix === decoded.prefix) && decoded.words;
  } catch (error) {
    return false;
  }
}
