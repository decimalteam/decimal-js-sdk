export default function getNftStakesByAddress(api) {
  return async (address) => {
    if (!address) {
      throw new Error('The address is required');
    }

    const url = `/address/${address}/nfts/stakes`;
    const { data } = await api.get(url);
    return data.result;
  };
}
