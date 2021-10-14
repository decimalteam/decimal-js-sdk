export default function getNft(api, wallet) {
  return (id) => {
    if (!id) {
      throw new Error('Id is required');
    }

    try {
      const params = { walletAddress: wallet.address };

      return api.getNftById(id, params);
    } catch (e) {
      return null;
    }
  };
}
