import { Wallet, Decimal, TX_TYPE } from '../index';

const decimal = new Decimal({ baseURL: 'http://139.59.133.148/rest/', chainId: 'decimal-testnet' });

const mn = 'repair furnace west loud peasant false six hockey poem tube now alien service phone hazard winter favorite away sand fuel describe version tragic vendor';
const wallet = new Wallet(mn);
const wallet2 = new Wallet();


const txParams = {
  type: TX_TYPE.COIN_SEND,
  data: {
    sender: wallet.address,
    receiver: wallet2.address,
    coin: 'tDEL',
    amount: '1010101',
  },
  gas: '200000',
};

(async function test() {
  const sendCoin = await decimal.sendCoin(txParams, wallet);
  console.log(sendCoin);
}());
