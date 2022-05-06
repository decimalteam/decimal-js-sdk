const sha3 = require('js-sha3');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

export default function getNftStakesByAddress(api, wallet) {
  return async (address) => {
    if (!address) {
      throw new Error('The address is required');
    }

    try {
      let params = {};

      // if requested address is yours
      if (address === wallet.address) {
        const timestamp = Math.round(new Date().getTime() / 1000.0);

        const msg = {
          timestamp,
        };

        const msgHash = sha3.keccak256(JSON.stringify(msg));

        const signature = ec.sign(msgHash, wallet.privateKey, 'hex', { canonical: true });

        params = { ...params, timestamp, signature };
      }

      return api.getNftStakes(address, params);
    } catch (e) {
      console.error(e);

      return null;
    }
  };
}
