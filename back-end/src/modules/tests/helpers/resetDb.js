const cp = require('child_process');

function resetDb() {
  return cp.execFile('npm', ['run', 'db:reset']);
}

module.exports = resetDb;
