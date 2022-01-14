const cp = require('child_process');

function resetDb() {
  return cp.execFileSync('npm', ['run', 'db:reset']);
}

module.exports = resetDb;
