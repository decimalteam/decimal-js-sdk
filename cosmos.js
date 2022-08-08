const { decode } = require('bech32');
const { publicKeyConvert } = require('secp256k1')
const bech32 = require('bech32-buffer')
const CryptoJS = require('crypto-js')
const rlp = require('rlp')
const sha3 = require('js-sha3');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const decimalSdk = require('./dist/decimal-sdk-node')
const cosmos = require('@cosmos-client/core')
const Long = require('long');
const cosmosclient = cosmos.default;
const { proto, rest } = cosmosclient;
const { Wallet, Decimal } = decimalSdk;

const options = {
    gateUrl: 'https://devnet-dec2.console.decimalchain.com/api/',
};
const dataExample1 = {
    tx_bytes: "CoQBCoEBChwvZGVjaW1hbC5jb2luLnYxLk1zZ1NlbmRDb2luEmEKKWR4MTg0cWU4NnR5aHVydjVmeGx4Z3Zjd2E2em5mZzN1Z2s4YWpuNHIzEilkeDE0enV2dnlxcWRmNTY4ZWtqbGd2N3B4ajYzNzloZ2NwODludzU5YRoJCgR1Z3V1EgExElgKUApGCh8vY29zbW9zLmNyeXB0by5zZWNwMjU2azEuUHViS2V5EiMKIQIP96Xk8BVWPR+/33i33OLqbWao9hivcOVi3w1biQcKHBIECgIIARh0EgQQwJoMGkBQiDXY/iE7AhfpFwkYUEqY/HfcFls7IhM7Nxyi/1eWETkFYQcb9AxZkL5BF/u0EFGnV95UnE3cFm5f6I1w2evK",
    mode: "BROADCAST_MODE_BLOCK"
};
const dataExample2 = {
    tx_bytes: "CoMBCoABChwvZGVjaW1hbC5jb2luLnYxLk1zZ1NlbmRDb2luEmAKKWR4MTg0cWU4NnR5aHVydjVmeGx4Z3Zjd2E2em5mZzN1Z2s4YWpuNHIzEilkeDE0enV2dnlxcWRmNTY4ZWtqbGd2N3B4ajYzNzloZ2NwODludzU5YRoICgNkZWwSATESXwpXCk0KKC9ldGhlcm1pbnQuY3J5cHRvLnYxLmV0aHNlY3AyNTZrMS5QdWJLZXkSIQMoLcfeB7a+Ju5iOJEr7tG1ytuzPc78qzpQwoquhVo9txIECgIIARgLEgQQwJoMGkCQvHU0CzqTSH+oBmvxiks1vYYudB07UImMXdvlYfsY43s+zYeDmjF9oWugp1RksSAWw8PFizZWU6qi8TperXhy",
    mode: "BROADCAST_MODE_BLOCK"
};
const mnemonic_dec2 = 'hold liquid enhance slim clerk frame grape welcome hybrid tower window grab bottom cluster cry tonight need depart table april good jar suspect napkin';

(async () => {
    try {
        // prepare sender's account info
        const wallet = new Wallet(mnemonic_dec2, options);
        
        // const bech32Prefix = 'dx';
        // const accAddr = bech32Prefix;
        // const bech32PrefixConfig = {
        //     accAddr,
        // };
        // cosmosclient.config.setBech32Prefix(bech32PrefixConfig);
        // const genPrivKey = await cosmosclient.generatePrivKeyFromMnemonic(mnemonic_dec2);

        const privKey = new proto.cosmos.crypto.secp256k1.PrivKey({
            key: wallet.privateKey,
        });
        const pubKey = privKey.pubKey();
        const address = cosmosclient.AccAddress.fromPublicKey(pubKey);
        console.log(address.toString())
        const senderPrivateKey = new proto.cosmos.crypto.secp256k1.PrivKey({
            key: wallet.privateKey,
        });
        
        const senderPublicKey = senderPrivateKey.pubKey();
        const senderAccAddress = wallet?.wallet?.address;
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
        const baseAccount = accountResponse.data?.account?.base_account;
        const sequence = baseAccount.sequence;

         // build MsgSend
        const amount = [
            {
            denom: 'del',
            amount: '1',
            },
        ];

        const msgSend = new proto.cosmos.bank.v1beta1.MsgSend({
            from_address: senderAccAddress,
            to_address: recipientAccAddressString,
            amount,
        });
        console.log(msgSend)

        // build TxBody
        const txBody = new proto.cosmos.tx.v1beta1.TxBody({
            messages: [cosmosclient.codec.instanceToProtoAny(msgSend)],
        });
        txBody.messages[0].type_url = '/decimal.coin.v1.MsgSendCoin'
    
        // build AuthInfo
        // const authInfo = new proto.cosmos.tx.v1beta1.AuthInfo({
        //     signer_infos: [
        //     {
        //         public_key: cosmosclient.codec.instanceToProtoAny(senderPublicKey),
        //         mode_info: {
        //         single: {
        //             mode: proto.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT,
        //         },
        //         },
        //         sequence: Long.fromString(sequence),
        //     },
        //     ],
        //     fee: {
        //     gas_limit: Long.fromString('200000'),
        //     },
        // });

        // HARDCODED public_key: 'invalid length: tx parse error'
        // authInfo.signer_infos[0].public_key.type_url = "/ethermint.crypto.v1.ethsecp256k1.PubKey";
        // authInfo.signer_infos[0].public_key.value = 'Aygtx94Htr4m7mI4kSvu0bXK27M9zvyrOlDCiq6FWj23';
        // console.log(authInfo.signer_infos[0].public_key.type_url)

        // HARDCODED authInfo: 'invalid length: tx parse error'
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
        
        console.log(JSON.stringify(authInfo))

        // prepare target bytes data to be signed
        const txBuilder = new cosmosclient.TxBuilder(sdk.rest, txBody, authInfo);
        const signDocBytes = txBuilder.signDocBytes(Long.fromString(baseAccount.account_number));

        // sign and add signature to tx data
        const signature = senderPrivateKey.sign(signDocBytes);
        txBuilder.addSignature(signature);
    
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