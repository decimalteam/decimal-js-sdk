import { encode } from 'rlp';
import secp256k1 from 'secp256k1';
import shajs from 'sha.js';
import { Keccak } from 'sha3';


function rlpHash(input) {
  const hash = new Keccak(256);
  hash.update(encode(input));
  return hash.digest();
}

export default function issueCheck() {
  return async (txParams, wallet) => {
    const passphraseHash = shajs('sha256').update(txParams.passphrase).digest();
    const passphrasePrivKey = passphraseHash;

    const checkHash = rlpHash([
      txParams.chain_id,
      txParams.coin,
      txParams.amount,
      txParams.nonce,
      txParams.due_block,
    ]);

    const lockObj = secp256k1.ecdsaSign(checkHash, passphrasePrivKey);
    const lockSignature = new Uint8Array(65);
    // TODO: Optimize appending recovery byte to the signature
    for (let i = 0; i < 64; i += 1) {
      lockSignature[i] = lockObj.signature[i];
    }
    lockSignature[64] = lockObj.recid;

    const checkLockedHash = rlpHash([
      txParams.chain_id,
      txParams.coin,
      txParams.amount,
      txParams.nonce,
      txParams.due_block,
      lockSignature,
    ]);

    const checkObj = secp256k1.ecdsaSign(checkLockedHash, wallet.privateKey);
    const check = encode([
      txParams.chain_id,
      txParams.coin,
      txParams.amount,
      txParams.nonce,
      txParams.due_block,
      lockSignature,
      checkObj.recid + 27,
      checkObj.signature.slice(0, 32),
      checkObj.signature.slice(32, 64),
    ]);

    return check.toString('base64');
  };
}
