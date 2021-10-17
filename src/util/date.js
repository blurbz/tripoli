/**
 * Returns the years that have passed.
 * @param {date} past - the date
 */
const getYearsPassed = (past) => {
  const now = new Date().getFullYear();
  const then = new Date(past).getFullYear();
  return now - then;
};

export { getYearsPassed };
