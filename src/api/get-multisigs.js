export default function getMultisigsByAddress(api) {
  return (address) => api.getMultisigsByAddress(address);
}
