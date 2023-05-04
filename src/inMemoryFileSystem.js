class InMemoryFileSystem {
    constructor() {
      this.fileSystem = {};
    }
  
    mkdir(path) {
      const pathParts = path.split('/');
      let currentNode = this.fileSystem;
  
      for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];
  
        if (!currentNode[part]) {
          currentNode[part] = {};
        }
  
        currentNode = currentNode[part];
      }
    }
  
    writeFile(path, data) {
      const pathParts = path.split('/');
      const fileName = pathParts.pop();
      let currentNode = this.fileSystem;
  
      for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];
  
        if (!currentNode[part]) {
          throw new Error(`Cannot write file to path "${path}". The full parent path "${pathParts.slice(0, i + 1).join('/')}" does not exist.`);
        }
  
        currentNode = currentNode[part];
      }
  
      currentNode[fileName] = data;
    }
  
    readFile(path) {
      const pathParts = path.split('/');
      const fileName = pathParts.pop();
      let currentNode = this.fileSystem;
  
      for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];
  
        if (!currentNode[part]) {
          throw new Error(`Cannot read file from path "${path}". The full path "${pathParts.slice(0, i + 1).join('/')}" does not exist.`);
        }
  
        currentNode = currentNode[part];
      }
  
      if (!currentNode[fileName]) {
        throw new Error(`Cannot read file from path "${path}". The file "${fileName}" does not exist.`);
      }
  
      return currentNode[fileName];
    }
  }
  
  export default InMemoryFileSystem;
  