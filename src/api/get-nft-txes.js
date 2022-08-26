const sha3 = require('js-sha3');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

// constants
const DEFAULT_ORDER_FIELD = 'createdAt';
const DEFAULT_ORDER_DIRECTION = 'DESC';
const DEFAULT_ORDER = `order[${DEFAULT_ORDER_FIELD}]=${DEFAULT_ORDER_DIRECTION}`;

export default function getNftTxes(api, wallet) {
  return async (id, limit = 10, offset = 0, order = DEFAULT_ORDER) => {
    if (!id) {
      throw new Error('Nft id is required');
    }

    try {
      const timestamp = Math.round(new Date().getTime() / 1000.0);

      const msg = {};

      const data = {
        timestamp,
        nftId: id,
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
        limit, offset, timestamp, signature,
      };

      return api.getNftTxes(id, params, order);
    } catch (e) {
      console.error(e);

      return null;
    }
  };
}
