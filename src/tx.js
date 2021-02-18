import DecimalNumber from 'decimal.js';
import hex from 'string-hex';
import TX_TYPE from './txTypes';
import validateTxData from './validator';
import { formTx, postTx, prepareTx } from './txUtils';
import { getAmountToUNI, getAmountFromUNI } from './math';
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
    icon: data.icon,
    limit_volume: getAmountToUNI(data.maxSupply),
  };
}

function updateCoin(data, wallet) {
  return {
    sender: wallet.address,
    symbol: data.ticker,
    icon: data.icon,
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

function swapHtlt(data) {
  // const secretHash = shajs('sha256').update(data.secret).digest('hex');
  const type = data.type === 'in' ? '2' : '1';

  return {
    transfer_type: type,
    from: data.from,
    recipient: data.recipient,
    hashed_secret: data.secretHash,
    amount: [{
      amount: getAmountToUNI(data.amount),
      denom: data.coin.toLowerCase(),
    }],
  };
}

function swapRedeem(data) {
  const secret = hex(data.secret);
  return {
    from: data.from,
    secret,
  };
}
function swapRefund(data) {
  // const secretHash = shajs('sha256').update(data.secret).digest('hex');

  return {
    from: data.from,
    hashed_secret: data.secretHash,
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
    case TX_TYPE.SWAP_HTLT:
      value = swapHtlt(data, wallet);
      break;
    case TX_TYPE.SWAP_REDEEM:
      value = swapRedeem(data, wallet);
      break;
    case TX_TYPE.SWAP_REFUND:
      value = swapRefund(data, wallet);
      break;
    default:
      throw new Error('Invalid type of transaction');
  }

  return { value, options };
}

export function getTransaction(api, wallet, decimal) {
  return async (type, data, options) => {
    const formatted = getValue(type, data, options, wallet);
    const broadcastTx = await formTx(api, wallet, decimal)(type, formatted.value, formatted.options, wallet);

    return broadcastTx;
  };
}

export function sendTransaction(type, api, wallet, decimal) {
  return async (data, options) => {
    const broadcastTx = await getTransaction(api, wallet, decimal)(type, data, options);
    const txResult = await postTx(api, decimal)(broadcastTx);
    return txResult;
  };
}

export function estimateTxFee(api, wallet, decimal) {
  return async (type, data, options) => {
    try {
      const { feeCoin } = options;

      if (feeCoin) {
        const broadcastTx = await getTransaction(api, wallet, decimal)(type, data, options);
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
