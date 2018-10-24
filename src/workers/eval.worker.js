import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import {expose} from 'comlinkjs';

class EvalWorker {
  constructor() {
    this.existingKeys = Object.keys(self);
  }

  evalCode(code) {
    const result = eval(code);
    const newKeys = Object.keys(self).filter(key => !this.existingKeys.includes(key));
    const context = newKeys
      .map(key => ({
        [key]: self[key],
      }))
      .reduce((prev, curr) => ({...prev, ...curr}), {});
    return {result, context};
  }

  invokeCode({code, fn, params}) {
    eval(code);
    const result = self[fn](...params);
    return result;
  }

  findVariableDeclaration({code, variableName}) {
    try {
      const ast = parser.parse(code);
      let nodeValue = '';
      traverse(ast, {
        enter(path) {
          if (path.node.type === 'VariableDeclarator' && path.node.id.name === variableName) {
            nodeValue = path.node.init.value;
          }
        },
      });
      return nodeValue;
    } catch (e) {
      return 'Error';
    }
  }
}

expose(EvalWorker, self);
