class MainThread {
  constructor() {
    this.name = 'MainThread';
  }

  genTwoStrings(strLen) {
    const result = commands.genTwoStrings(strLen);
    return Promise.resolve(result);
  }

  checkStrategies(strings) {
    return commands.checkStrategies(strings.a, strings.b);
  }
}
