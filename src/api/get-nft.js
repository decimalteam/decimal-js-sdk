export default function getNft(api) {
  return async (id) => {
    if (!id) {
      throw new Error('Id is required');
    }
    const url = `/nfts/${id}`;
    try {
      const { data } = await api.get(url);
      return data.result;
    } catch (e) {
      return null;
    }
  };
}
