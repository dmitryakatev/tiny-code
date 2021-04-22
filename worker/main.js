
const genTextMain = document.querySelector('.gen-text-main');
const genTextWorker = document.querySelector('.gen-text-worker');

const checkStrategisMain = document.querySelector('.check-strategis-main');
const checkStrategisWorker = document.querySelector('.check-strategis-worker');

let strings = null;

// -------------------------------------

const main = new MainThread();
const worker = new WorkerThread();

// -------------------------------------

const genTwoStrings = async (instance) => {
  const name = `gen-text: ${instance.name}`;

  console.time(name);
  strings = await instance.genTwoStrings(1e8);
  console.timeEnd(name);
}

const checkStrategies = async (instance) => {
  if (strings === null) {
    console.log(`strings not generated!`)
    return;
  }

  const name = `check-strategies: ${instance.name}`;

  console.time(name);
  const result = await instance.checkStrategies(strings);
  console.timeEnd(name);

  console.log(result);
};

// -------------------------------------

genTextMain.addEventListener('click', () => {
  genTwoStrings(main);
});

genTextWorker.addEventListener('click', () => {
  genTwoStrings(worker);
});

checkStrategisMain.addEventListener('click', () => {
  checkStrategies(main);
});

checkStrategisWorker.addEventListener('click', () => {
  checkStrategies(worker);
});
