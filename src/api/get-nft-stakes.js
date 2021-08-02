export default function getNftStakesByAddress(api) {
  return async (address) => {
    if (!address) {
      throw new Error('The address is required');
    }

    return api.getNftStakes(address);
  };
}
