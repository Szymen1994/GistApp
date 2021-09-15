import React, {Component} from 'react';
import './style.css';
import PersonList from './PersonList';

const axios = require('axios');


class Wrapper {
  constructor(token) {
    this.token = token
    this.client = axios.create({
      baseURL: 'https://api.github.com/',
      responseType: 'json',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token ' + this.token
      }
    })
  }

  // ----------------------REQUESTS----------------------

  getRequest(path) {
    return this.client.get(path)
  }

  postRequest(path, payload) {
    return this.client.post(path, payload)
  }

  root() {
    return this.getRequest('/')
  }

  deleteRequest(path) {
    return this.client.delete(path)
  }

  patchRequest(path, payload) {
    return this.client.patch(path, payload)
  }

    //-------------------------AKCJE----------------------

  createGist(payload) {
    return this.postRequest('/gists', payload)
  }
  
  deleteGist(gistId){
    return this.deleteRequest(`/gists/${gistId}`)
  }

  updateGist(gistId, payload) {
    return this.patchRequest(`/gists/${gistId}`, payload)
  }

  getGist(gistId) {
    return this.getRequest(`/gists/${gistId}`)
  }

  publicGist() {
    return this.getRequest('/gists/public')
  }
}

let token = "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"
let ghWrapper = new Wrapper(token)
let gistCreatePayload = {
  "description": "byebye World Examples",
  "public": true,
  "files": {
    "hello_world.rb": {
      "content": "class HelloWorld\n   def initialize(name)\n      @name = name.capitalize\n   end\n   def sayHi\n      puts \"Hello !\"\n   end\nend\n\nhello = HelloWorld.new(\"World\")\nhello.sayHi"
    },
  }
}


class App extends Component {
  state = {
    gisty: []
  };

  componentDidMount() {
    ghWrapper.getGist('61e2d1e08b736ebb35fcc0731a74b8ad').then(response => {
      this.setState({gisty: response.data});
    });
  }

render() {
  return (
    <>
    <div className="Dodawanie gista">
      <input type="text" name="GistDescription"></input>
      <input type="text" name="GistName"></input>
      <input type="text" name="GistContent"></input>

      <button name="dodajGist"></button>
    </div>
    </>
  );
  
}
}

export default App;