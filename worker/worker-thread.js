class WorkerThread {
  constructor() {
    this.name = 'WorkerThread';
    this.worker = new Worker('./code/worker.js');
    this.requests = new Map();
    this.autoId = 0;

    this.worker.onmessage = (e) => {
      const data = e.data;
      const request = this.requests.get(data.code);

      this.requests.delete(data.code);

      if (request) {
        request.done(data.response);
      }
    };
  }

  genTwoStrings(strLen) {
    return this.postMessage('genTwoStrings', [strLen]);
  }

  checkStrategies(strings) {
    return this.postMessage('checkStrategies', [strings.a, strings.b]);
  }

  // private 
  postMessage(action, args) {
    return new Promise((resolve) => {
      const code = ++this.autoId;
      const message = { code, action, args };

      this.requests.set(code, {
        code,
        done(response) {
          resolve(response);
        }
      });

      this.worker.postMessage(message);
    });
  }
}
