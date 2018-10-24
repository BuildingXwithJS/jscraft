import React from 'react';

const applyCodemod = code => `
self.checkEvenOdd = (userValue) => {
let result = false;
${code}
return result;
};`;

class Preview extends React.Component {
  state = {even: 'init...', odd: 'init...', code: ''};

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.code === this.props.code) {
      return;
    }

    this.executeCode(nextProps);
  }

  async executeCode({code, evalWorker}) {
    const modifiedCode = applyCodemod(code);
    const even = await evalWorker.invokeCode({code: modifiedCode, fn: 'checkEvenOdd', params: [4]});
    const odd = await evalWorker.invokeCode({code: modifiedCode, fn: 'checkEvenOdd', params: [5]});
    this.setState({even, odd});
  }

  render() {
    return (
      <div>
        <div>For even number: {this.state.even ? 'true' : 'false'}</div>
        <div>For odd number: {this.state.odd ? 'true' : 'false'}</div>
      </div>
    );
  }
}

const test = (param, expectedResult) => async ({code, evalWorker}) => {
  if (!evalWorker) {
    return false;
  }
  const result = await evalWorker.invokeCode({code: applyCodemod(code), fn: 'checkEvenOdd', params: [param]});
  return result === expectedResult;
};
const generateTests = () => [...new Array(10)].map((_, i) => i + 1).map(number => test(number, !Boolean(number % 2)));

const task = {
  description: `Check for userValue variable and if it's even - set result variable to true, if it's odd - to false`,
  userCode: `if (userValue) {
  result = true;
} else {
  result = false;
}`,
  preview: Preview,
  tests: generateTests(),
};

export default task;
