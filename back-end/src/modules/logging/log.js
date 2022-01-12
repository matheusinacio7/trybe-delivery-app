function log(message) {
  console.log(`[${new Date().toLocaleString()}] ${message}`);
}

module.exports = {
  log,
}
