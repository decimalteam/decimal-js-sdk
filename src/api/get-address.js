export default function getAddress(api) {
  return async (address, txLimit) => {
    if (!address) {
      throw new Error('The address is required');
    }

    const url = `/address/${address}`;
    const { data } = await api.get(url, { params: { txLimit } });
    return data.result;
  };
}
