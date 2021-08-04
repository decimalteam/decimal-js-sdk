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
const GATEWAY = 'gateURL';
// const RPC = 'rpcURL';
const REST = 'restURL';
export default class DecimalApi {
  constructor(params) {
    this.gateURL = params.gateURL || params.baseURL;
    if (!(this.gateURL || params.restURL)) {
      throw new Error('Either gateURL or restURL must be provided');
    }
    this.requester = axios.create();
    // this.rpcURL = params.rpcURL || this.gateURL;
    this.restURL = params.restURL || this.gateURL;
  }

  request(_path, params = null, method = 'get', destination = GATEWAY, data = null) {
    if (destination === GATEWAY && !this.gateURL) {
      throw new Error('This metohod requires gateway url to be provided');
    }
    let path = _path;
    if (destination === REST && this.gateURL) {
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

  async getAddress(address, txLimit) {
    const { data } = await this.request(`/address/${address}`, { txLimit });
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

  async getNftStakes(address) {
    const { data } = await this.request(`/address/${address}/nfts/stakes`);
    return data.result;
  }

  async getNftById(id) {
    const { data } = await this.request(`/nfts/${id}`);
    return data.result;
  }

  async getProposals() {
    const { data } = await this.request('/proposals');
    return data.result;
  }

  async getValidator(address) {
    const { data } = await this.requst(`/validator/${address}`);
    return data.result;
  }

  async requestAccountSequence(address, incrementSequence = true) {
    console.log(incrementSequence);
    const { data } = await this.request(`/auth/accounts/${address}`, null, 'get', REST);
    return data.result;
  }

  async broadcastTx(txData) {
    const resp = await this.request('/txs', null, 'post', REST, txData);
    return resp.data;
  }

  async encodeTx(tx) {
    const resp = await this.request('/txs/encode', null, 'post', REST, tx);
    return resp.data;
  }
}
