export const data = {
  send: {
    to: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
    coin: 'tdel',
    amount: '1',
  },
  multisend: [
    {
      to: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
      coin: 'tdel',
      amount: '211',
    },
    {
      to: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
      coin: 'tdel',
      amount: '3',
    },
  ],
  buy: {
    buyCoin: 'FINALTEST',
    amount: '10',
    spendCoin: 'tdel',
    // maxSpendLimit: 0,
  },
  sell: {
    sellCoin: 'tdel',
    amount: '10',
    getCoin: 'FINALTEST',
    // minBuyLimit: 0,
  },
  sellAll: {
    sellCoin: 'btc',
    getCoin: 'tdel',
    // minBuyLimit: 0,
  },

  delegate: {
    address: 'dxvaloper1azre0dtclv5y05ufynkhswzh0cwh4ktzr0huw2',
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
    reserve: '2000',
    crr: '45',
    identity: 'e353b89e0de0a78974f9ecaf033721ac',
  },

  updateCoin: {
    ticker: 'TESTTT',
    maxSupply: '1000000',
    identity: 'e353b89e0de0a78974f9ecaf033721ac',
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
    txId: 'dxmstx1tqmjch2x5uk9wgnu8zl88rj6h4hy8rm8mtqfft',
  },

  submitProposal: {
    content: {
      title: 'test title',
      description: 'test description',
    },
    startBlock: '200000',
    endBlock: '2000000',
  },

  voteProposal: {
    id: '1',
    decision: 'Yes',
  },

  swapHtlt: {
    type: 'out', // in / out
    from: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
    recipient: '0xbc97b9ad892B52d399397d3F98486461b00893BA',
    secretHash: 'hello1',
    amount: '10',
    coin: 'del',
  },
  swapRedeem: {
    from: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
    secret: 'hello',
  },
  swapRefund: {
    from: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
    secretHash: 'hello1',
  },
};
export const options = {
  feeCoin: '',
  feeAmount: '',
  message: 'sdk test',
  gasLimit: '',
  mode: '', // sync / async / block
};
