export default function getNonce(api) {
  return async (address) => {
    if (!address) {
      throw new Error('The address is required');
    }
    const nonce = await api.requestAccountSequenceWithUnconfirmedTxes(address);

    return nonce + 1;
  };
}
