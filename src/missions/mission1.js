import React from 'react';

class Preview extends React.Component {
  state = { value: 'init...', code: '' };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.code === this.props.code) {
      return;
    }

    this.executeCode(nextProps);
  }

  async executeCode({ code, evalWorker }) {
    const { context } = await evalWorker.evalCode(code);
    this.setState({ value: context.changeMe });
  }

  render() {
    return <div>{this.state.value}</div>;
  }
}

const test = async ({ code, evalWorker }) => {
  if (!evalWorker) {
    return false;
  }
  const { context } = await evalWorker.evalCode(code);
  return context.changeMe === '2';
};

const task = {
  description: `Variable should equal '2' (string)`,
  userCode: `var changeMe = '1';`,
  preview: Preview,
  tests: [test]
};

export default task;
