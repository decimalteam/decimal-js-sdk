export default function getCoinsList(api) {
  return (limit, offset, query) => {
    const params = {
      limit,
      offset,
    };
    if (query) {
      params.query = query;
    }
    return api.getCoinsList(params);
  };
}
