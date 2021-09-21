export default function getCoin(api) {
  return async (address) => {
    if (!address) {
      throw new Error('The address is required');
    }

    try {
      return api.getValidator(address);
    } catch (e) {
      throw new Error('[decimal-js-sdk] Such a validator does not exist');
    }
  };
}
