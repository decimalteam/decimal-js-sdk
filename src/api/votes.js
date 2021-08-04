export default function getVotesInfo(api) {
  return () => {
    try {
      return api.getProposals();
    } catch (e) {
      return null;
    }
  };
}
