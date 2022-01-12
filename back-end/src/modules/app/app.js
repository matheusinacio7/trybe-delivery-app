const port = process.env.PORT || 3001;
const server = require('../server');

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
