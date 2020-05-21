/* eslint-disable */

import checkCoin from './get-coin';

export default function sendCoin(api, chainID) {
  return async (txData, wallet) => {
    console.log('txData', txData);
    if (!txData.from) {
      throw new Error('No sender address');
    }
    if (!txData.to) {
      throw new Error('No recipient address');
    }
    if (!txData.amount) {
      throw new Error('Amount of transfer not specified');
    }


    try {
      if (txData.coin) {
        await checkCoin(api, chainID)(txData.coin);
      } else {
        throw new Error('The coin is not specified');
      }
    } catch (err) {
      throw new Error(`The ${txData.coin} coin does not exist`);
    }


    // const url = '/coin/send';
    // const reqData = {
    //   base_req: {
    //     chain_id: chainID,
    //     from: txData.from,
    //     sequence: '1',
    //   },
    //   receiver: txData.to,
    //   coin: txData.coin,
    //   amount: txData.amount,
    // };
    // const { data } = await api.post(url, reqData);
    return 'success';
  };
}
