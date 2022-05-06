const sha3 = require('js-sha3');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

// constants
const BLOCK_TYPES = ['incoming', 'outgoing', 'both'];

export default function updateAddressBlockingData(api, wallet) {
  return (address, isBlocked, type, reason = null) => {
    try {
      if (!address || isBlocked === null) {
        throw new Error('The address and isBlocked fields are required');
      }

      if (!BLOCK_TYPES.includes(type)) {
        throw new Error(`Blocking type should be one of ${BLOCK_TYPES.join('|')}`);
      }

      const timestamp = Math.round(new Date().getTime() / 1000.0);

      const msg = {
        timestamp,
      };

      const msgHash = sha3.keccak256(JSON.stringify(msg));

      const signature = JSON.stringify(ec.sign(msgHash, wallet.privateKey, 'hex', { canonical: true }));

      const payload = {
        isBlocked, type, timestamp, signature, ...(reason && { reason }),
      };

      return api.updateAddressBlockingData(address, payload);
    } catch (e) {
      console.error(e);

      return null;
    }
  };
}
