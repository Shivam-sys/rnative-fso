export const valueInK = (number) => {
  return number >= 1000 ? (number / 1000).toFixed(1) + "k" : number;
};

const orderBy = { createdAt: "CREATED_AT", ratingAverage: "RATING_AVERAGE" };
const orderDirection = { asc: "ASC", desc: "DESC" };

export const selectionOptions = [
  {
    title: "Latest repositories",
    values: {
      orderBy: orderBy.createdAt,
      orderDirection: orderDirection.desc,
    },
  },
  {
    title: "Oldest repositories",
    values: {
      orderBy: orderBy.createdAt,
      orderDirection: orderDirection.asc,
    },
  },
  {
    title: "Highest rated repositories",
    values: {
      orderBy: orderBy.ratingAverage,
      orderDirection: orderDirection.desc,
    },
  },
  {
    title: "Lowest rated repositories",
    values: {
      orderBy: orderBy.ratingAverage,
      orderDirection: orderDirection.asc,
    },
  },
];
