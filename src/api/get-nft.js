const sha3 = require('js-sha3');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

export default function getNft(api, wallet) {
  return (id) => {
    if (!id) {
      throw new Error('Id is required');
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
      const signature = ec.sign(msgHash, wallet.privateKey, 'hex', { canonical: true });
      const params = { timestamp, signature };
      return api.getNftById(id, params);
    } catch (e) {
      return null;
    }
  };
}
