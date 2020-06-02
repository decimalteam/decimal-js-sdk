function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export default function getTransaction(api) {
  return async (hash) => {
    if (!hash) {
      throw new Error('The hash is required');
    }

    const url = 'rpc/tx';


    // const { data } = await api.get(url, { params: { hash: `0x${hash}` } });

    await timeout(7000);
    const { data } = await api.get(url, { params: { hash: `0x${hash}` } });
    return data.result;
  };
}
