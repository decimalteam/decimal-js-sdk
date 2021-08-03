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
export default class DecimalApi {
  constructor(params) {
    const gateURL = params.gateURL || params.baseURL;
    const options = {
      baseURL: gateURL,
    };
    this.requester = axios.create(options);
    const nodeURL = { params };
    this.useNode = !!nodeURL;
    this.rpcRequester = nodeURL ? axios.create({ baseURL: nodeURL }) : this.requester;
  }

  getNodeInfo() {
    return this.requester.get('/rpc/node_info');
  }

  async getAddress(address, txLimit) {
    const { data } = await this.requester.get(`/address/${address}`, { params: { txLimit } });
    return data.result;
  }

  async getTransactionsByAddress(address, params) {
    const { data } = await this.requester.get(`/address/${address}/txs`, { params });
    return data.result;
  }

  async getCoinsList(params) {
    const { data } = await this.requester.get('/coin', { params });
    return data.result;
  }

  async getCoinsByAddress(address, params) {
    const { data } = await this.requester.get(`/address/${address}/coins`, {
      params,
    });
    return data.result;
  }

  async getCoin(symbol) {
    const { data } = await this.requester.get(`/coin/${symbol.toLowerCase()}`);
    return data.result;
  }

  async getTransaction(hash) {
    const { data } = await this.requester.get('/rpc/tx', {
      params: {
        hash: `0x${hash}`,
      },
    });
    return data.result;
  }

  async getMultisig(address) {
    const { data } = await this.requester.get(`/multisig/${address}`);
    return data.result;
  }

  async getMultisigsByAddress(address) {
    const { data } = await this.requester.get(`/address/${address}/multisigs`);
    return data.result;
  }

  async getStakes(address) {
    const { data } = await this.requester.get(`/address/${address}/stakes`);
    return data.result;
  }

  async getNftStakes(address) {
    const { data } = await this.requester.get(`/address/${address}/nfts/stakes`);
    return data.result;
  }

  async getNftById(id) {
    const { data } = await this.requester.get(`/nfts/${id}`);
    return data.result;
  }

  async requestAccountSequence(address) {
    const { data } = await this.requester.get(`/rpc/auth/accounts/${address}`);
    return data.result;
  }

  async broadcastTx(txData) {
    const resp = await this.rpcRequester.post('/rpc/txs', txData);
    return resp.data;
  }

  async encodeTx(tx) {
    const resp = await this.rpcRequester.post('/rpc/txs/encode', tx);
    return resp.data;
  }
}
