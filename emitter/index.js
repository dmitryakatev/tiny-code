const emitter = new Emitter();

const cb1 = () => console.log(1);
const cb2 = () => console.log(2);
const cb3 = () => false;
const cb4 = () => console.log(3);

emitter.on('one', cb1);
emitter.on('two', cb2);
emitter.on('two', cb3);
emitter.on('two', cb4);

emitter.emit('one');
emitter.emit('two');
console.log('-------------');
emitter.off('two', cb3);
emitter.emit('two');
