import React, { useState } from "react";
import InMemoryFileSystem from "./inMemoryFileSystem";
import "bootstrap/dist/css/bootstrap.min.css";

const fileSystem = new InMemoryFileSystem();

function App() {
  fileSystem.mkdir("/");
  fileSystem.mkdir("/myFile.txt");
  const [text, setText] = useState("");

  const handleSave = async () => {
    try {
      await fileSystem.writeFile("/myFile.txt", text);
      console.log("write hua");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoad = () => {
    const data = fileSystem.readFile("/myFile.txt");
    setText(data);
  };
  return (
    <div className="container d-flex flex-column justify-content-evenly vh-100">
      <textarea className="h-75 form-control" value={text} onChange={(e) => setText(e.target.value)} />
      <div className="button-div d-flex flex-column">
        <button className="btn btn-primary btn-lg" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-primary mt-3 btn-lg" onClick={handleLoad}>
          Load
        </button>
      </div>
    </div>
  );
}

export default App;
