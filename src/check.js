import { encode as rlpEncode } from 'rlp';
import secp256k1 from 'secp256k1';
import shajs from 'sha.js';
import { Keccak } from 'sha3';
import {
  decode as bech32Decode,
  fromWords as bech32FromWords,
} from 'bech32';
import { postTx } from './txUtils';


function rlpHash(input) {
  const hash = new Keccak(256);
  hash.update(rlpEncode(input));
  return hash.digest();
}

export function issueCheck() {
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
    const check = rlpEncode([
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

export function redeemCheck(api, txType) {
  return async (txParams, wallet) => {
    const passphraseHash = shajs('sha256').update(txParams.passphrase).digest();
    const passphrasePrivKey = passphraseHash;

    const { words } = bech32Decode(wallet.address);
    const senderAddressHash = rlpHash([Buffer.from(bech32FromWords(words))]);

    const proofObj = secp256k1.ecdsaSign(senderAddressHash, passphrasePrivKey);
    const proofSignature = new Uint8Array(65);
    // TODO: Optimize appending recovery byte to the signature
    for (let i = 0; i < 64; i += 1) {
      proofSignature[i] = proofObj.signature[i];
    }
    proofSignature[64] = proofObj.recid;

    return postTx(api, txType)({
      data: {
        sender: wallet.address,
        check: txParams.check,
        proof: Buffer.from(proofSignature).toString('base64'),
      },
      gas: '200000',
      message: '',
    }, wallet);
  };
}
