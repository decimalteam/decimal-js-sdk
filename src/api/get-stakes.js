export default function getStakesByAddress(api) {
  return async (address) => {
    if (!address) {
      throw new Error('The address is required');
    }

    const url = `/address/${address}/stakes`;
    const { data } = await api.get(url);
    return data.result;
  };
}
