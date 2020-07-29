export default function getCoinsList(api) {
  return async (limit, offset, query) => {
    const url = '/coin';
    const params = {
      limit,
      offset,
    };
    if (query) {
      params.query = query;
    }
    const { data } = await api.get(url, { params });
    return data.result;
  };
}
