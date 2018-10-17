import React from 'react';
import Monaco from 'react-monaco-editor';

self.MonacoEnvironment = {
  getWorker: function(moduleId, label) {
    if (label === 'json') {
      return new Worker('../node_modules/monaco-editor/esm/vs/language/json/json.worker.js');
    }
    if (label === 'css') {
      return new Worker('../node_modules/monaco-editor/esm/vs/language/css/css.worker.js');
    }
    if (label === 'html') {
      return new Worker('../node_modules/monaco-editor/esm/vs/language/html/html.worker.js');
    }
    if (label === 'typescript' || label === 'javascript') {
      return new Worker('../node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js');
    }
    return new Worker('../node_modules/monaco-editor/esm/vs/editor/editor.worker.js');
  },
};

export default class Editor extends React.Component {
  editorDidMount = (editor, monaco) => {
    editor.focus();
  };
  onChange = (newValue, e) => {
    this.props.onChange(newValue);
  };

  render() {
    return (
      <Monaco
        width="300"
        height="100"
        language="javascript"
        theme="vs-dark"
        value={this.props.value}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}
