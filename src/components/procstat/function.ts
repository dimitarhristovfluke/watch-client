export const getInterval = (nEvery: number, cInterval: string) => {
  switch (cInterval) {
    case "MIN":
      return nEvery + " min" + (nEvery > 1 ? "s" : "");
    case "HR":
      return nEvery + " hour" + (nEvery > 1 ? "s" : "");
    case "SEC":
      return nEvery + " second" + (nEvery > 1 ? "s" : "");
    default:
      return nEvery + " " + cInterval;
  }
};
