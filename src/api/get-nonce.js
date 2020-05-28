export default function getNonce(api) {
  return async (address) => {
    if (!address) {
      throw new Error('The address is required');
    }

    const url = `/address/${address}`;
    const { data } = await api.get(url);
    return data.result.address.nonce + 1;
  };
}
