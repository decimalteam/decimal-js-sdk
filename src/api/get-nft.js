export default function getNft(api) {
  return (id, wallet) => {
    if (!id) {
      throw new Error('Id is required');
    }

    if (!wallet) {
      throw new Error('Wallet is required');
    }

    try {
      const params = { walletAddress: wallet.address };

      return api.getNftById(id, params);
    } catch (e) {
      return null;
    }
  };
}
