
importScripts('./code.js');

onmessage = async (e) => {
  const data = e.data;
  const command = commands[data.action];
  let response;

  if (command) {
    const result = command(...data.args);

    if (result instanceof Promise) {
      response = await result;
    } else {
      response = result;
    }
  }

  postMessage({
    code: data.code,
    response,
  });
};
