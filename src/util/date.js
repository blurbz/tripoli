const getYearsPassed = (past) => {
  const now = new Date().getFullYear();
  const then = new Date(past).getFullYear();
  return now - then;
};

export { getYearsPassed };
