import sdk from '@cosmos-client/core';


export default class Cosmos {
  async startCosmos() {
    console.log(sdk)
    // set bech32prefix to client
    // const bech32Prefix = 'ununifi';
    // const accAddr = bech32Prefix;
    // const accPub = bech32Prefix + cosmosclient.AddressPrefix.Public;
    // const valAddr = bech32Prefix + cosmosclient.AddressPrefix.Validator + cosmosclient.AddressPrefix.Operator;
    // const valPub =
    //   bech32Prefix + cosmosclient.AddressPrefix.Validator + cosmosclient.AddressPrefix.Operator + cosmosclient.AddressPrefix.Public;
    // const consAddr = bech32Prefix + cosmosclient.AddressPrefix.Validator + cosmosclient.AddressPrefix.Consensus;
    // const consPub =
    //   bech32Prefix + cosmosclient.AddressPrefix.Validator + cosmosclient.AddressPrefix.Consensus + cosmosclient.AddressPrefix.Public;
    // const bech32PrefixConfig = {
    //   accAddr,
    //   accPub,
    //   valAddr,
    //   valPub,
    //   consAddr,
    //   consPub,
    // };
    // cosmosclient.config.setBech32Prefix(bech32PrefixConfig);

    // // prepare sender's account info
    // const senderMnemonic = 'month radio spell indicate eight treat expire ordinary buzz ten spray mad';

    // const senderPrivateKeyUint8Array = await cosmosclient.generatePrivKeyFromMnemonic(senderMnemonic);
    // const senderPrivateKey = new proto.cosmos.crypto.secp256k1.PrivKey({
    //   key: senderPrivateKeyUint8Array,
    // });

    // const senderPublicKey = senderPrivateKey.pubKey();
  }
}