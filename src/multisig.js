/* eslint-disable */

import { postTx } from './txUtils';
import TX_TYPE from './txTypes';
import getTransaction from './api/get-tx';


export function multisigCreateWallet(api) {
  return async (txParams, wallet) => {
    const tx = await postTx(api, TX_TYPE.MULTISIG_CREATE_WALLET)(txParams, wallet);
    console.log(tx);
    if (tx.success) {
      const txInfo = await getTransaction(api)(tx.hash);

      let { log } = txInfo.tx_result;
      log = JSON.parse(log);
      const events = log[0].events[0].attributes;
      
      let address = '';

      for (let i = 0; i < events.length; i++) {
        if (events[i].key === 'wallet') {
          address = events[i].value;
          break;
        }
      }
      return address;
    } else {
      return tx;
    }
  }
}