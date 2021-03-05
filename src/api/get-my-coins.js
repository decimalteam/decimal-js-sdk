export default function getMyCoins(api, wallet) {
  return async (limit = 10, offset = 0) => {
    const query = { limit, offset };
    console.log(query);

    const url = `/address/${wallet.address}/coins`;
    const { data } = await api.get(url, {
      params: query,
    });
    return data.result;
  };
}
