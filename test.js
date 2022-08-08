const sdk = require('./dist/decimal-sdk-node')
// console.log(sdk)
const { Wallet, Decimal } = sdk
// console.log(Wallet)
const DEVNET_DEC2_URL = 'https://devnet-dec2.console.decimalchain.com/api/';
const DEVNET_URL = 'https://devnet-gate.decimalchain.com/api/';

const mnemonic_dec2 = 'hold liquid enhance slim clerk frame grape welcome hybrid tower window grab bottom cluster cry tonight need depart table april good jar suspect napkin'
const mnemonic_dev = 'side illness opera course oxygen stay vintage blade attract tomato twin honey soldier wrap rally chicken size drama friend wonder water animal dinosaur gather'
const mnemonic_test = 'panel march duty adapt certain day brush eager split spoil grow night royal juice cricket baby solar profit glove such demise feel carpet buddy'
const send_address_test = 'dx15x8m4dm2ddry035nuspgyyy3rse92cs3g6ztgk';
const mnemonicLocal = 'brother churn pen climb tattoo nation detect boil lucky cotton mutual chase session bench exercise panel brave funny axis vague toss aim hover absurd'
const options = {
  gateUrl: DEVNET_URL,
}

const wallet = new Wallet(mnemonic_dev, options);
// console.log(wallet)

const decimal = new Decimal({ baseURL: DEVNET_URL, wallet });

(async () => {
  try {
    const coins = await decimal.getMyCoins();
    console.log(coins)
    // const coins = await decimal.getCoinsList();
    const data = {
      amount: "10",
      coin: "DEL",
      to: "dx14zuvvyqqdf568ekjlgv7pxj6379hgcp89nw59a"
    }
    const defaultOptionsConfig = {
      txBroadcastMode: 'sync',
      accountInfoMode: 'blockchain-with-mempool',
      sendTxDirectly: true,
      feeCoin: "DEL",
      message: ""
    }
    const sendOptions = {
      ...defaultOptionsConfig,
    }
    console.log(data)
    const res = await decimal.sendCoins(data, sendOptions);
    // console.log(coins);

    console.log({res});
  } catch (e) {
    console.log(1);
  }
})();
