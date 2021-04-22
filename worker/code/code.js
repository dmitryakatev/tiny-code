
const commands = (() => {
  const randomInt = (min, max) => {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  };
  
  const chars = [['a', 'z'], ['0', '9']].reduce((result, [start, finish]) => {
      const startCode = start.charCodeAt();
      const finishCode = finish.charCodeAt();
  
      for (let i = startCode; i <= finishCode; ++i) {
          result.push(String.fromCharCode(i));
      }
  
      return result;
  }, []);
  
  const randomChar = () => {
      return chars[randomInt(0, chars.length - 1)];
  };
  
  // -------------------------------------
  
  const strategy1 = (a, b) => {
    const lnA = a.length;
    const lnB = b.length;
  
    if (lnA !== lnB) {
        return false;
    }
  
    const map = {};
    for (let i = 0; i < lnA; ++i) {
        const char = a[i];
        const start = map[char] || 0;
        const index = b.indexOf(char, start);
  
        if (index === -1) {
            return false;
        }
  
        map[char] = index + 1;
    }
  
    return true;
  };
  
  const strategy2 = (a, b) => {
    const lnA = a.length;
    const lnB = b.length;
  
    if (lnA !== lnB) {
        return false;
    }
  
    const hash = {};
  
    for (let i = 0; i < lnA; ++i) {
        const charA = a[i];
        const charB = b[i];
  
        hash[charA] = (hash[charA] || 0) + 1;
        hash[charB] = (hash[charB] || 0) - 1;
    }
  
    const values = Object.values(hash);
    return values.every((v) => v === 0);
  };
  
  const executeStrategies = (strategies, args) => {
    return new Promise((resolve) => {
      const result = [];
  
      const run = (index) => {
        if (index === strategies.length) {
            resolve(result);
            return;
        }
  
        setTimeout(() => {
            const startTime = new Date();
            const value = strategies[index](...args);
            const endTime = new Date();
  
            const strategyName = `strategy-${index + 1}`;
            const time = endTime - startTime;
  
            result.push({
              strategyName,
              time,
              value,
            });
  
            run(index + 1);
        }, 10);
      };
    
      run(0);
    });
  };
  
  // -------------------------------------
  
  const genTwoStrings = (count) => {
    const arr1 = [...Array(count)].map(randomChar);
    const arr2 = [...arr1].reverse();
  
    return {
      a: arr1.join(''),
      b: arr2.join(''),
    };
  };
  
  const checkStrategies = (a, b) => {
    return executeStrategies([strategy1, strategy2], [a, b]);
  };

  return {
    genTwoStrings,
    checkStrategies,
  };
})();
