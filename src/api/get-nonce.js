export default function getNonce(api) {
  return async (address) => {
    if (!address) {
      throw new Error('The address is required');
    }
    const nonce = await api.requestAccountSequenceWithUnconfirmedTxes(address); // TODO: updated method
    return nonce + 1;
  };
}
