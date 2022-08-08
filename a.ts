const decimalSdk = require('./dist/decimal-sdk-node')
const cosmos = require('@cosmos-client/core')
const Long = require('long');
const mnemonic_dec2 = 'hold liquid enhance slim clerk frame grape welcome hybrid tower window grab bottom cluster cry tonight need depart table april good jar suspect napkin'
const cosmosclient = cosmos.default;
const { proto, rest } = cosmosclient;
const { Wallet, Decimal } = decimalSdk;
const options = {
    gateUrl: 'https://devnet-dec2.console.decimalchain.com/api/',
};
const data = {
    tx_bytes: "CoQBCoEBChwvZGVjaW1hbC5jb2luLnYxLk1zZ1NlbmRDb2luEmEKKWR4MTg0cWU4NnR5aHVydjVmeGx4Z3Zjd2E2em5mZzN1Z2s4YWpuNHIzEilkeDE0enV2dnlxcWRmNTY4ZWtqbGd2N3B4ajYzNzloZ2NwODludzU5YRoJCgR1Z3V1EgExElgKUApGCh8vY29zbW9zLmNyeXB0by5zZWNwMjU2azEuUHViS2V5EiMKIQIP96Xk8BVWPR+/33i33OLqbWao9hivcOVi3w1biQcKHBIECgIIARh0EgQQwJoMGkBQiDXY/iE7AhfpFwkYUEqY/HfcFls7IhM7Nxyi/1eWETkFYQcb9AxZkL5BF/u0EFGnV95UnE3cFm5f6I1w2evK",
    mode: "BROADCAST_MODE_BLOCK"
};
const myData = {
    tx_bytes: "CoMBCoABChwvZGVjaW1hbC5jb2luLnYxLk1zZ1NlbmRDb2luEmAKKWR4MTg0cWU4NnR5aHVydjVmeGx4Z3Zjd2E2em5mZzN1Z2s4YWpuNHIzEilkeDE0enV2dnlxcWRmNTY4ZWtqbGd2N3B4ajYzNzloZ2NwODludzU5YRoICgNkZWwSATESXwpXCk0KKC9ldGhlcm1pbnQuY3J5cHRvLnYxLmV0aHNlY3AyNTZrMS5QdWJLZXkSIQMoLcfeB7a+Ju5iOJEr7tG1ytuzPc78qzpQwoquhVo9txIECgIIARgLEgQQwJoMGkCQvHU0CzqTSH+oBmvxiks1vYYudB07UImMXdvlYfsY43s+zYeDmjF9oWugp1RksSAWw8PFizZWU6qi8TperXhy",
    mode: "BROADCAST_MODE_BLOCK"
};
(async () => {
    try {
        // prepare sender's account info
        // const senderMnemonic = mnemonic_dec2;
        const wallet = new Wallet(mnemonic_dec2, options);
        console.log(wallet.publicKey);
        // console.log(wallet.getPrivateKeyString())
        const mnt = 'hold liquid enhance slim clerk frame grape welcome hybrid tower window grab bottom cluster cry tonight need depart table april good cat suspect napkin'
        const bech32Prefix = 'dx';
        const accAddr = bech32Prefix;
        const bech32PrefixConfig = {
            accAddr,
        };
        cosmosclient.config.setBech32Prefix(bech32PrefixConfig);
        const senderPrivateKeyUint8Array = wallet?.wallet?.privateKey;
        const genPrivKey = await cosmosclient.generatePrivKeyFromMnemonic(mnemonic_dec2);
        const privKey = new proto.cosmos.crypto.secp256k1.PrivKey({
            key: wallet.privateKey,
        });
        const pubKey = privKey.pubKey();
        const address = cosmosclient.AccAddress.fromPublicKey(pubKey);
        console.log(address.toString())
        const senderPrivateKey = new proto.cosmos.crypto.secp256k1.PrivKey({
            key: wallet.privateKey,
        });
        
        // console.log('senderPrivateKey', senderPrivateKey.pubKey())
        const senderPublicKey = senderPrivateKey.pubKey();
        // console.log(senderPublicKey.accPubkey())
        // const senderPublicKeyString = new proto.cosmos.crypto.secp256k1.PrivKey({
        //     key: senderPublicKey,
        // });
        // console.log(cosmosclient.codec.instanceToProtoAny(senderPublicKey).value.toString())
        // const senderAccAddressEx = cosmosclient.AccAddress.fromPublicKey(senderPublicKey); 
        // console.log(senderAccAddressEx.toString());
        const senderAccAddress = wallet?.wallet?.address;
        const senderAccAddressString = wallet?.wallet?.address;
        const recipientAccAddressString = 'dx14zuvvyqqdf568ekjlgv7pxj6379hgcp89nw59a';

        // set node info to client
        const chainID = 'decimal_2020-22080402';
        const restURL = 'http://185.242.122.118/rest'
        const restApi = new cosmosclient.CosmosSDK(restURL, chainID);
        const sdk = {
            rest: restApi,
        };

        // call api to get baseAccount info to get account.sequence and account_number
        const accountResponse = await rest.auth.account(sdk.rest, senderAccAddress);
    
        // console.log('accountResponse', accountResponse.data?.account?.base_account)
        // const account = {
        //     '@type': '/cosmos.auth.v1beta1.BaseAccount',
        //     address: senderAccAddress,
        //     pub_key: {
        //       '@type': '/cosmos.crypto.secp256k1.PubKey',
        //       key: wallet.publicKey
        //     },
        //     account_number: accountResponse.data?.account?.base_account?.account_number,
        //     sequence: accountResponse.data?.account?.base_account?.sequence
        // }
        // const baseAccount = cosmosclient.codec.protoJSONToInstance(cosmosclient.codec.castProtoJSONOfProtoAny(account));
        // const sequence = baseAccount.sequence;
        // const baseAccount = {
        //     address: senderAccAddress,
        //     pub_key: wallet,
        //     account_number: Long.fromString(accountResponse.data?.account?.base_account?.account_number),
        //     sequence: Long.fromString(accountResponse.data?.account?.base_account?.sequence)
        // }
        const baseAccount = accountResponse.data?.account?.base_account;
        const sequence = baseAccount.sequence;

        // console.log(baseAccount)
        // const sequence = baseAccount.sequence;
        // const account = cosmosclient.codec.protoJSONToInstance(cosmosclient.codec.castProtoJSONOfProtoAny(accountResponse.data?.account));
        // console.log('unknownAccount', unknownAccount)
        // const baseAccount = convertUnknownAccountToBaseAccount(unknownAccount);
        // if (!baseAccount) {
        //     throw Error("Sender's account is invalid!");
        // }
         // build MsgSend
        const amount = [
            {
            denom: 'del',
            amount: '1',
            },
        ];
        const msgSend = new proto.cosmos.bank.v1beta1.MsgSend({
            from_address: senderAccAddressString,
            to_address: recipientAccAddressString,
            amount,
        });
       
        console.log(msgSend)
        // build TxBody
        const txBody = new proto.cosmos.tx.v1beta1.TxBody({
            messages: [cosmosclient.codec.instanceToProtoAny(msgSend)],
        });
        txBody.messages[0].type_url = '/decimal.coin.v1.MsgSendCoin'

        console.log('txBody', txBody)
        console.log(baseAccount.pub_key)
        console.log(senderPublicKey)
        // build AuthInfo
        const authInfo = new proto.cosmos.tx.v1beta1.AuthInfo({
            signer_infos: [
            {
                public_key: cosmosclient.codec.instanceToProtoAny(senderPublicKey),
                mode_info: {
                single: {
                    mode: proto.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT,
                },
                },
                sequence: Long.fromString(sequence),
            },
            ],
            fee: {
            gas_limit: Long.fromString('200000'),
            },
        });
        console.log(authInfo)
        // const authInfo = {
        //     signer_infos: [ 
        //         { 
        //             public_key: {
        //                 type_url: "/ethermint.crypto.v1.ethsecp256k1.PubKey",
        //                 value: "Aygtx94Htr4m7mI4kSvu0bXK27M9zvyrOlDCiq6FWj23"
        //             }, 
        //             mode_info: {
        //                 single: {
        //                     mode: proto.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT,
        //                 },
        //             },
        //             sequence: Long.fromString(sequence),
        //         } 
        //     ],
        //     fee: { 
        //         gas_limit: Long.fromString('200000'),
        //     }
        // }
        // authInfo.signer_infos.public_key = {
        //     type_url: "/ethermint.crypto.v1.ethsecp256k1.PubKey",
        //     value: "Aygtx94Htr4m7mI4kSvu0bXK27M9zvyrOlDCiq6FWj23"
        // };
        console.log(JSON.stringify(authInfo))

        // const authInfo = {"signer_infos":[{"public_key":{},"mode_info":{"single":{"mode":"SIGN_MODE_DIRECT"}},"sequence":"11"}],"fee":{"gas_limit":"200000"}}
        // prepare target bytes data to be signed
        const txBuilder = new cosmosclient.TxBuilder(sdk.rest, txBody, authInfo);
        const signDocBytes = txBuilder.signDocBytes(Long.fromString(baseAccount.account_number));
        // sign and add signature to tx data
        const signature = senderPrivateKey.sign(signDocBytes);
        txBuilder.addSignature(signature);
    
        // console.log('txBuilder', txBuilder.toProtoJSON())
        console.log(txBuilder)
        const txResponse = await rest.tx.broadcastTx(sdk.rest, {
            tx_bytes: txBuilder.txBytes(),
            mode: rest.tx.BroadcastTxMode.Block,
        });
        console.log(txResponse.data)
    }
    catch (e) {
        console.log(e)
    }
})()
// (async () => {
//     const bech32Prefix = 'ununifi';
//     const accAddr = bech32Prefix;
//     const accPub = bech32Prefix + cosmosclient;
//     const valAddr = bech32Prefix + cosmosclient.AddressPrefix.Validator + cosmosclient.AddressPrefix.Operator;
//     const valPub =
//       bech32Prefix + cosmosclient.AddressPrefix.Validator + cosmosclient.AddressPrefix.Operator + cosmosclient.AddressPrefix.Public;
//     const consAddr = bech32Prefix + cosmosclient.AddressPrefix.Validator + cosmosclient.AddressPrefix.Consensus;
//     const consPub =
//       bech32Prefix + cosmosclient.AddressPrefix.Validator + cosmosclient.AddressPrefix.Consensus + cosmosclient.AddressPrefix.Public;
//     const bech32PrefixConfig = {
//       accAddr,
//       accPub,
//       valAddr,
//       valPub,
//       consAddr,
//       consPub,
//     };
//     cosmosclient.config.setBech32Prefix(bech32PrefixConfig);
  
//     // prepare sender's account info
//     const senderMnemonic = 'month radio spell indicate eight treat expire ordinary buzz ten spray mad';
  
//     const senderPrivateKeyUint8Array = await cosmosclient.generatePrivKeyFromMnemonic(senderMnemonic);
//     const senderPrivateKey = new proto.cosmos.crypto.secp256k1.PrivKey({
//       key: senderPrivateKeyUint8Array,
//     });
  
//     const senderPublicKey = senderPrivateKey.pubKey();
  
//     const senderAccAddress = cosmosclient.AccAddress.fromPublicKey(senderPublicKey);
//     const senderAccAddressString = senderAccAddress.toString();
  
//     // set node info to client
//     const chainID = 'ununifi-alpha-test-v2';
//     const restURL = 'http://ununifi-alpha-test-v2.cauchye.net:1317';
//     const websocketURL = 'ws://ununifi-alpha-test-v2.cauchye.net:26657';
//     const restApi = new cosmosclient.CosmosSDK(restURL, chainID);
//     const sdk = {
//       rest: restApi,
//     };
  
//     // call api to get baseAccount info to get account.sequence and account_number
//     const accountResponse = await rest.auth.account(sdk.rest, senderAccAddress);
//     console.log(accountResponse.data?.account);
//     const baseAccount = cosmosclient.codec.protoJSONToInstance(cosmosclient.codec.castProtoJSONOfProtoAny(accountResponse.data?.account));
//     console.log(baseAccount)
//     // const baseAccount = convertUnknownAccountToBaseAccount(unknownAccount);
//     // if (!baseAccount) {
//     //   throw Error("Sender's account is invalid!");
//     // }
//     const sequence = baseAccount.sequence;
  
//     // build MsgSend
//     const recipientAccAddressString = 'ununifi18y5nnx3r9s4w398sn0nqcykh2y7sx8ljd423t6';
//     const amount = [
//       {
//         denom: 'uguu',
//         amount: '1',
//       },
//     ];
//     const msgSend = new proto.cosmos.bank.v1beta1.MsgSend({
//       from_address: 'dx184qe86tyhurv5fxlxgvcwa6znfg3ugk8ajn4r3',
//       to_address: 'dx14zuvvyqqdf568ekjlgv7pxj6379hgcp89nw59a',
//       amount,
//     });
  
//     // build TxBody
//     const txBody = new proto.cosmos.tx.v1beta1.TxBody({
//       messages: [cosmosclient.codec.instanceToProtoAny(msgSend)],
//     });
//     txBody.messages[0].type_url = '/decimal.coin.v1.MsgSendCoin'

//     // console.log('txBody', txBody);
//     // build AuthInfo
//     const authInfo = new proto.cosmos.tx.v1beta1.AuthInfo({
//       signer_infos: [
//         {
//           public_key: cosmosclient.codec.instanceToProtoAny(senderPublicKey),
//           mode_info: {
//             single: {
//               mode: proto.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT,
//             },
//           },
//           sequence,
//         },
//       ],
//       fee: {
//         gas_limit: Long.fromString('200000'),
//       },
//     });
//     console.log(baseAccount.account_number)
//     // prepare target bytes data to be signed
//     const txBuilder = new cosmosclient.TxBuilder(sdk.rest, txBody, authInfo);
//     const signDocBytes = txBuilder.signDocBytes(baseAccount.account_number);
  
//     // sign and add signature to tx data
//     const signature = senderPrivateKey.sign(signDocBytes);
//     txBuilder.addSignature(signature);
//     // console.log(txBuilder.toProtoJSON())
//     // broadcast signed tx
//     const txResponse = await rest.tx.broadcastTx(sdk.rest, {
//       tx_bytes: txBuilder.txBytes(),
//       mode: rest.tx.BroadcastTxMode.Block,
//     });
//     console.log(txResponse)
//     return txResponse;

// })()

