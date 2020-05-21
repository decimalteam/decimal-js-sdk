
export default function getCoinsList(api) {
  return async () => {
    const url = '/coins';
    const { data } = await api.get(url);
    return data.result;
  };
}
