
const sorter = (array, accessor) => {
  const reg = /(\d+)|(\D+)/g;

  const forSort = array.map((original) => {
    const str = accessor(original);
    const split = str.match(reg).map((substr) => {
      const num = parseInt(substr);
      return isNaN(num) ? substr : num;
    });

    return { original, split };
  });

  forSort.sort((a, b) => {
    const lnA = a.split.length;
    const lnB = b.split.length;
    const ln = lnA > lnB ? lnA : lnB;

    for (let i = 0; i < ln; ++i) {
      const valA = a.split[i];
      const valB = b.split[i];

      if (valA !== valB) {
        return valA > valB ? 1 : -1;
      }
    }

    return 0;
  });

  forSort.forEach(({ original }, index) => {
    array[index] = original;
  });
};
