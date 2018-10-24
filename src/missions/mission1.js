import React from 'react';

const applyCodemod = code => code.replace(/var\s/g, 'self.');

class Preview extends React.Component {
  state = {value: 'init...', code: ''};

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.code === this.props.code) {
      return;
    }

    this.executeCode(nextProps);
  }

  async executeCode({code, evalWorker}) {
    const modifiedCode = applyCodemod(code);
    const {result, context} = await evalWorker.evalCode(modifiedCode);
    this.setState({value: context.changeMe});
  }

  render() {
    return <div>{this.state.value}</div>;
  }
}

const test = async ({code, evalWorker}) => {
  if (!evalWorker) {
    return false;
  }
  const value = await evalWorker.findVariableDeclaration({code, variableName: 'changeMe'});
  return value === '2';
};

const task = {
  description: `Variable should equal '2' (string)`,
  userCode: `var changeMe = '1';`,
  preview: Preview,
  tests: [test],
};

export default task;
