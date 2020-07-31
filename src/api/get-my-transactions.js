export default function getMyTransactions(api, wallet) {
  return async (limit = 10, offset = 0, types) => {
    const url = `/address/${wallet.address}/txs`;
    const { data } = await api.get(url, { params: { limit, offset, types } });
    return data.result;
  };
}
