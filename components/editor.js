export default class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.Monaco = () => <span />;

    if (process.browser) {
      this.Monaco = require('react-monaco-editor').default;
      self.MonacoEnvironment = {
        getWorkerUrl: function(moduleId, label) {
          if (label === 'json') {
            return './json.worker.js';
          }
          if (label === 'css') {
            return './css.worker.js';
          }
          if (label === 'html') {
            return './html.worker.js';
          }
          if (label === 'typescript' || label === 'javascript') {
            return './ts.worker.js';
          }
          return './editor.worker.js';
        },
      };
    }
  }

  editorDidMount = (editor, monaco) => {
    editor.focus();
  };
  onChange = (newValue, e) => {
    this.props.onChange(newValue);
  };

  render() {
    const Monaco = this.Monaco;
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
