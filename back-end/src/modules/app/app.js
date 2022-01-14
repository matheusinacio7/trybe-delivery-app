const port = process.env.PORT || 3001;

const { log } = require('../logging');
const server = require('../server');

server.listen(port, () => {
  log(`Server is up on port ${port}`);
});
