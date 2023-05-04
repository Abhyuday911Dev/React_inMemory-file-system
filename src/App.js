import React, { useState } from "react";
import InMemoryFileSystem from "./inMemoryFileSystem";

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
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleLoad}>Load</button>
    </div>
  );
}

export default App;
