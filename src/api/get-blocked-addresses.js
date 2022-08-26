const sha3 = require('js-sha3');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

export default function getNftTxes(api, wallet) {
  return async (limit = 10, offset = 0, type = null, q = null) => {
    try {
      const timestamp = Math.round(new Date().getTime() / 1000.0);

      const msg = {};

      const data = {
        timestamp,
      };

      Object.keys(data).sort().forEach((key) => { msg[key] = data[key]; });

      const msgHash = sha3.keccak256(JSON.stringify(msg));

      let signature;
      const isLedger = !!wallet.nanoApp;
      if (isLedger) {
        // signature = await decimal.makeLedgerMsgSignature(msg);
        signature = wallet.publicKey;
      } else {
        signature = ec.sign(msgHash, wallet.privateKey, 'hex', { canonical: true });
      }
      const params = {
        limit, offset, timestamp, signature, ...(type && { type }), ...(q && { q }),
      };

      return api.getBlockedAddresses(params);
    } catch (e) {
      console.error(e);

      return null;
    }
  };
}
