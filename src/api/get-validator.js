export default function getCoin(api) {
  return async (address) => {
    if (!address) {
      throw new Error('The address is required');
    }

    const url = `/validator/${address}`;

    try {
      const { data } = await api.get(url);
      return data.result;
    } catch (e) {
      throw new Error('[decimal-js-sdk] Such a validator does not exist');
    }
  };
}
