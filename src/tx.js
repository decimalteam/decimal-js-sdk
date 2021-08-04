import DecimalNumber from 'decimal.js';
import { v4 as uuidv4 } from 'uuid';
import TX_TYPE from './txTypes';
import validateTxData from './validator';
import { formTx, postTx, prepareTx } from './txUtils';
import { getAmountFromUNI, getAmountToUNI } from './math';
import { redeemCheck } from './check';
import { getCommission } from './fees';

DecimalNumber.set({ precision: 40 });
function sendCoinData(data, wallet) {
  return {
    sender: wallet.address,
    receiver: data.to,
    coin: {
      amount: getAmountToUNI(data.amount),
      denom: data.coin.toLowerCase(),
    },
  };
}
function buyCoinData(data, wallet) {
  const maxSpendLimit = data.maxSpendLimit ? getAmountToUNI(data.maxSpendLimit) : getAmountToUNI('100000000000');
  return {
    sender: wallet.address,
    coin_to_buy: {
      amount: getAmountToUNI(data.amount),
      denom: data.buyCoin.toLowerCase(),
    },
    max_coin_to_sell: {
      amount: maxSpendLimit,
      denom: data.spendCoin.toLowerCase(),
    },
  };
}

function sellCoinData(data, wallet) {
  const minBuyLimit = data.minBuyLimit ? getAmountToUNI(data.minBuyLimit) : '1';
  return {
    sender: wallet.address,
    coin_to_sell: {
      amount: getAmountToUNI(data.amount),
      denom: data.sellCoin.toLowerCase(),
    },
    min_coin_to_buy: {
      amount: minBuyLimit,
      denom: data.getCoin.toLowerCase(),
    },
  };
}

function sellAllCoinsData(data, wallet) {
  const minBuyLimit = data.minBuyLimit ? getAmountToUNI(data.minBuyLimit) : '1';
  return {
    sender: wallet.address,
    coin_to_sell: {
      amount: '0',
      denom: data.sellCoin.toLowerCase(),
    },
    min_coin_to_buy: {
      amount: minBuyLimit,
      denom: data.getCoin.toLowerCase(),
    },
  };
}

function delegate(data, wallet) {
  return {
    delegator_address: wallet.address,
    validator_address: data.address,
    coin: {
      denom: data.coin.toLowerCase(),
      amount: getAmountToUNI(data.stake),
    },
  };
}

function unbond(data, wallet) {
  return {
    delegator_address: wallet.address,
    validator_address: data.address,
    coin: {
      denom: data.coin.toLowerCase(),
      amount: getAmountToUNI(data.stake),
    },
  };
}

function declareCandidate(data, wallet) {
  return {
    commission: new DecimalNumber(data.commission).div(100).toFixed(18),
    validator_addr: wallet.validatorAddress,
    reward_addr: data.rewardAddress,
    pub_key: {
      type: 'tendermint/PubKeyEd25519',
      value: data.pubKey,
    },
    stake: {
      denom: data.coin.toLowerCase(),
      amount: getAmountToUNI(data.stake),
    },
    description: {
      moniker: data.description.moniker,
      identity: data.description.identity,
      website: data.description.website,
      security_contact: data.description.securityContact,
      details: data.description.details,
    },
  };
}

function editCandidate(data, wallet) {
  return {
    validator_address: wallet.validatorAddress,
    reward_address: data.rewardAddress,
    description: {
      moniker: data.description.moniker,
      identity: data.description.identity,
      website: data.description.website,
      security_contact: data.description.securityContact,
      details: data.description.details,
    },
  };
}

function disableEnableValidator(wallet) {
  return {
    validator_address: wallet.validatorAddress,
  };
}

function createCoin(data, wallet) {
  return {
    sender: wallet.address,
    title: data.title,
    symbol: data.ticker,
    constant_reserve_ratio: data.crr,
    initial_volume: getAmountToUNI(data.initSupply),
    initial_reserve: getAmountToUNI(data.reserve),
    limit_volume: getAmountToUNI(data.maxSupply),
    identity: data.identity,
  };
}

function updateCoin(data, wallet) {
  return {
    sender: wallet.address,
    symbol: data.ticker,
    identity: data.identity,
    limit_volume: getAmountToUNI(data.maxSupply),
  };
}

function multisigCreate(data, wallet) {
  return {
    sender: wallet.address,
    owners: data.owners,
    weights: data.weights,
    threshold: data.threshold,
  };
}

function multisigCreateTx(data, wallet) {
  return {
    sender: wallet.address,
    wallet: data.from,
    receiver: data.to,
    coins: [
      {
        denom: data.coin.toLowerCase(),
        amount: getAmountToUNI(data.amount),
      },
    ],
  };
}
function multisigSignTx(data, wallet) {
  return {
    sender: wallet.address,
    tx_id: data.txId,
  };
}

function multisend(data, wallet) {
  const obj = {
    sender: wallet.address,
    sends: [],
  };

  data.forEach((item) => {
    obj.sends.push({
      receiver: item.to,
      coin: {
        amount: getAmountToUNI(item.amount),
        denom: item.coin.toLowerCase(),
      },
    });
  });

  return obj;
}

function submitProposal(data, wallet) {
  if (!wallet.availableProposalSubmit) {
    throw new Error('This address is not available for this transaction');
  }

  return {
    content: data.content,
    proposer: wallet.address,
    voting_start_block: data.startBlock,
    voting_end_block: data.endBlock,
  };
}

function voteProposal(data, wallet) {
  return {
    proposal_id: data.id,
    voter: wallet.validatorAddress,
    option: data.decision,
  };
}

function swapInit(data, wallet) {
  return {
    from: wallet.address,
    recipient: data.recipient,
    amount: getAmountToUNI(data.amount),
    token_symbol: data.tokenSymbol,
    transaction_number: Date.now().toString(),
    from_chain: '1',
    dest_chain: data.destChain,
  };
}
function swapRedeem(data, wallet) {
  return {
    sender: wallet.address,
    from: data.from,
    recipient: data.recipient,
    amount: getAmountToUNI(data.amount),
    token_name: data.tokenName,
    token_symbol: data.tokenSymbol,
    transaction_number: data.transactionNumber,
    from_chain: data.fromChain,
    dest_chain: '1',
    v: data.v,
    r: data.r.slice(2),
    s: data.s.slice(2),
  };
}

function nftMint(data, wallet) {
  return {
    denom: data.denom,
    id: data.id ? data.id : uuidv4(),
    sender: wallet.address,
    recipient: data.recipient ? data.recipient : wallet.address,
    quantity: data.quantity,
    reserve: getAmountToUNI(data.reserve),
    token_uri: data.token_uri,
    allow_mint: data.allow_mint,
  };
}
function nftBurn(data, wallet) {
  return {
    sender: wallet.address,
    denom: data.denom,
    id: data.id,
    sub_token_ids: data.sub_token_ids,
  };
}
function nftEditMetadata(data, wallet) {
  return {
    sender: wallet.address,
    denom: data.denom,
    id: data.id,
    token_uri: data.token_uri,
  };
}
function nftTransfer(data, wallet) {
  return {
    denom: data.denom,
    id: data.id,
    sender: wallet.address,
    recipient: data.recipient,
    sub_token_ids: data.sub_token_ids,
  };
}

function nftDelegate(data, wallet) {
  return {
    denom: data.denom,
    id: data.id,
    delegator_address: wallet.address,
    validator_address: data.validator_address,
    sub_token_ids: data.sub_token_ids,
  };
}
function nftUnbond(data, wallet) {
  return {
    denom: data.denom,
    id: data.id,
    delegator_address: wallet.address,
    validator_address: data.validator_address,
    sub_token_ids: data.sub_token_ids,
  };
}
function getValue(type, data, options, wallet) {
  validateTxData(data, type);

  if (options && options.feeCoin) {
    options.feeCoin = options.feeCoin.toLowerCase();
  }

  let value = {};
  switch (type) {
    case TX_TYPE.COIN_SEND:
      value = sendCoinData(data, wallet);
      break;
    case TX_TYPE.COIN_BUY:
      value = buyCoinData(data, wallet);
      break;
    case TX_TYPE.COIN_SELL:
      value = sellCoinData(data, wallet);
      break;
    case TX_TYPE.COIN_SELL_ALL:
      value = sellAllCoinsData(data, wallet);
      break;
    case TX_TYPE.VALIDATOR_DELEGATE:
      value = delegate(data, wallet);
      break;
    case TX_TYPE.VALIDATOR_UNBOND:
      value = unbond(data, wallet);
      break;
    case TX_TYPE.VALIDATOR_CANDIDATE:
      value = declareCandidate(data, wallet);
      break;
    case TX_TYPE.VALIDATOR_CANDIDATE_EDIT:
      value = editCandidate(data, wallet);
      break;
    case TX_TYPE.VALIDATOR_SET_ONLINE:
    case TX_TYPE.VALIDATOR_SET_OFFLINE:
      value = disableEnableValidator(wallet);
      options = data;
      break;
    case TX_TYPE.COIN_CREATE:
      value = createCoin(data, wallet);
      break;
    case TX_TYPE.COIN_UPDATE:
      value = updateCoin(data, wallet);
      break;
    case TX_TYPE.COIN_REDEEM_CHECK:
      value = redeemCheck(data, wallet);
      break;
    case TX_TYPE.MULTISIG_CREATE_WALLET:
      value = multisigCreate(data, wallet);
      break;
    case TX_TYPE.MULTISIG_CREATE_TX:
      value = multisigCreateTx(data, wallet);
      break;
    case TX_TYPE.MULTISIG_SIGN_TX:
      value = multisigSignTx(data, wallet);
      break;
    case TX_TYPE.COIN_MULTISEND:
      value = multisend(data, wallet);
      break;
    case TX_TYPE.PROPOSAL_SUBMIT:
      value = submitProposal(data, wallet);
      break;
    case TX_TYPE.PROPOSAL_VOTE:
      value = voteProposal(data, wallet);
      break;
    case TX_TYPE.SWAP_INIT:
      value = swapInit(data, wallet);
      break;
    case TX_TYPE.SWAP_REDEEM:
      value = swapRedeem(data, wallet);
      break;
    case TX_TYPE.NFT_MINT:
      value = nftMint(data, wallet);
      break;
    case TX_TYPE.NFT_BURN:
      value = nftBurn(data, wallet);
      break;
    case TX_TYPE.NFT_EDIT_METADATA:
      value = nftEditMetadata(data, wallet);
      break;
    case TX_TYPE.NFT_TRANSFER:
      value = nftTransfer(data, wallet);
      break;
    case TX_TYPE.NFT_DELEGATE:
      value = nftDelegate(data, wallet);
      break;
    case TX_TYPE.NFT_UNBOND:
      value = nftUnbond(data, wallet);
      break;
    default:
      throw new Error('Invalid type of transaction');
  }

  return { value, options };
}

export function getTransaction(api, wallet, decimal, createNonce) {
  return async (type, data, options) => {
    const formatted = getValue(type, data, options, wallet);
    const broadcastTx = await formTx(api, wallet, decimal, createNonce)(type, formatted.value, formatted.options, wallet);

    return broadcastTx;
  };
}

export function sendTransaction(type, api, wallet, decimal) {
  return async (data, options) => {
    const broadcastTx = await getTransaction(api, wallet, decimal)(type, data, options);
    console.log(broadcastTx);
    const txResult = await postTx(api, decimal)(broadcastTx);
    return txResult;
  };
}

export function estimateTxFee(api, wallet, decimal) {
  return async (type, data, options) => {
    try {
      const { feeCoin } = options;

      if (feeCoin) {
        const broadcastTx = await getTransaction(api, wallet, decimal, false)(type, data, options);
        const feeAmounts = broadcastTx.tx.fee.amount;
        const fee = feeAmounts.length ? feeAmounts[0].amount : '0';

        return getAmountFromUNI(fee);
      }

      const formatted = getValue(type, data, options, wallet);
      const tx = await prepareTx(api)(type, formatted.value, formatted.options);
      const fee = await getCommission(api)(tx, 'del');

      return fee.value.times(0.001).toFixed();
    } catch (e) {
      console.log(e);
      return new Error('error');
    }
  };
}
