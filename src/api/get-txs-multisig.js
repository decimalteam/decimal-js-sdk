export default function getMultisigTxs(api) {
  return (address, limit = 1, offset = 0) => api.getMultisigTxs(address, { limit, offset });
}
