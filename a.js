var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var decimalSdk = require('./dist/decimal-sdk-node');
var cosmos = require('@cosmos-client/core');
var Long = require('long');
var mnemonic_dec2 = 'hold liquid enhance slim clerk frame grape welcome hybrid tower window grab bottom cluster cry tonight need depart table april good jar suspect napkin';
var cosmosclient = cosmos["default"];
var proto = cosmosclient.proto, rest = cosmosclient.rest;
var Wallet = decimalSdk.Wallet, Decimal = decimalSdk.Decimal;
var options = {
    gateUrl: 'https://devnet-dec2.console.decimalchain.com/api/'
};
var data = {
    tx_bytes: "CoQBCoEBChwvZGVjaW1hbC5jb2luLnYxLk1zZ1NlbmRDb2luEmEKKWR4MTg0cWU4NnR5aHVydjVmeGx4Z3Zjd2E2em5mZzN1Z2s4YWpuNHIzEilkeDE0enV2dnlxcWRmNTY4ZWtqbGd2N3B4ajYzNzloZ2NwODludzU5YRoJCgR1Z3V1EgExElgKUApGCh8vY29zbW9zLmNyeXB0by5zZWNwMjU2azEuUHViS2V5EiMKIQIP96Xk8BVWPR+/33i33OLqbWao9hivcOVi3w1biQcKHBIECgIIARh0EgQQwJoMGkBQiDXY/iE7AhfpFwkYUEqY/HfcFls7IhM7Nxyi/1eWETkFYQcb9AxZkL5BF/u0EFGnV95UnE3cFm5f6I1w2evK",
    mode: "BROADCAST_MODE_BLOCK"
};
var myData = {
    tx_bytes: "CoMBCoABChwvZGVjaW1hbC5jb2luLnYxLk1zZ1NlbmRDb2luEmAKKWR4MTg0cWU4NnR5aHVydjVmeGx4Z3Zjd2E2em5mZzN1Z2s4YWpuNHIzEilkeDE0enV2dnlxcWRmNTY4ZWtqbGd2N3B4ajYzNzloZ2NwODludzU5YRoICgNkZWwSATESXwpXCk0KKC9ldGhlcm1pbnQuY3J5cHRvLnYxLmV0aHNlY3AyNTZrMS5QdWJLZXkSIQMoLcfeB7a+Ju5iOJEr7tG1ytuzPc78qzpQwoquhVo9txIECgIIARgLEgQQwJoMGkCQvHU0CzqTSH+oBmvxiks1vYYudB07UImMXdvlYfsY43s+zYeDmjF9oWugp1RksSAWw8PFizZWU6qi8TperXhy",
    mode: "BROADCAST_MODE_BLOCK"
};
(function () { return __awaiter(_this, void 0, void 0, function () {
    var wallet, mnt, bech32Prefix, accAddr, bech32PrefixConfig, senderPrivateKeyUint8Array, genPrivKey, privKey, pubKey, address, senderPrivateKey, senderPublicKey, senderAccAddress, senderAccAddressString, recipientAccAddressString, chainID, restURL, restApi, sdk, accountResponse, baseAccount, sequence, amount, msgSend, txBody, authInfo, txBuilder, signDocBytes, signature, txResponse, e_1;
    var _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 4, , 5]);
                wallet = new Wallet(mnemonic_dec2, options);
                console.log(wallet.publicKey);
                mnt = 'hold liquid enhance slim clerk frame grape welcome hybrid tower window grab bottom cluster cry tonight need depart table april good cat suspect napkin';
                bech32Prefix = 'dx';
                accAddr = bech32Prefix;
                bech32PrefixConfig = {
                    accAddr: accAddr
                };
                cosmosclient.config.setBech32Prefix(bech32PrefixConfig);
                senderPrivateKeyUint8Array = (_a = wallet === null || wallet === void 0 ? void 0 : wallet.wallet) === null || _a === void 0 ? void 0 : _a.privateKey;
                return [4 /*yield*/, cosmosclient.generatePrivKeyFromMnemonic(mnemonic_dec2)];
            case 1:
                genPrivKey = _f.sent();
                privKey = new proto.cosmos.crypto.secp256k1.PrivKey({
                    key: wallet.privateKey
                });
                pubKey = privKey.pubKey();
                address = cosmosclient.AccAddress.fromPublicKey(pubKey);
                console.log(address.toString());
                senderPrivateKey = new proto.cosmos.crypto.secp256k1.PrivKey({
                    key: wallet.privateKey
                });
                senderPublicKey = senderPrivateKey.pubKey();
                senderAccAddress = (_b = wallet === null || wallet === void 0 ? void 0 : wallet.wallet) === null || _b === void 0 ? void 0 : _b.address;
                senderAccAddressString = (_c = wallet === null || wallet === void 0 ? void 0 : wallet.wallet) === null || _c === void 0 ? void 0 : _c.address;
                recipientAccAddressString = 'dx14zuvvyqqdf568ekjlgv7pxj6379hgcp89nw59a';
                chainID = 'decimal_2020-22080402';
                restURL = 'http://185.242.122.118/rest';
                restApi = new cosmosclient.CosmosSDK(restURL, chainID);
                sdk = {
                    rest: restApi
                };
                return [4 /*yield*/, rest.auth.account(sdk.rest, senderAccAddress)];
            case 2:
                accountResponse = _f.sent();
                baseAccount = (_e = (_d = accountResponse.data) === null || _d === void 0 ? void 0 : _d.account) === null || _e === void 0 ? void 0 : _e.base_account;
                sequence = baseAccount.sequence;
                amount = [
                    {
                        denom: 'del',
                        amount: '1'
                    },
                ];
                msgSend = new proto.cosmos.bank.v1beta1.MsgSend({
                    from_address: senderAccAddressString,
                    to_address: recipientAccAddressString,
                    amount: amount
                });
                console.log(msgSend);
                txBody = new proto.cosmos.tx.v1beta1.TxBody({
                    messages: [cosmosclient.codec.instanceToProtoAny(msgSend)]
                });
                txBody.messages[0].type_url = '/decimal.coin.v1.MsgSendCoin';
                console.log('txBody', txBody);
                console.log(baseAccount.pub_key);
                console.log(senderPublicKey);
                authInfo = new proto.cosmos.tx.v1beta1.AuthInfo({
                    signer_infos: [
                        {
                            public_key: cosmosclient.codec.instanceToProtoAny(senderPublicKey),
                            mode_info: {
                                single: {
                                    mode: proto.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT
                                }
                            },
                            sequence: Long.fromString(sequence)
                        },
                    ],
                    fee: {
                        gas_limit: Long.fromString('200000')
                    }
                });
                console.log(authInfo);
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
                console.log(JSON.stringify(authInfo));
                txBuilder = new cosmosclient.TxBuilder(sdk.rest, txBody, authInfo);
                signDocBytes = txBuilder.signDocBytes(Long.fromString(baseAccount.account_number));
                signature = senderPrivateKey.sign(signDocBytes);
                txBuilder.addSignature(signature);
                // console.log('txBuilder', txBuilder.toProtoJSON())
                console.log(txBuilder);
                return [4 /*yield*/, rest.tx.broadcastTx(sdk.rest, {
                        tx_bytes: txBuilder.txBytes(),
                        mode: rest.tx.BroadcastTxMode.Block
                    })];
            case 3:
                txResponse = _f.sent();
                console.log(txResponse.data);
                return [3 /*break*/, 5];
            case 4:
                e_1 = _f.sent();
                console.log(e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); })();
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
