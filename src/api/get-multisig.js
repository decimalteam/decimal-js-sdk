export default function getMultisig(api) {
  return async (address) => {
    const url = `/multisig/${address}`;
    const { data } = await api.get(url);
    return data.result;
  };
}
