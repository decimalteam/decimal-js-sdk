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
const RPC = 'rpcURL';
const REST = 'restURL';
export default class DecimalApi {
  constructor(params) {
    this.gateURL = params.gateURL || params.baseURL;
    if (!(this.gateURL || params.rpcURL)) {
      throw new Error('Either gateURL or rpcURL must be provided');
    }
    this.requester = axios.create();
    this.rpcURL = params.rpcURL || this.gateURL;
    this.restURL = params.restURL || params.rpcURL ? `${this.rpcURL}:1317` : this.gateURL;
  }

  request(path, params = null, method = 'get', destination = GATEWAY) {
    if (destination === GATEWAY && !this.gateURL) {
      throw new Error('This metohod requires gateway url to be provided');
    }
    let handler;
    switch (method) {
      case 'get':
        handler = this.requester.get;
        break;
      case 'post':
        handler = this.requester.post;
        break;
      default:
        throw new Error('Unknown method');
    }
    return handler(path, { params, baseURL: this[destination] });
  }

  getNodeInfo() {
    return this.request('/rpc/node_info', null, 'get', RPC);
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

  async requestAccountSequence(address) {
    const { data } = await this.request(`/rpc/auth/accounts/${address}`);
    return data.result;
  }

  async broadcastTx(txData) {
    const resp = await this.request('/rpc/txs', txData, 'post', REST);
    return resp.data;
  }

  async encodeTx(tx) {
    const resp = await this.request('/rpc/txs/encode', tx, 'post', REST);
    return resp.data;
  }
}
