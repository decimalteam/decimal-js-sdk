export default function getMultisigTxs(api) {
  return async (address, limit = 1, offset = 0) => {
    const url = `/multisig/${address}/txs`;
    const { data } = await api.get(url, { params: { limit, offset } });
    return data.result;
  };
}
