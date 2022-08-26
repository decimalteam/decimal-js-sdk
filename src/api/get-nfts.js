const sha3 = require('js-sha3');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

export default function getNfts(api, wallet) {
  return async (address, limit = 10, offset = 0, query = null) => {
    try {
      let params = query ? { query, limit, offset } : { limit, offset };

      if (!address) {
        throw new Error('The address is required');
      }

      // if requested address is yours
      if (address === wallet.address) {
        const timestamp = Math.round(new Date().getTime() / 1000.0);

        const msg = {
          timestamp,
        };

        const msgHash = sha3.keccak256(JSON.stringify(msg));

        let signature;
        const isLedger = !!wallet.nanoApp;
        if (isLedger) {
          // signature = await decimal.makeLedgerMsgSignature(msg);
          signature = wallet.publicKey;
        } else {
          signature = ec.sign(msgHash, wallet.privateKey, 'hex', { canonical: true });
        }

        params = { ...params, timestamp, signature };
      }

      return api.getNfts(address, params);
    } catch (e) {
      console.error(e);

      return null;
    }
  };
}
