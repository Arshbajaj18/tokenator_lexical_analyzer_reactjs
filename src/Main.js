import React from "react";
import analyzeString from "./core/LexicalAnalyzer";
import { CodeFlaskReact } from "react-codeflask";

import "./css/Main.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "/* Input your Code here Or Browse the program file from above */",
      result: [],
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleFileChange() {
    let fileInput = document.getElementById("file-input");
    let file = fileInput.files[0];
    let reader = new FileReader();
    reader.addEventListener("loadend", () => {
      this.setState({
        text: reader.result,
      });
      fileInput.value = "";
    });
    reader.readAsText(file);
  }

  handleTextChange(code) {
    this.setState({
      text: code,
    });
  }

  handleSubmit() {
    let string = this.state.text;
    let result = analyzeString(string);
    this.setState({ result });
  }

  handleReset() {
    this.setState({ text: "", result: [] });
  }

  render() {
    return (
      <div className="main row">
        <div className="left-box col-lg-6 col-md-6 col-sm-6 col-xs-1">
          <div className="custom-file">
            <input
              className="custom-file-input"
              type="file"
              id="file-input"
              onChange={this.handleFileChange}
            />
            <label className="custom-file-label" data-browse="Browse">
              Browse File from Computer
            </label>
          </div>

          <CodeFlaskReact
            code={this.state.text}
            onChange={this.handleTextChange}
            id="code-editor"
            language="clike"
            fontSize={25}
            defaultTheme={false}
            
          />

          <div className="buttons row">
            <div className="col-lg-6 col-xs-1">
              <button className="btn btn-warning" onClick={this.handleReset}>
                Reset <i className="fas fa-sync-alt"></i>
              </button>
            </div>
            <div className="col-lg-6 col-xs-1">
              <button className="btn btn-primary" onClick={this.handleSubmit}>
                Analyse <i className="fas fa-angle-right"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="right-box col-lg-6 col-md-6 col-sm-6 col-xs-1">
          <h2>OUTPUT</h2>
          <div className="token-table-container">
            <TokenTable tokens={this.state.result} />
          </div>
        </div>
      </div>
    );
  }
}

function TokenTable(props) {
  let typeStringsCHN = [
    "Error", //error
    "Keyword", //Keyword
    "Identifier", // Identifier
    "Operator", //Operator
    "Seperator", //separator
    "Constant",// Constant
    "Comment", // Comment
  ];
  const tokens = props.tokens.map((token) => {
    return (
      <tr key={token.key}>
        <td>{token.key + 1}</td>
        <td>{typeStringsCHN[token.type]}</td>
        <td>{token.content}</td>
      </tr>
    );
  });

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <td>ID</td>
          <td>Type</td>
          <td>Token</td>
        </tr>
      </thead>
      <tbody>{tokens}</tbody>
    </table>
  );
}
export default Main;
