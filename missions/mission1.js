import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import React from 'react';

const parseCodeForValue = code => {
  try {
    const ast = parser.parse(code);
    let nodeValue = '';
    traverse(ast, {
      enter(path) {
        // console.log(path.node);
        if (path.node.type === 'VariableDeclarator') {
          nodeValue = path.node.init.value;
        }
      },
    });
    return nodeValue;
  } catch (e) {
    return 'Error';
  }
};

class Preview extends React.Component {
  reevalCode = code => {
    return parseCodeForValue(code);
  };

  render() {
    const nodeValue = this.reevalCode(this.props.code);
    return <div>{nodeValue}</div>;
  }
}

const test = ({code}) => {
  const value = parseCodeForValue(code);
  console.log('test', value, value === '2');
  return value === '2';
};

const task = {
  description: `Variable should equal '2' (string)`,
  userCode: `var changeMe = '1';`,
  preview: Preview,
  tests: [test],
};

export default task;
