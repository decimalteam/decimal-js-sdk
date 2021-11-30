const sha3 = require('js-sha3');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

export default function getNfts(api, wallet) {
  return (address, limit = 10, offset = 0, query = null) => {
    try {
      let params = query ? { query, limit, offset } : { limit, offset };

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

      return api.getNfts(address, params);
    } catch (e) {
      return null;
    }
  };
}
