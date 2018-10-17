import {proxy} from 'comlinkjs';
import React from 'react';
import Editor from './components/editor';
import task from './missions/mission1';

const EvalWorker = proxy(new Worker('./workers/eval.worker.js'));

export default class HomePage extends React.Component {
  state = {
    ...task,
    testResults: [],
  };

  constructor(props) {
    super(props);

    this.initWorker();
  }

  async initWorker() {
    this.evalWorkerInstance = await new EvalWorker();
  }

  handleCodeChange = async newValue => {
    this.setState({userCode: newValue});
    this.executeTests();
  };

  async executeTests() {
    const testResults = await Promise.all(
      task.tests.map((test, i) => test({code: this.state.userCode, evalWorker: this.evalWorkerInstance}))
    );
    this.setState({testResults});
  }

  render() {
    const Preview = task.preview;

    return (
      <div className="grid-container">
        <style>{`
          .grid-container {
            display: grid;
            grid-template-columns: auto auto;
          }

          .grid-item {
            border: 1px solid #000;
            padding: 20px;
          }
        `}</style>

        <div className="grid-item">{task.description}</div>
        <div className="grid-item">
          <Editor value={this.state.userCode} onChange={this.handleCodeChange} />
        </div>
        <div className="grid-item">
          <Preview code={this.state.userCode} evalWorker={this.evalWorkerInstance} />
        </div>
        <div className="grid-item">
          {this.state.testResults.map((test, i) => (
            <div key={`test_${i}`}>
              Test {i}: {test ? 'Passing' : 'Failing'}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
