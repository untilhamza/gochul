//@ts-ignore
export const generalFetcher: Fetcher = (...args) =>
  //@ts-ignore
  fetch(...args).then((res) => res.json());
