import React from 'react';
import Editor from '../components/editor';
import task from '../missions/mission1';

export default class HomePage extends React.Component {
  state = {
    ...task,
  };

  handleCodeChange = newValue => {
    this.setState({userCode: newValue});
  };

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
          <Preview code={this.state.userCode} />
        </div>
        <div className="grid-item">
          {task.tests.map((test, i) => (
            <div key={`test_${i}`}>
              Test {i}: {test({code: this.state.userCode}) ? 'Passing' : 'Failing'}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
