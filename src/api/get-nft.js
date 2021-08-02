export default function getNft(api) {
  return (id) => {
    if (!id) {
      throw new Error('Id is required');
    }
    try {
      return api.getNftById(id);
    } catch (e) {
      return null;
    }
  };
}
