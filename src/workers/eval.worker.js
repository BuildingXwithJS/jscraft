import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import {expose} from 'comlinkjs';

class EvalWorker {
  // TODO: figure out
  evalCode(code) {
    const result = eval(code);
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
