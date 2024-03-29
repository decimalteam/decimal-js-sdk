export const data = {
  send: {
    to: 'dx16rr3cvdgj8jsywhx8lfteunn9uz0002c7ua9nl',
    coin: 'del',
    amount: '160',
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
    reserve: '100',
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

  swapInit: {
    recipient: '0x45376AD024c767577714C7B92882578aE8B7f98C',
    amount: '1',
    tokenName: 'decimal',
    tokenSymbol: 'DEL',
    destChain: '2',
  },
  swapRedeem: {
    from: '0xeEE687174BC01e6F6866CBab962E5a7b3d2746Ef',
    amount: '1',
    recipient: 'dx1twj64nphm8zl98uxv7gnt6xg4tpkk4gyr3tux9',
    transactionNumber: '1624900728411',
    tokenSymbol: 'del',
    fromChain: '2',
    v: 0x1b,
    r: '0x608619549a48da96dc4dcefa00e0fab2ba25844a55317a25b22827d2abf0a8e8',
    s: '0x55501613ea170645845b50b33f2db7dfbb23bec6b66508611be8e506fa6eb1cd',
  },
  swapRefund: {
    from: 'dx13ykakvugqwzqqmqdj2j2hgqauxmftdn3kqy69g',
    secretHash: 'hello1',
  },
  nftMint: {
    recipient: 'dx16rr3cvdgj8jsywhx8lfteunn9uz0xg2c7ua9nl',
    denom: 'phone',
    token_uri: 'https://testnet-nft.decimalchain.com/api/nfts/pepe112',
    quantity: '1',
    reserve: '10000000',
    allow_mint: true,
  },
  nftBurn: {
    // sender: 'dx1lx4lvt8sjuxj8vw5dcf6knnq0pacre4w6hdh2v',
    denom: 'phone',
    id: 'd6ebb0c3-f075-43f2-ac60-ac0d02858154',
    quantity: '12',
  },
  nftEditMetadata: {
    // sender: 'dx1lx4lvt8sjuxj8vw5dcf6knnq0pacre4w6hdh2v',
    denom: 'phone',
    id: 'd6ebb0c3-f075-43f2-ac60-ac0d02858154',
    token_uri: 'uhttp://devnet.nft.decimalchain.com/api/nfts/CvavSYvudYqiGeOY67dzLmdl6NjqTdEb',
  },
  nftTransfer: {
    denom: 'Cat',
    id: 'a59913f01976735bee8411676015e2b578a49068',
    recipient: 'dx16rr3cvdgj8jsywhx8lfteunn9uz0xg2c7ua9nl',
    // sender: 'dx1lx4lvt8sjuxj8vw5dcf6knnq0pacre4w6hdh2v',
    sub_token_ids: ['2'],
  },
  nftDelegate: {
    denom: 'Music',
    id: '544c7ce1eb5fd342cfc5a94f517cccd85fec794a',
    validator_address: 'dxvaloper1nrr6er27mmcufmaqm4dyu6c5r6489cfmdxucuq',
    // sender: 'dx1lx4lvt8sjuxj8vw5dcf6knnq0pacre4w6hdh2v',
    quantity: '1',
  },
  nftUnbond: {
    denom: 'Music',
    id: '544c7ce1eb5fd342cfc5a94f517cccd85fec794a',
    validator_address: 'dxvaloper1nrr6er27mmcufmaqm4dyu6c5r6489cfmdxucuq',
    // sender: 'dx1lx4lvt8sjuxj8vw5dcf6knnq0pacre4w6hdh2v',
    quantity: '1',
  },
};

export const options = {
  feeCoin: '',
  feeAmount: '',
  gasLimit: '',
  message: 'sdk test', // string
  txBroadcastMode: 'sync', // sync | async | block
  accountInfoMode: 'blockchain', // blockchain | blockchain-with-mempool
  setNonceAutomatically: true, // true | false
  // nonce: '720', // string
};
