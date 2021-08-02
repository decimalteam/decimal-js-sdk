export default function getMyCoins(api, wallet) {
  return (limit = 10, offset = 0) => {
    const params = { limit, offset };
    return api.getCoinsByAddress(wallet.address, params);
  };
}
