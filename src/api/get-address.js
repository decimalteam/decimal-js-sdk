export default function getAddress(api) {
  return async (address, txLimit) => {
    if (!address) {
      throw new Error('The address is required');
    }

      return api.getAddress(address, txLimit)
  };
}
