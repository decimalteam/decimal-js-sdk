export default function getMyTransactions(api, wallet) {
  return async (limit = 10, offset = 0, types, coins) => {
    const params = { limit, offset };
    if (types) {
      params.types = types;
    }
    if (coins) {
      params.coins = coins;
    }

      return api.getTxsByAddress(wallet.address, params)
  };
}
