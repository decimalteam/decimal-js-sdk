
export default function getCoinsList(api) {
  return async (limit, offset, query) => {
    console.log(limit, offset, query);
    const url = '/coin';
    const { data } = await api.get(url, { params: { limit, offset, query } });
    return data.result;
  };
}
