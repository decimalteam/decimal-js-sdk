import axios from 'axios';
/*
export default function DecimalApi(options) {
  if (!options.baseURL) {
    throw new Error('Invalid baseURL');
  }

  const instance = axios.create(options);

  return instance;
}
*/
const GATEWAY = 'gateUrl';
// const RPC = 'rpcURL';
const REST = 'restURL';
export default class DecimalApi {
  constructor(params) {
    this.gateUrl = params.gateUrl || params.baseURL;
    if (!(this.gateUrl || params.restURL)) {
      throw new Error('Either gateUrl or restURL must be provided');
    }
    this.requester = axios.create();
    // this.rpcURL = params.rpcURL || this.gateUrl;
    this.restURL = params.restURL || this.gateUrl;
  }

  request(_path, params = null, method = 'get', destination = GATEWAY, data = null) {
    if (destination === GATEWAY && !this.gateUrl) {
      throw new Error('This metohod requires gateway url to be provided');
    }

    let path = _path;

    if (destination === REST && this.gateUrl) {
      path = `/rpc${path}`;
    }

    return axios({
      method,
      url: path,
      baseURL: this[destination],
      params,
      data,
    });
  }

  getNodeInfo() {
    return this.request('/node_info', null, 'get', REST);
  }

  async getAddress(address, params) {
    const { data } = await this.request(`/address/${address}`, params);
    return data.result;
  }

  async getTransactionsByAddress(address, params) {
    const { data } = await this.request(`/address/${address}/txs`, params);
    return data.result;
  }

  async getCoinsList(params) {
    const { data } = await this.request('/coin', params);
    return data.result;
  }

  async getCoinsByAddress(address, params) {
    const { data } = await this.request(`/address/${address}/coins`, params);
    return data.result;
  }

  async getCoin(symbol) {
    const { data } = await this.request(`/coin/${symbol.toLowerCase()}`);
    return data.result;
  }

  async getTransaction(hash) {
    const { data } = await this.request('/rpc/tx', { hash: `0x${hash}` });
    return data.result;
  }

  async getMultisig(address) {
    const { data } = await this.request(`/multisig/${address}`);
    return data.result;
  }

  async getMultisigsByAddress(address) {
    const { data } = await this.request(`/address/${address}/multisigs`);
    return data.result;
  }

  async getMultisigTxs(address, params) {
    const { data } = await this.request(`/multisig/${address}/txs`, params);
    return data.result;
  }

  async getStakes(address) {
    const { data } = await this.request(`/address/${address}/stakes`);
    return data.result;
  }

  async getNftStakes(address, params) {
    const { data } = await this.request(`/address/${address}/nfts/stakes`, params);
    return data.result;
  }

  async getNftById(id, params) {
    const { data } = await this.request(`/nfts/${id}`, params);
    return data.result;
  }

  async getNfts(address, params) {
    const { data } = await this.request(`/address/${address}/nfts`, params);
    return data.result;
  }

  async getNftTxes(id, params, order) {
    const { data } = await this.request(`/nfts/${id}/txs?${order}`, params);
    return data.result;
  }

  async getNftsTxes(address, params, order) {
    const { data } = await this.request(`/address/${address}/nfts/txs?${order}`, params);
    return data.result;
  }

  async updateAddressBlockingData(address, payload) {
    const { data } = await this.request(`/address/${address}/blocking-data`, null, 'put', GATEWAY, payload);
    return data.result;
  }

  async getBlockedAddresses(params) {
    const { data } = await this.request('/blocked-addresses', params);
    return data.result;
  }

  async getProposals() {
    const { data } = await this.request('/proposals');
    return data.result;
  }

  async getValidator(address) {
    const { data } = await this.request(`/validator/${address}`);
    return data.result;
  }

  async requestAccountSequence(address, increaseTheSequence = false) { // old version
    const path = increaseTheSequence ? `/accounts/${address}` : `/auth/accounts/${address}`;

    const { data } = await this.request(path, null, 'get', REST);

    return data.result;
  }

  // method with modified rpc account request to get nonce with unconfirmed txes
  // new version, autoincrement do not need, becouse of mempool txes in new request
  async requestAccountSequenceWithUnconfirmedTxes(address) {
    const path = `/auth/accounts-with-unconfirmed-nonce/${address}`;

    const { data } = await this.request(path, null, 'get', REST);

    return data.result;
  }

  async broadcastTx(txData) {
    const resp = await this.request('/txs', null, 'post', REST, txData);

    return resp.data;
  }

  async encodeTx(tx) {
    const resp = await this.request('/txs/encode', null, 'post', REST, tx);
    console.log(tx);
    console.log(tx.msg);
    return resp.data;
  }

  async getTransactionByHash(hash) {
    try {
      const { data } = await this.request(`/tx/${hash}`);

      return data.result;
    } catch (e) {
      console.error(e);

      return null;
    }
  }
}
