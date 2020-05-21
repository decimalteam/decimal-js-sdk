export default function getCoin(api) {
  return async (symbol) => {
    if (!symbol) {
      throw new Error('The coin symbol is required');
    }

    const url = `/coin/${symbol}`;
    const { data } = await api.get(url);
    return data.result;
  };
}
