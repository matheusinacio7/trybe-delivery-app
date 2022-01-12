export default class ModuleNotFoundError extends Error {
  constructor(moduleName) {
    super(`Module ${moduleName} not found`);
    this.code = 'MODULE_NOT_FOUND';
  }
}
