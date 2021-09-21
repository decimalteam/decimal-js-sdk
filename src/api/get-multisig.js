export default function getMultisig(api) {
  return (address) => api.getMultisig(address);
}
