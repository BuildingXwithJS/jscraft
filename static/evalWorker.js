importScripts('https://cdn.jsdelivr.net/npm/comlinkjs@3/umd/comlink.js');

class EvalWorker {
  evalCode(code) {
    const result = eval(code);
    return result;
  }
}
Comlink.expose(EvalWorker, self);
