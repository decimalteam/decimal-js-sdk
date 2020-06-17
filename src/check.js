/* eslint-disable */
import { encode as rlpEncode } from 'rlp';
import secp256k1 from 'secp256k1';
import shajs from 'sha.js';
import bs58 from 'bs58';
import { Keccak } from 'sha3';
import {
  decode as bech32Decode,
  fromWords as bech32FromWords,
  toWords as bech32ToWords,
  encode as bech32Encode,
} from 'bech32';
import { postTx } from './txUtils';


function rlpHash(input) {
  const hash = new Keccak(256);
  hash.update(rlpEncode(input));
  return hash.digest();
}

export function issueCheck(api) {
  return async (txParams, wallet) => {
    const nodeInfoResp = await api.get('/rpc/node_info');
    const chainID = nodeInfoResp.data.node_info.network;

    const passphraseHash = shajs('sha256').update(txParams.passphrase).digest();
    const passphrasePrivKey = passphraseHash;

    const checkHash = rlpHash([
      chainID,
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
      chainID,
      txParams.coin,
      txParams.amount,
      txParams.nonce,
      txParams.due_block,
      lockSignature,
    ]);

    const checkObj = secp256k1.ecdsaSign(checkLockedHash, wallet.privateKey);
    const check = rlpEncode([
      chainID,
      txParams.coin,
      txParams.amount,
      txParams.nonce,
      txParams.due_block,
      lockSignature,
      checkObj.recid + 27,
      checkObj.signature.slice(0, 32),
      checkObj.signature.slice(32, 64),
    ]);
    
    return bs58.encode(check);
  };
}

export function redeemCheck(api, txType) {
  return async (txParams, wallet) => {
    const passphraseHash = shajs('sha256').update(txParams.data.proof).digest();
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

    // eslint-disable-next-line no-param-reassign
    txParams.data.proof = Buffer.from(proofSignature).toString('base64');

    return postTx(api, txType)(txParams, wallet);
  };
}
