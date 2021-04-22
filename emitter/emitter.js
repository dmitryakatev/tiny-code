class Emitter {
  constructor() {
    this.map = new Map();
  }

  on(eventName, callback) {
    let events = this.map.get(eventName);

    if (!Array.isArray(events)) {
      events = [];
      this.map.set(eventName, events);
    }

    if (events.indexOf(callback) === -1) {
      events.push(callback);
    }
  }

  off(eventName, callback) {
    const events = this.map.get(eventName);

    if (Array.isArray(events)) {
      const index = events.indexOf(callback);
      events.splice(index, 1);
    }
  }

  emit(eventName) {
    const events = this.map.get(eventName);

    if (Array.isArray(events)) {
      return !events.some((callback) => (
        callback() === false
      ));
    }

    return false;
  }
}
