import './App.css';

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"
import { Button, Col, Row } from 'react-bootstrap';
import { useState } from 'react';


function App() {
  const [code,setUpdatedCode] = useState('')
  const [html, setHTML] =useState('')
  const [theme, setTheme] = useState('monokai')

  const onChange = (newValue) => {
    console.log("change", newValue);
    setUpdatedCode(newValue)
  }

  const onCodeExecute = () => {
    setHTML(code)
  }

  const saveTextFile = () => {
    const element = document.createElement("a");
    const file = new Blob([html], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "download.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <div style={{margin:'auto'}}>
      <div>
        <Row>
          <Col style={{textAlign:'center'}}>
            <h2>
            Javascript Editor using React
            </h2>
          </Col>
        </Row>
        <Row>
          <Col style={{display:'flex',textAlign:'center'}}>
              <p>Theme :</p>
              <select className="ml-2" style={{width:100}} value={theme} onChange={(e) =>setTheme(e.target.value)}>
                <option value="monokai">Dark</option>
                <option value="github">Light</option>
                </select>
            <Button className="ml-2" variant="secondary" onClick={saveTextFile} style={{cursor:'pointer'}} >Save</Button>
            <Button className="ml-2" variant="success" onClick={onCodeExecute} style={{cursor:'pointer'}}>Run >></Button>
          </Col>
          <Col style={{}}>
          </Col>
        </Row>
        <Row xs='1' sm='2' lg='2' style={{marginTop:5}}>
          <Col>
            <AceEditor
                mode="javascript"
                theme={theme}
                onChange={onChange}
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true
                }}
                style={{width:'100%'}}
              />
          </Col>
          <Col>
            <iframe title="codeOutput" srcDoc={html} style={{height:'100%', width:'100%'}}>
            </iframe>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
