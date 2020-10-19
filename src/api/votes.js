export default function getVotesInfo(api) {
    return async () => {
      const url = `/proposals`;
      try {
        const { data } = await api.get(url);
        return data.result;
      } catch (e) {
        return null;
      }
    };
  }
  