export default function getMultisigsByAddress(api) {
  return async (address) => {
    const url = `/address/${address}/multisigs`;
    const { data } = await api.get(url);
    return data.result;
  };
}
