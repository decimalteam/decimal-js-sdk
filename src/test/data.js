export const data = {
  send: {
    to: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
    coin: 'tdel',
    amount: '111',
  },
  buy: {
    buyCoin: 'coin2',
    amount: '10',
    spendCoin: 'tdel',
    // maxSpendLimit: 0,
  },
  sell: {
    sellCoin: 'tdel',
    amount: '10',
    getCoin: 'coin2',
    // minBuyLimit: 0,
  },
  sellAll: {
    sellCoin: 'btc',
    getCoin: 'tdel',
    // minBuyLimit: 0,
  },

  delegate: {
    address: 'dxvaloper1ajytg8jg8ypx0rj9p792x32fuxyezga4dq2uk0',
    coin: 'tdel',
    stake: '10',
  },
  unbond: {
    address: 'dxvaloper1ajytg8jg8ypx0rj9p792x32fuxyezga4dq2uk0',
    coin: 'tdel',
    stake: '10',
  },

  declare: {
    rewardAddress: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
    coin: 'tdel',
    stake: '10',
    pubKey: 'JRlv38BXuD1TvWQJ9ic1KHr8PzuOITZH3rD8Zm0Vj3Y=',
    commission: '10',
    description: {
      moniker: 'my-node-123',
      identity: '123',
      website: 'hello.ru',
      securityContact: 'test@test.com',
      details: 'details node',
    },
  },

  edit: {
    rewardAddress: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
    description: {
      moniker: 'my-node-123-edit',
      identity: '321',
      website: 'hello.ru',
      securityContact: 'test@test.com',
      details: 'details node',
    },
  },

  createCoin: {
    title: 'Test coin',
    ticker: 'TESTTT',
    initSupply: '50000',
    maxSupply: '100000',
    reserve: '12000',
    crr: '45',
  },

  issueCheck: {
    nonce: '34',
    coin: 'tdel',
    amount: '100',
    password: '123',
    dueBlock: '999999999',
  },

  redeemCheck: {
    check: 'ERp9FR24Vz19XGXddnESNVBhTKxh8Q38CyLC7JHm5wz2pJFZpzSavzRbUJNTFmvuopkiHCFQAWhZN9V4RvPYswuTsK1JHNjESrvLSWFUSvLXM35RrMacsREBKA42DqYBC4M1J6swMqpLP12g9WBYdJS4iuM3QEyi4HkjAqcZDZJ4ox8R36D7pJvT4UtovBHDfT5YEQRdafUDJYnUJyYeXtFphQnheWapAuXi92RnxeRbRneXoopGgq671Jsxa',
    password: '123',
  },

  msCreateWallet: {
    owners: ['dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g', 'dx1v9macmluxh7rk3zsd69v7dwv9fsjhctn2jfhz9'],
    weights: ['1', '1'],
    threshold: '2',
  },
  msCreateTx: {
    from: 'dx1am6ke3l79kjzdqhwgx37em04mzg686ekf9p3pq',
    to: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
    coin: 'tdel',
    amount: '10',
  },
  msSignTx: {
    txId: '22',
  },
};
export const options = {
  feeCoin: '',
  message: 'sdk test',
  gasLimit: '9000000000000000000',
};
