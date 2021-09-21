export default function getStakesByAddress(api) {
  return (address) => {
    if (!address) {
      throw new Error('The address is required');
    }

    return api.getStakes(address);
  };
}
