import React from 'react';

class Preview extends React.Component {
  state = {value: 'init...', code: ''};

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.code === this.props.code) {
      return;
    }

    this.executeCode(nextProps);
  }

  async executeCode({code, evalWorker}) {
    const value = await evalWorker.findVariableDeclaration({code, variableName: 'changeMe'});
    this.setState({value});
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
