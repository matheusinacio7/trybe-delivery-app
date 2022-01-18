module.exports = function getToken() {
  const firstPart = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
  const secondPart = 'eyJpZCI6Miwicm9sZSI6InNlbGxlciIsImlhdCI6MTY0MjQ1NTk5MH0';
  const thirdPart = 'BMil2LrIuBLFyUWIy5n_SgdfA_etlFZCcQ77BRWCtdE';

  return `${firstPart}.${secondPart}.${thirdPart}`;
};
