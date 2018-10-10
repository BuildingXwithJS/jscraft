export default class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.Monaco = () => <span />;

    if (process.browser) {
      this.Monaco = require('react-monaco-editor').default;
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
