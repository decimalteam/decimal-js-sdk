export default function getMyTransactions(api, wallet) {
  return async (limit = 10, offset = 0, types, coins) => {

    const query = {limit, offset};
    if (types) {
      query.types = types;
    }
    if (coins) {
      query.coins = coins;
    }


    const url = `/address/${wallet.address}/txs`;
    const { data } = await api.get(url, {
      params: query,
    });
    return data.result;
  };
}
