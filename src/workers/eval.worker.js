import { expose } from 'comlinkjs';

const contextRecorder = target => {
  return new Proxy(target, {
    has(target, prop) {
      return true;
    },
    get(target, prop) {
      return (prop in target ? target : self)[prop];
    }
  });
};
class EvalWorker {
  evalCode(code) {
    let context = {};
    const result = new Function(
      'recorder',
      `with(recorder){
        ${code}
      }
    `
    )(contextRecorder(context));

    return { result, context };
  }
}

expose(EvalWorker, self);
