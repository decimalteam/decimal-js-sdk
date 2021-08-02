function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function getTransaction(api) {
  return async (hash) => {
    if (!hash) {
      throw new Error('The hash is required');
    }

    await timeout(7000);
    return api.getTransaction(hash);
  };
}
