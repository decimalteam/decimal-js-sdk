export default function getTransactionByHash(api) {
  return (hash) => api.getTransactionByHash(hash);
}
