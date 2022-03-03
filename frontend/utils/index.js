export const sortByDate = (a, b) => {
  return new Date(b.created_at) - new Date(a.created_at);
};
